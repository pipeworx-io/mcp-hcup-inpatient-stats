interface McpToolDefinition {
  name: string;
  description: string;
  /** Human-facing one-liner (fleet #1967). Optional; consumers fall back to
   *  description. Kept in step with shared/src/types.ts — scripts/lib/
   *  check-inlined-types.mjs reports drift at publish time. */
  summary?: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
    anyOf?: Array<{ required: string[] }>;
    oneOf?: Array<{ required: string[] }>;
    allOf?: Array<{ required: string[] }>;
  };
  outputSchema?: Record<string, unknown>;
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * HCUP Inpatient Stats — national hospitalization discharges, costs and
 * outcomes by condition and year.
 *
 * Source: Agency for Healthcare Research and Quality (AHRQ), Healthcare Cost
 * and Utilization Project (HCUP). HCUP publishes two separate things:
 *   1. The National Inpatient Sample (NIS) microdata files, which require a
 *      clicked-through Data Use Agreement and a purchase. This pack does
 *      NOT use those files, does not touch any DUA-gated endpoint, and never
 *      will.
 *   2. AHRQ's own aggregate reports computed FROM the NIS and published
 *      freely with no account or agreement — the HCUP Statistical Brief
 *      series. This pack serves numbers transcribed from those reports.
 *
 * Why these numbers rather than a live query: AHRQ's interactive query tools
 * (branded "HCUPnet" / "HCUP Fast Stats") were migrated to a Tableau Server
 * deployment (dataviz.ahrq.gov) that answers normal browser traffic but
 * returns an edge-level 403 (CloudFront WAF, "Error from cloudfront") to
 * plain HTTP clients regardless of User-Agent or header set — the same block
 * a Cloudflare Worker's data-center IP would hit. That is not a login or
 * data-use-agreement wall (no credential is ever requested; the WAF blocks
 * before authentication would even apply), so it is not the DUA this pack is
 * required to avoid — but it means the live tool cannot be queried reliably
 * at request time. This pack is instead built from the numbers AHRQ already
 * publishes as static reports under hcup-us.ahrq.gov/reports/statbriefs/,
 * which IS reachable (200, no account) and is the publisher's own report of
 * the same underlying data.
 *
 * Refresh path: AHRQ posts new Statistical Briefs on an irregular schedule.
 * Check https://hcup-us.ahrq.gov/reports/statbriefs/statbriefs.jsp (public,
 * no account) periodically for a newer "Most Expensive Conditions by Payer"
 * or equivalent cross-condition brief, and a newer sepsis-outcomes brief;
 * re-transcribe Table 1 (and any per-payer tables) into src/data.ts and bump
 * the *_DATA_AS_OF constants there.
 */

import {
  CONDITION_COSTS,
  CONDITION_COST_YEARS,
  CONDITION_COST_DATA_AS_OF,
  CONDITION_SYNONYMS,
  SEPSIS_OUTCOMES,
  SEPSIS_OUTCOMES_BRIEF,
  SEPSIS_OUTCOMES_DATA_AS_OF,
  SEPSIS_PERIODS,
  SEPSIS_ANY_DIAGNOSIS_STAYS_MILLIONS,
  type Payer,
  type ConditionCostRow,
  type SepsisPeriod,
  type SepsisPopulation,
} from './data.js';

const PUBLISHER = 'Agency for Healthcare Research and Quality (AHRQ), Healthcare Cost and Utilization Project (HCUP)';

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function resolveConditionQuery(query: string): string {
  const norm = normalize(query);
  return CONDITION_SYNONYMS[norm] ?? norm;
}

function matchesCondition(row: ConditionCostRow, needle: string): boolean {
  const cond = normalize(row.condition);
  const code = row.ccsr_code ? normalize(row.ccsr_code) : '';
  return cond.includes(needle) || needle.includes(cond) || code === needle;
}

const tools: McpToolExport['tools'] = [
  {
    name: 'condition_hospital_costs',
    description:
      'National U.S. inpatient hospital discharges and aggregate costs by principal diagnosis (CCSR category) and year, from AHRQ HCUP\'s published "Most Expensive Conditions by Payer" Statistical Brief series — e.g. heart failure, septicemia/sepsis, acute myocardial infarction, COVID-19, stroke (cerebral infarction). Returns the top-20 most expensive conditions nationally (or filtered to one condition) with discharge counts, aggregate cost, and mean cost per stay. Years available: 2022, 2017 (AHRQ has not published a 2021 edition of this cross-condition table as of 2026-10-21). Optionally filter by expected payer (Medicare, Medicaid, private insurance, self-pay) for 2022.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        year: {
          type: 'number',
          description: 'Statistical Brief edition year. One of: 2022, 2017. Defaults to 2022 (the most recent AHRQ has published).',
          enum: [2022, 2017],
        },
        payer: {
          type: 'string',
          description: 'Expected payer to filter by. Only 2022 has per-payer tables; other years return the all-payer table regardless of this argument.',
          enum: ['all', 'medicare', 'medicaid', 'private_insurance', 'self_pay'],
        },
        condition: {
          type: 'string',
          description: 'Condition name (e.g. "heart failure", "sepsis", "stroke") or CCSR code (e.g. "CIR019") to filter to. Omit to get the full top-20 table for that year/payer.',
        },
      },
    },
  },
  {
    name: 'sepsis_hospital_outcomes',
    description:
      'National U.S. inpatient hospital length of stay and mean cost per stay for sepsis (principal diagnosis), by patient population and year, 2016-2021, from AHRQ HCUP Statistical Brief #306. This is the only public AHRQ cross-year table found that reports a 2021-specific national figure. Separately reports any-listed-diagnosis sepsis stay counts (a broader population than principal diagnosis) for the years AHRQ printed a figure (2016, 2019, 2021).',
    inputSchema: {
      type: 'object' as const,
      properties: {
        period: {
          type: 'string',
          description: 'Reporting period. "y2021" is the full-year 2021 estimate (with and without a co-occurring COVID-19 diagnosis combined). Defaults to "y2021".',
          enum: SEPSIS_PERIODS,
        },
        population: {
          type: 'string',
          description: 'Patient population. Defaults to "all".',
          enum: ['all', 'adult_65_plus_nonmaternal', 'adult_18_64_nonmaternal', 'maternal', 'pediatric_28days_17years', 'neonatal_0_27days'],
        },
      },
    },
  },
];

function conditionHospitalCosts(args: Record<string, unknown>): unknown {
  const year = typeof args.year === 'number' ? args.year : 2022;
  const payerArg = typeof args.payer === 'string' ? (args.payer as Payer) : 'all';
  const conditionQuery = typeof args.condition === 'string' && args.condition.trim() ? args.condition : undefined;

  if (!CONDITION_COST_YEARS.includes(year as (typeof CONDITION_COST_YEARS)[number])) {
    throw new Error(
      `No HCUP "Most Expensive Conditions" edition for year ${year}. Available editions: ${CONDITION_COST_YEARS.join(', ')}.`,
    );
  }

  const yearTables = CONDITION_COSTS[year];
  const payer: Payer = yearTables[payerArg] ? payerArg : 'all';
  const table = yearTables[payer];
  if (!table) {
    throw new Error(`No ${payerArg} payer breakdown published for ${year} — only the all-payer table exists for that year.`);
  }

  let rows = table.rows;
  if (conditionQuery) {
    const needle = resolveConditionQuery(conditionQuery);
    rows = rows.filter((r) => matchesCondition(r, needle));
    if (rows.length === 0) {
      const available = table.rows.map((r) => r.condition).join('; ');
      throw new Error(
        `"${conditionQuery}" did not match any of the top-20 conditions published for ${year} (${payer}). This table only covers the conditions AHRQ ranked in its top 20 by aggregate cost for that year/payer — available: ${available}.`,
      );
    }
  }

  return {
    year,
    payer,
    unit_of_analysis: 'hospital discharge (a stay, not a unique patient) — a patient readmitted multiple times in the year is counted once per stay',
    conditions: rows.map((r) => ({
      rank: r.rank,
      ccsr_code: r.ccsr_code,
      condition: r.condition,
      discharges: r.discharges_thousands * 1000,
      aggregate_cost_usd: r.aggregate_cost_usd_millions * 1_000_000,
      mean_cost_per_stay_usd: Math.round((r.aggregate_cost_usd_millions * 1_000_000) / (r.discharges_thousands * 1000)),
      national_aggregate_cost_pct: r.national_cost_pct,
      national_hospital_stays_pct: r.hospital_stays_pct,
    })),
    note:
      'Costs reflect the hospital\'s cost to produce the care (HCUP Cost-to-Charge Ratios applied to billed charges), not amounts paid by payers, and exclude separately billed physician fees. "Discharges" are principal-diagnosis stays in nonfederal U.S. acute care hospitals.',
    source: {
      publisher: PUBLISHER,
      dataset: table.brief,
      data_as_of: CONDITION_COST_DATA_AS_OF,
    },
  };
}

function sepsisHospitalOutcomes(args: Record<string, unknown>): unknown {
  const period = (typeof args.period === 'string' ? args.period : 'y2021') as SepsisPeriod;
  const population = (typeof args.population === 'string' ? args.population : 'all') as SepsisPopulation;

  if (!SEPSIS_PERIODS.includes(period)) {
    throw new Error(`Unknown period "${period}". Available: ${SEPSIS_PERIODS.join(', ')}.`);
  }
  const series = SEPSIS_OUTCOMES[population];
  if (!series) {
    throw new Error(`Unknown population "${population}".`);
  }

  const yearKey = period.startsWith('y2021') ? '2021' : period.startsWith('y2020') ? '2020' : undefined;
  const anyDiagnosisKey = period === 'y2021_without_covid' ? '2021_without_covid' : yearKey;
  const anyDiagnosisStaysMillions =
    population === 'all' && anyDiagnosisKey ? SEPSIS_ANY_DIAGNOSIS_STAYS_MILLIONS[anyDiagnosisKey] : undefined;

  return {
    period,
    population,
    principal_diagnosis_sepsis: {
      avg_length_of_stay_days: series.avg_length_of_stay_days[period],
      mean_cost_per_stay_usd: series.avg_total_cost_usd[period],
    },
    any_listed_diagnosis_sepsis_stays: anyDiagnosisStaysMillions !== undefined
      ? {
          stays: Math.round(anyDiagnosisStaysMillions * 1_000_000),
          note: 'Broader population than principal diagnosis — includes sepsis recorded as a co-occurring condition, not only as the reason for the stay. Do not add this to the principal-diagnosis figures above.',
        }
      : undefined,
    note:
      'Average cost is the hospital\'s cost to produce the care (HCUP Cost-to-Charge Ratios applied to billed charges), not amounts paid by payers. "with_covid"/"without_covid" periods split stays that also carried a COVID-19 diagnosis from those that did not; the plain "y2020"/"y2021" period is the combined full-year estimate.',
    source: {
      publisher: PUBLISHER,
      dataset: SEPSIS_OUTCOMES_BRIEF,
      data_as_of: SEPSIS_OUTCOMES_DATA_AS_OF,
    },
  };
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'condition_hospital_costs':
      return conditionHospitalCosts(args);
    case 'sepsis_hospital_outcomes':
      return sepsisHospitalOutcomes(args);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;

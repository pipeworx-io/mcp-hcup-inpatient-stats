/**
 * Transcribed tables from AHRQ Healthcare Cost and Utilization Project (HCUP)
 * Statistical Briefs — published PDF/HTML reports, free, no account or data
 * use agreement. These are NOT drawn from the purchased HCUP National
 * Inpatient Sample (NIS) files themselves (those require a clicked-through
 * data use agreement and are out of scope here) — they are the aggregate
 * numbers AHRQ computed from the NIS and published in its own reports.
 *
 * "Most expensive conditions" series — national, all nonfederal U.S. acute
 * care hospitals, principal diagnosis grouped by CCSR category, ranked by
 * aggregate hospital cost. AHRQ has published this series intermittently
 * (2004, 2006, 2008, 2011, 2013, 2017, 2022 editions found as of 2026-10-21;
 * no 2021 edition exists). This pack ships the two most recent editions.
 *
 * Source: Agency for Healthcare Research and Quality (AHRQ), Healthcare Cost
 * and Utilization Project (HCUP), National Inpatient Sample (NIS),
 * Statistical Brief #316 (2022 edition, posted February 2026) and
 * Statistical Brief #261 (2017 edition).
 *
 * Refresh: AHRQ posts new editions irregularly under its Statistical Briefs
 * list. When a new "Most Expensive Conditions" or equivalent "Most Frequent
 * Principal Diagnoses" brief appears, re-transcribe Table 1 (and, if present,
 * the per-payer tables) here and bump CONDITION_COST_DATA_AS_OF.
 */

export const CONDITION_COST_DATA_AS_OF = '2026-10-21';

export type Payer = 'all' | 'medicare' | 'medicaid' | 'private_insurance' | 'self_pay';

export interface ConditionCostRow {
  rank: number;
  ccsr_code: string | null;
  condition: string;
  aggregate_cost_usd_millions: number;
  national_cost_pct: number;
  discharges_thousands: number;
  hospital_stays_pct: number;
}

export interface ConditionCostTable {
  rows: ConditionCostRow[];
  total_top20_aggregate_cost_usd_millions: number;
  total_top20_discharges_thousands: number;
  total_all_stays_aggregate_cost_usd_millions: number;
  total_all_stays_discharges_thousands: number;
  brief: string;
}

type YearTables = Partial<Record<Payer, ConditionCostTable>>;

export const CONDITION_COST_YEARS = [2022, 2017] as const;

export const CONDITION_COSTS: Record<number, YearTables> = {
  2022: {
    all: {
      brief: 'HCUP Statistical Brief #316, "National Inpatient Hospital Costs: The Most Expensive Conditions by Payer, 2022"',
      total_top20_aggregate_cost_usd_millions: 256683,
      total_top20_discharges_thousands: 14175,
      total_all_stays_aggregate_cost_usd_millions: 548481,
      total_all_stays_discharges_thousands: 32892,
      rows: [
        { rank: 1, ccsr_code: 'INF002', condition: 'Septicemia', aggregate_cost_usd_millions: 60016, national_cost_pct: 10.9, discharges_thousands: 2421, hospital_stays_pct: 7.4 },
        { rank: 2, ccsr_code: 'PNL001', condition: 'Liveborn (newborn infants)', aggregate_cost_usd_millions: 19581, national_cost_pct: 3.6, discharges_thousands: 3488, hospital_stays_pct: 10.6 },
        { rank: 3, ccsr_code: 'CIR019', condition: 'Heart failure', aggregate_cost_usd_millions: 18236, national_cost_pct: 3.3, discharges_thousands: 1098, hospital_stays_pct: 3.3 },
        { rank: 4, ccsr_code: 'CIR009', condition: 'Acute myocardial infarction', aggregate_cost_usd_millions: 16332, national_cost_pct: 3.0, discharges_thousands: 582, hospital_stays_pct: 1.8 },
        { rank: 5, ccsr_code: 'INF012', condition: 'Coronavirus disease 2019 (COVID-19)', aggregate_cost_usd_millions: 16038, national_cost_pct: 2.9, discharges_thousands: 823, hospital_stays_pct: 2.5 },
        { rank: 6, ccsr_code: 'MUS011', condition: 'Spondylopathies/spondyloarthropathy', aggregate_cost_usd_millions: 14002, national_cost_pct: 2.6, discharges_thousands: 447, hospital_stays_pct: 1.4 },
        { rank: 7, ccsr_code: 'END003', condition: 'Diabetes mellitus with complication', aggregate_cost_usd_millions: 10945, national_cost_pct: 2.0, discharges_thousands: 687, hospital_stays_pct: 2.1 },
        { rank: 8, ccsr_code: 'CIR020', condition: 'Cerebral infarction', aggregate_cost_usd_millions: 10940, national_cost_pct: 2.0, discharges_thousands: 542, hospital_stays_pct: 1.6 },
        { rank: 9, ccsr_code: 'CIR017', condition: 'Cardiac dysrhythmias', aggregate_cost_usd_millions: 9913, national_cost_pct: 1.8, discharges_thousands: 596, hospital_stays_pct: 1.8 },
        { rank: 10, ccsr_code: 'RSP012', condition: 'Respiratory failure; insufficiency; arrest', aggregate_cost_usd_millions: 9538, national_cost_pct: 1.7, discharges_thousands: 433, hospital_stays_pct: 1.3 },
        { rank: 11, ccsr_code: 'CIR011', condition: 'Coronary atherosclerosis and other heart disease', aggregate_cost_usd_millions: 9300, national_cost_pct: 1.7, discharges_thousands: 294, hospital_stays_pct: 0.9 },
        { rank: 12, ccsr_code: 'INJ037', condition: 'Complication of other surgical/medical care, initial encounter', aggregate_cost_usd_millions: 7968, national_cost_pct: 1.5, discharges_thousands: 341, hospital_stays_pct: 1.0 },
        { rank: 13, ccsr_code: 'INJ006', condition: 'Fracture of the neck of the femur (hip), initial encounter', aggregate_cost_usd_millions: 7656, national_cost_pct: 1.4, discharges_thousands: 338, hospital_stays_pct: 1.0 },
        { rank: 14, ccsr_code: 'CIR003', condition: 'Nonrheumatic and unspecified valve disorders', aggregate_cost_usd_millions: 7649, national_cost_pct: 1.4, discharges_thousands: 150, hospital_stays_pct: 0.5 },
        { rank: 15, ccsr_code: 'RSP002', condition: 'Pneumonia (except caused by tuberculosis)', aggregate_cost_usd_millions: 7648, national_cost_pct: 1.4, discharges_thousands: 547, hospital_stays_pct: 1.7 },
        { rank: 16, ccsr_code: 'GEN002', condition: 'Acute and unspecified renal failure', aggregate_cost_usd_millions: 6573, national_cost_pct: 1.2, discharges_thousands: 497, hospital_stays_pct: 1.5 },
        { rank: 17, ccsr_code: 'INJ008', condition: 'Traumatic brain injury; concussion, initial encounter', aggregate_cost_usd_millions: 6491, national_cost_pct: 1.2, discharges_thousands: 218, hospital_stays_pct: 0.7 },
        { rank: 18, ccsr_code: 'INJ005', condition: 'Fracture of the lower limb (except hip), initial encounter', aggregate_cost_usd_millions: 6216, national_cost_pct: 1.1, discharges_thousands: 227, hospital_stays_pct: 0.7 },
        { rank: 19, ccsr_code: 'INJ033', condition: 'Complication of cardiovascular device, implant or graft, initial encounter', aggregate_cost_usd_millions: 6022, national_cost_pct: 1.1, discharges_thousands: 170, hospital_stays_pct: 0.5 },
        { rank: 20, ccsr_code: 'MUS006', condition: 'Osteoarthritis', aggregate_cost_usd_millions: 5618, national_cost_pct: 1.0, discharges_thousands: 277, hospital_stays_pct: 0.8 },
      ],
    },
    medicare: {
      brief: 'HCUP Statistical Brief #316 (2022 edition), Table 2 (expected payer: Medicare)',
      total_top20_aggregate_cost_usd_millions: 141782,
      total_top20_discharges_thousands: 6762,
      total_all_stays_aggregate_cost_usd_millions: 256405,
      total_all_stays_discharges_thousands: 13223,
      rows: [
        { rank: 1, ccsr_code: 'INF002', condition: 'Septicemia', aggregate_cost_usd_millions: 34054, national_cost_pct: 13.3, discharges_thousands: 1432, hospital_stays_pct: 10.8 },
        { rank: 2, ccsr_code: 'CIR019', condition: 'Heart failure', aggregate_cost_usd_millions: 11835, national_cost_pct: 4.6, discharges_thousands: 759, hospital_stays_pct: 5.7 },
        { rank: 3, ccsr_code: 'INF012', condition: 'Coronavirus disease 2019 (COVID-19)', aggregate_cost_usd_millions: 9486, national_cost_pct: 3.7, discharges_thousands: 529, hospital_stays_pct: 4.0 },
        { rank: 4, ccsr_code: 'CIR009', condition: 'Acute myocardial infarction', aggregate_cost_usd_millions: 8807, national_cost_pct: 3.4, discharges_thousands: 318, hospital_stays_pct: 2.4 },
        { rank: 5, ccsr_code: 'MUS011', condition: 'Spondylopathies/spondyloarthropathy', aggregate_cost_usd_millions: 7278, national_cost_pct: 2.8, discharges_thousands: 231, hospital_stays_pct: 1.7 },
        { rank: 6, ccsr_code: 'CIR017', condition: 'Cardiac dysrhythmias', aggregate_cost_usd_millions: 6975, national_cost_pct: 2.7, discharges_thousands: 413, hospital_stays_pct: 3.1 },
        { rank: 7, ccsr_code: 'CIR020', condition: 'Cerebral infarction', aggregate_cost_usd_millions: 6555, national_cost_pct: 2.6, discharges_thousands: 340, hospital_stays_pct: 2.6 },
        { rank: 8, ccsr_code: 'INJ006', condition: 'Fracture of the neck of the femur (hip), initial encounter', aggregate_cost_usd_millions: 6028, national_cost_pct: 2.4, discharges_thousands: 274, hospital_stays_pct: 2.1 },
        { rank: 9, ccsr_code: 'CIR003', condition: 'Nonrheumatic and unspecified valve disorders', aggregate_cost_usd_millions: 5708, national_cost_pct: 2.2, discharges_thousands: 114, hospital_stays_pct: 0.9 },
        { rank: 10, ccsr_code: 'CIR011', condition: 'Coronary atherosclerosis and other heart disease', aggregate_cost_usd_millions: 5536, national_cost_pct: 2.2, discharges_thousands: 172, hospital_stays_pct: 1.3 },
        { rank: 11, ccsr_code: 'END003', condition: 'Diabetes mellitus with complication', aggregate_cost_usd_millions: 5418, national_cost_pct: 2.1, discharges_thousands: 287, hospital_stays_pct: 2.2 },
        { rank: 12, ccsr_code: 'RSP002', condition: 'Pneumonia (except caused by tuberculosis)', aggregate_cost_usd_millions: 4809, national_cost_pct: 1.9, discharges_thousands: 344, hospital_stays_pct: 2.6 },
        { rank: 13, ccsr_code: 'RSP012', condition: 'Respiratory failure; insufficiency; arrest', aggregate_cost_usd_millions: 4554, national_cost_pct: 1.8, discharges_thousands: 226, hospital_stays_pct: 1.7 },
        { rank: 14, ccsr_code: 'GEN002', condition: 'Acute and unspecified renal failure', aggregate_cost_usd_millions: 4337, national_cost_pct: 1.7, discharges_thousands: 331, hospital_stays_pct: 2.5 },
        { rank: 15, ccsr_code: 'INJ037', condition: 'Complication of other surgical/medical care, initial encounter', aggregate_cost_usd_millions: 3843, national_cost_pct: 1.5, discharges_thousands: 159, hospital_stays_pct: 1.2 },
        { rank: 16, ccsr_code: 'INJ033', condition: 'Complication of cardiovascular device, implant or graft, initial encounter', aggregate_cost_usd_millions: 3688, national_cost_pct: 1.4, discharges_thousands: 110, hospital_stays_pct: 0.8 },
        { rank: 17, ccsr_code: 'MUS006', condition: 'Osteoarthritis', aggregate_cost_usd_millions: 3663, national_cost_pct: 1.4, discharges_thousands: 183, hospital_stays_pct: 1.4 },
        { rank: 18, ccsr_code: 'GEN004', condition: 'Urinary tract infections', aggregate_cost_usd_millions: 3322, national_cost_pct: 1.3, discharges_thousands: 312, hospital_stays_pct: 2.4 },
        { rank: 19, ccsr_code: 'INJ035', condition: 'Complication of internal orthopedic device, implant or graft, initial encounter', aggregate_cost_usd_millions: 3023, national_cost_pct: 1.2, discharges_thousands: 108, hospital_stays_pct: 0.8 },
        { rank: 20, ccsr_code: 'GEN003', condition: 'Chronic kidney disease', aggregate_cost_usd_millions: 2861, national_cost_pct: 1.1, discharges_thousands: 121, hospital_stays_pct: 0.9 },
      ],
    },
    medicaid: {
      brief: 'HCUP Statistical Brief #316 (2022 edition), Table 3 (expected payer: Medicaid)',
      total_top20_aggregate_cost_usd_millions: 52066,
      total_top20_discharges_thousands: 3906,
      total_all_stays_aggregate_cost_usd_millions: 112859,
      total_all_stays_discharges_thousands: 7756,
      rows: [
        { rank: 1, ccsr_code: 'INF002', condition: 'Septicemia', aggregate_cost_usd_millions: 11495, national_cost_pct: 10.2, discharges_thousands: 390, hospital_stays_pct: 5.0 },
        { rank: 2, ccsr_code: 'PNL001', condition: 'Liveborn (newborn infants)', aggregate_cost_usd_millions: 9613, national_cost_pct: 8.5, discharges_thousands: 1544, hospital_stays_pct: 19.9 },
        { rank: 3, ccsr_code: 'CIR019', condition: 'Heart failure', aggregate_cost_usd_millions: 2604, national_cost_pct: 2.3, discharges_thousands: 139, hospital_stays_pct: 1.8 },
        { rank: 4, ccsr_code: 'RSP012', condition: 'Respiratory failure; insufficiency; arrest', aggregate_cost_usd_millions: 2574, national_cost_pct: 2.3, discharges_thousands: 99, hospital_stays_pct: 1.3 },
        { rank: 5, ccsr_code: 'END003', condition: 'Diabetes mellitus with complication', aggregate_cost_usd_millions: 2527, national_cost_pct: 2.2, discharges_thousands: 178, hospital_stays_pct: 2.3 },
        { rank: 6, ccsr_code: 'INF012', condition: 'Coronavirus disease 2019 (COVID-19)', aggregate_cost_usd_millions: 2308, national_cost_pct: 2.0, discharges_thousands: 102, hospital_stays_pct: 1.3 },
        { rank: 7, ccsr_code: 'MBD001', condition: 'Schizophrenia spectrum and other psychotic disorders', aggregate_cost_usd_millions: 2047, national_cost_pct: 1.8, discharges_thousands: 160, hospital_stays_pct: 2.1 },
        { rank: 8, ccsr_code: 'PRG023', condition: 'Complications specified during childbirth', aggregate_cost_usd_millions: 2008, national_cost_pct: 1.8, discharges_thousands: 337, hospital_stays_pct: 4.3 },
        { rank: 9, ccsr_code: 'CIR009', condition: 'Acute myocardial infarction', aggregate_cost_usd_millions: 1811, national_cost_pct: 1.6, discharges_thousands: 61, hospital_stays_pct: 0.8 },
        { rank: 10, ccsr_code: 'INJ037', condition: 'Complication of other surgical/medical care, initial encounter', aggregate_cost_usd_millions: 1652, national_cost_pct: 1.5, discharges_thousands: 65, hospital_stays_pct: 0.8 },
        { rank: 11, ccsr_code: 'CIR020', condition: 'Cerebral infarction', aggregate_cost_usd_millions: 1510, national_cost_pct: 1.3, discharges_thousands: 58, hospital_stays_pct: 0.8 },
        { rank: 12, ccsr_code: 'PRG020', condition: 'Hypertension complicating pregnancy/childbirth', aggregate_cost_usd_millions: 1476, national_cost_pct: 1.3, discharges_thousands: 182, hospital_stays_pct: 2.3 },
        { rank: 13, ccsr_code: 'INJ008', condition: 'Traumatic brain injury; concussion, initial encounter', aggregate_cost_usd_millions: 1443, national_cost_pct: 1.3, discharges_thousands: 31, hospital_stays_pct: 0.4 },
        { rank: 14, ccsr_code: 'MAL001', condition: 'Cardiac and circulatory congenital anomalies', aggregate_cost_usd_millions: 1432, national_cost_pct: 1.3, discharges_thousands: 13, hospital_stays_pct: 0.2 },
        { rank: 15, ccsr_code: 'MBD017', condition: 'Alcohol-related disorders', aggregate_cost_usd_millions: 1402, national_cost_pct: 1.2, discharges_thousands: 141, hospital_stays_pct: 1.8 },
        { rank: 16, ccsr_code: 'PRG016', condition: 'Previous C-section', aggregate_cost_usd_millions: 1364, national_cost_pct: 1.2, discharges_thousands: 185, hospital_stays_pct: 2.4 },
        { rank: 17, ccsr_code: 'INJ005', condition: 'Fracture of the lower limb (except hip), initial encounter', aggregate_cost_usd_millions: 1251, national_cost_pct: 1.1, discharges_thousands: 40, hospital_stays_pct: 0.5 },
        { rank: 18, ccsr_code: 'DIG019', condition: 'Other liver disease', aggregate_cost_usd_millions: 1192, national_cost_pct: 1.1, discharges_thousands: 54, hospital_stays_pct: 0.7 },
        { rank: 19, ccsr_code: 'NVS009', condition: 'Epilepsy; convulsions', aggregate_cost_usd_millions: 1183, national_cost_pct: 1.0, discharges_thousands: 86, hospital_stays_pct: 1.1 },
        { rank: 20, ccsr_code: 'MUS011', condition: 'Spondylopathies/spondyloarthropathy', aggregate_cost_usd_millions: 1172, national_cost_pct: 1.0, discharges_thousands: 41, hospital_stays_pct: 0.5 },
      ],
    },
    private_insurance: {
      brief: 'HCUP Statistical Brief #316 (2022 edition), Table 4 (expected payer: private insurance)',
      total_top20_aggregate_cost_usd_millions: 60892,
      total_top20_discharges_thousands: 4449,
      total_all_stays_aggregate_cost_usd_millions: 141595,
      total_all_stays_discharges_thousands: 9447,
      rows: [
        { rank: 1, ccsr_code: 'INF002', condition: 'Septicemia', aggregate_cost_usd_millions: 10788, national_cost_pct: 7.6, discharges_thousands: 435, hospital_stays_pct: 4.6 },
        { rank: 2, ccsr_code: 'PNL001', condition: 'Liveborn (newborn infants)', aggregate_cost_usd_millions: 8445, national_cost_pct: 6.0, discharges_thousands: 1641, hospital_stays_pct: 17.4 },
        { rank: 3, ccsr_code: 'MUS011', condition: 'Spondylopathies/spondyloarthropathy', aggregate_cost_usd_millions: 4458, national_cost_pct: 3.1, discharges_thousands: 140, hospital_stays_pct: 1.5 },
        { rank: 4, ccsr_code: 'CIR009', condition: 'Acute myocardial infarction', aggregate_cost_usd_millions: 4397, national_cost_pct: 3.1, discharges_thousands: 153, hospital_stays_pct: 1.6 },
        { rank: 5, ccsr_code: 'INF012', condition: 'Coronavirus disease 2019 (COVID-19)', aggregate_cost_usd_millions: 3342, national_cost_pct: 2.4, discharges_thousands: 147, hospital_stays_pct: 1.6 },
        { rank: 6, ccsr_code: 'CIR019', condition: 'Heart failure', aggregate_cost_usd_millions: 2773, national_cost_pct: 2.0, discharges_thousands: 134, hospital_stays_pct: 1.4 },
        { rank: 7, ccsr_code: 'CIR011', condition: 'Coronary atherosclerosis and other heart disease', aggregate_cost_usd_millions: 2448, national_cost_pct: 1.7, discharges_thousands: 76, hospital_stays_pct: 0.8 },
        { rank: 8, ccsr_code: 'PRG023', condition: 'Complications specified during childbirth', aggregate_cost_usd_millions: 2204, national_cost_pct: 1.6, discharges_thousands: 373, hospital_stays_pct: 4.0 },
        { rank: 9, ccsr_code: 'END003', condition: 'Diabetes mellitus with complication', aggregate_cost_usd_millions: 2160, national_cost_pct: 1.5, discharges_thousands: 155, hospital_stays_pct: 1.6 },
        { rank: 10, ccsr_code: 'CIR020', condition: 'Cerebral infarction', aggregate_cost_usd_millions: 2099, national_cost_pct: 1.5, discharges_thousands: 104, hospital_stays_pct: 1.1 },
        { rank: 11, ccsr_code: 'PRG020', condition: 'Hypertension complicating pregnancy/childbirth', aggregate_cost_usd_millions: 2077, national_cost_pct: 1.5, discharges_thousands: 265, hospital_stays_pct: 2.8 },
        { rank: 12, ccsr_code: 'INJ037', condition: 'Complication of other surgical/medical care, initial encounter', aggregate_cost_usd_millions: 2018, national_cost_pct: 1.4, discharges_thousands: 95, hospital_stays_pct: 1.0 },
        { rank: 13, ccsr_code: 'INJ005', condition: 'Fracture of the lower limb (except hip), initial encounter', aggregate_cost_usd_millions: 1825, national_cost_pct: 1.3, discharges_thousands: 62, hospital_stays_pct: 0.7 },
        { rank: 14, ccsr_code: 'RSP012', condition: 'Respiratory failure; insufficiency; arrest', aggregate_cost_usd_millions: 1808, national_cost_pct: 1.3, discharges_thousands: 80, hospital_stays_pct: 0.9 },
        { rank: 15, ccsr_code: 'CIR017', condition: 'Cardiac dysrhythmias', aggregate_cost_usd_millions: 1805, national_cost_pct: 1.3, discharges_thousands: 114, hospital_stays_pct: 1.2 },
        { rank: 16, ccsr_code: 'NEO073', condition: 'Benign neoplasms', aggregate_cost_usd_millions: 1751, national_cost_pct: 1.2, discharges_thousands: 82, hospital_stays_pct: 0.9 },
        { rank: 17, ccsr_code: 'END009', condition: 'Obesity', aggregate_cost_usd_millions: 1748, national_cost_pct: 1.2, discharges_thousands: 119, hospital_stays_pct: 1.3 },
        { rank: 18, ccsr_code: 'MAL001', condition: 'Cardiac and circulatory congenital anomalies', aggregate_cost_usd_millions: 1696, national_cost_pct: 1.2, discharges_thousands: 20, hospital_stays_pct: 0.2 },
        { rank: 19, ccsr_code: 'INJ008', condition: 'Traumatic brain injury; concussion, initial encounter', aggregate_cost_usd_millions: 1549, national_cost_pct: 1.1, discharges_thousands: 45, hospital_stays_pct: 0.5 },
        { rank: 20, ccsr_code: 'PRG016', condition: 'Previous C-section', aggregate_cost_usd_millions: 1500, national_cost_pct: 1.1, discharges_thousands: 211, hospital_stays_pct: 2.2 },
      ],
    },
    self_pay: {
      brief: 'HCUP Statistical Brief #316 (2022 edition), Table 5 (expected payer: self-pay/no charge)',
      total_top20_aggregate_cost_usd_millions: 8602,
      total_top20_discharges_thousands: 662,
      total_all_stays_aggregate_cost_usd_millions: 17983,
      total_all_stays_discharges_thousands: 1370,
      rows: [
        { rank: 1, ccsr_code: 'INF002', condition: 'Septicemia', aggregate_cost_usd_millions: 1995, national_cost_pct: 11.1, discharges_thousands: 97, hospital_stays_pct: 7.1 },
        { rank: 2, ccsr_code: 'CIR009', condition: 'Acute myocardial infarction', aggregate_cost_usd_millions: 737, national_cost_pct: 4.1, discharges_thousands: 29, hospital_stays_pct: 2.1 },
        { rank: 3, ccsr_code: 'PNL001', condition: 'Liveborn (newborn infants)', aggregate_cost_usd_millions: 604, national_cost_pct: 3.4, discharges_thousands: 195, hospital_stays_pct: 14.2 },
        { rank: 4, ccsr_code: 'CIR019', condition: 'Heart failure', aggregate_cost_usd_millions: 523, national_cost_pct: 2.9, discharges_thousands: 37, hospital_stays_pct: 2.7 },
        { rank: 5, ccsr_code: 'END003', condition: 'Diabetes mellitus with complication', aggregate_cost_usd_millions: 515, national_cost_pct: 2.9, discharges_thousands: 46, hospital_stays_pct: 3.4 },
        { rank: 6, ccsr_code: 'CIR020', condition: 'Cerebral infarction', aggregate_cost_usd_millions: 442, national_cost_pct: 2.5, discharges_thousands: 23, hospital_stays_pct: 1.7 },
        { rank: 7, ccsr_code: 'INJ005', condition: 'Fracture of the lower limb (except hip), initial encounter', aggregate_cost_usd_millions: 401, national_cost_pct: 2.2, discharges_thousands: 15, hospital_stays_pct: 1.1 },
        { rank: 8, ccsr_code: 'INJ008', condition: 'Traumatic brain injury; concussion, initial encounter', aggregate_cost_usd_millions: 364, national_cost_pct: 2.0, discharges_thousands: 12, hospital_stays_pct: 0.9 },
        { rank: 9, ccsr_code: 'INF012', condition: 'Coronavirus disease 2019 (COVID-19)', aggregate_cost_usd_millions: 336, national_cost_pct: 1.9, discharges_thousands: 18, hospital_stays_pct: 1.3 },
        { rank: 10, ccsr_code: 'MBD017', condition: 'Alcohol-related disorders', aggregate_cost_usd_millions: 300, national_cost_pct: 1.7, discharges_thousands: 37, hospital_stays_pct: 2.7 },
        { rank: 11, ccsr_code: 'DIG017', condition: 'Biliary tract disease', aggregate_cost_usd_millions: 289, national_cost_pct: 1.6, discharges_thousands: 20, hospital_stays_pct: 1.5 },
        { rank: 12, ccsr_code: 'INJ010', condition: 'Internal organ injury, initial encounter', aggregate_cost_usd_millions: 285, national_cost_pct: 1.6, discharges_thousands: 10, hospital_stays_pct: 0.7 },
        { rank: 13, ccsr_code: 'CIR021', condition: 'Acute hemorrhagic cerebrovascular disease', aggregate_cost_usd_millions: 279, national_cost_pct: 1.6, discharges_thousands: 7, hospital_stays_pct: 0.5 },
        { rank: 14, ccsr_code: 'RSP012', condition: 'Respiratory failure; insufficiency; arrest', aggregate_cost_usd_millions: 245, national_cost_pct: 1.4, discharges_thousands: 12, hospital_stays_pct: 0.9 },
        { rank: 15, ccsr_code: 'DIG020', condition: 'Pancreatic disorders (excluding diabetes)', aggregate_cost_usd_millions: 241, national_cost_pct: 1.3, discharges_thousands: 24, hospital_stays_pct: 1.7 },
        { rank: 16, ccsr_code: 'DIG019', condition: 'Other liver disease', aggregate_cost_usd_millions: 230, national_cost_pct: 1.3, discharges_thousands: 14, hospital_stays_pct: 1.1 },
        { rank: 17, ccsr_code: 'SKN001', condition: 'Skin and subcutaneous tissue infections', aggregate_cost_usd_millions: 227, national_cost_pct: 1.3, discharges_thousands: 27, hospital_stays_pct: 2.0 },
        { rank: 18, ccsr_code: 'CIR011', condition: 'Coronary atherosclerosis and other heart disease', aggregate_cost_usd_millions: 211, national_cost_pct: 1.2, discharges_thousands: 8, hospital_stays_pct: 0.6 },
        { rank: 19, ccsr_code: 'INJ022', condition: 'Poisoning by drugs, initial encounter', aggregate_cost_usd_millions: 191, national_cost_pct: 1.1, discharges_thousands: 17, hospital_stays_pct: 1.2 },
        { rank: 20, ccsr_code: 'CIR017', condition: 'Cardiac dysrhythmias', aggregate_cost_usd_millions: 189, national_cost_pct: 1.1, discharges_thousands: 13, hospital_stays_pct: 1.0 },
      ],
    },
  },
  2017: {
    all: {
      brief: 'HCUP Statistical Brief #261, "National Inpatient Hospital Costs: The Most Expensive Conditions by Payer, 2017"',
      total_top20_aggregate_cost_usd_millions: 202529,
      total_top20_discharges_thousands: 15484,
      total_all_stays_aggregate_cost_usd_millions: 434186,
      total_all_stays_discharges_thousands: 35798,
      rows: [
        { rank: 1, ccsr_code: 'INF002', condition: 'Septicemia', aggregate_cost_usd_millions: 38239, national_cost_pct: 8.8, discharges_thousands: 2086, hospital_stays_pct: 5.8 },
        { rank: 2, ccsr_code: 'MUS006', condition: 'Osteoarthritis', aggregate_cost_usd_millions: 19907, national_cost_pct: 4.6, discharges_thousands: 1249, hospital_stays_pct: 3.5 },
        { rank: 3, ccsr_code: 'PNL001', condition: 'Liveborn (newborn infants)', aggregate_cost_usd_millions: 15972, national_cost_pct: 3.7, discharges_thousands: 3693, hospital_stays_pct: 10.3 },
        { rank: 4, ccsr_code: 'CIR009', condition: 'Acute myocardial infarction', aggregate_cost_usd_millions: 14342, national_cost_pct: 3.3, discharges_thousands: 662, hospital_stays_pct: 1.8 },
        { rank: 5, ccsr_code: 'CIR019', condition: 'Heart failure', aggregate_cost_usd_millions: 13583, national_cost_pct: 3.1, discharges_thousands: 1091, hospital_stays_pct: 3.0 },
        { rank: 6, ccsr_code: 'MUS011', condition: 'Spondylopathies/spondyloarthropathy (including infective)', aggregate_cost_usd_millions: 12305, national_cost_pct: 2.8, discharges_thousands: 532, hospital_stays_pct: 1.5 },
        { rank: 7, ccsr_code: 'RSP012', condition: 'Respiratory failure; insufficiency; arrest', aggregate_cost_usd_millions: 9179, national_cost_pct: 2.1, discharges_thousands: 534, hospital_stays_pct: 1.5 },
        { rank: 8, ccsr_code: 'CIR011', condition: 'Coronary atherosclerosis and other heart disease', aggregate_cost_usd_millions: 8711, national_cost_pct: 2.0, discharges_thousands: 374, hospital_stays_pct: 1.0 },
        { rank: 9, ccsr_code: 'CIR020', condition: 'Cerebral infarction', aggregate_cost_usd_millions: 7402, national_cost_pct: 1.7, discharges_thousands: 525, hospital_stays_pct: 1.5 },
        { rank: 10, ccsr_code: 'END003', condition: 'Diabetes mellitus with complication', aggregate_cost_usd_millions: 7271, national_cost_pct: 1.7, discharges_thousands: 658, hospital_stays_pct: 1.8 },
        { rank: 11, ccsr_code: 'RSP008', condition: 'Chronic obstructive pulmonary disease and bronchiectasis', aggregate_cost_usd_millions: 7013, national_cost_pct: 1.6, discharges_thousands: 761, hospital_stays_pct: 2.1 },
        { rank: 12, ccsr_code: 'CIR017', condition: 'Cardiac dysrhythmias', aggregate_cost_usd_millions: 6971, national_cost_pct: 1.6, discharges_thousands: 613, hospital_stays_pct: 1.7 },
        { rank: 13, ccsr_code: 'RSP002', condition: 'Pneumonia (except caused by tuberculosis)', aggregate_cost_usd_millions: 6452, national_cost_pct: 1.5, discharges_thousands: 637, hospital_stays_pct: 1.8 },
        { rank: 14, ccsr_code: 'INJ006', condition: 'Fracture of the neck of the femur (hip), initial encounter', aggregate_cost_usd_millions: 5628, national_cost_pct: 1.3, discharges_thousands: 323, hospital_stays_pct: 0.9 },
        { rank: 15, ccsr_code: 'INJ037', condition: 'Complication of other surgical/medical care, injury, initial encounter', aggregate_cost_usd_millions: 5608, national_cost_pct: 1.3, discharges_thousands: 325, hospital_stays_pct: 0.9 },
        { rank: 16, ccsr_code: 'CIR003', condition: 'Nonrheumatic and unspecified valve disorders', aggregate_cost_usd_millions: 5434, national_cost_pct: 1.3, discharges_thousands: 124, hospital_stays_pct: 0.3 },
        { rank: 17, ccsr_code: 'GEN002', condition: 'Acute and unspecified renal failure', aggregate_cost_usd_millions: 5140, national_cost_pct: 1.2, discharges_thousands: 542, hospital_stays_pct: 1.5 },
        { rank: 18, ccsr_code: 'DIG017', condition: 'Biliary tract disease', aggregate_cost_usd_millions: 4550, national_cost_pct: 1.0, discharges_thousands: 357, hospital_stays_pct: 1.0 },
        { rank: 19, ccsr_code: 'INJ033', condition: 'Complication of cardiovascular device, implant or graft, initial encounter', aggregate_cost_usd_millions: 4455, national_cost_pct: 1.0, discharges_thousands: 170, hospital_stays_pct: 0.5 },
        { rank: 20, ccsr_code: 'INJ005', condition: 'Fracture of the lower limb (except hip), initial encounter', aggregate_cost_usd_millions: 4368, national_cost_pct: 1.0, discharges_thousands: 226, hospital_stays_pct: 0.6 },
      ],
    },
  },
};

/** Lightweight free-text -> condition match. Matches against the `condition`
 *  label (substring, case-insensitive) in whichever year/payer table is
 *  queried, plus a few everyday synonyms for conditions whose CCSR label
 *  reads clinically (e.g. "septicemia" for "sepsis"). Not a full CCSR
 *  taxonomy — see mcps/meps/src/conditions.ts for that; this only needs to
 *  resolve what appears in the ~20-row tables above. */
export const CONDITION_SYNONYMS: Record<string, string> = {
  sepsis: 'septicemia',
  'congestive heart failure': 'heart failure',
  chf: 'heart failure',
  'heart attack': 'acute myocardial infarction',
  mi: 'acute myocardial infarction',
  ami: 'acute myocardial infarction',
  stroke: 'cerebral infarction',
  'ischemic stroke': 'cerebral infarction',
  afib: 'cardiac dysrhythmias',
  'atrial fibrillation': 'cardiac dysrhythmias',
  copd: 'chronic obstructive pulmonary disease',
  emphysema: 'chronic obstructive pulmonary disease',
  'hip fracture': 'fracture of the neck of the femur',
  'newborn': 'liveborn',
  newborns: 'liveborn',
  covid: 'coronavirus disease 2019',
  'covid-19': 'coronavirus disease 2019',
  'kidney failure': 'renal failure',
  'acute kidney injury': 'renal failure',
  aki: 'renal failure',
  'kidney disease': 'chronic kidney disease',
  ckd: 'chronic kidney disease',
  uti: 'urinary tract infections',
  'urinary tract infection': 'urinary tract infections',
};

/**
 * Sepsis-specific national outcomes, principal diagnosis of sepsis, by patient
 * population and reporting period. Source: Agency for Healthcare Research and
 * Quality (AHRQ), Healthcare Cost and Utilization Project (HCUP), National
 * Inpatient Sample (NIS), 2016-2021 — HCUP Statistical Brief #306, "Overview
 * of Outcomes for Inpatient Stays Involving Sepsis, 2016-2021" (April 2024),
 * Table 1. This is the only HCUP Statistical Brief found (as of 2026-10-21)
 * that reports a principal-diagnosis national figure for 2021 specifically.
 *
 * Average hospital costs are in US dollars per stay, rounded to the nearest
 * hundred (as published). Average length of stay is in days. Periods:
 *  - avg_2016_2019: 4-year average, 2016-2019
 *  - y2020 / y2021: the full-year estimate (stays with and without a
 *    co-occurring COVID-19 diagnosis)
 *  - y2020_with_covid / y2021_with_covid: stays that also carried a COVID-19
 *    diagnosis
 *  - y2020_without_covid / y2021_without_covid: stays with no COVID-19
 *    diagnosis
 */
export const SEPSIS_OUTCOMES_DATA_AS_OF = '2026-10-21';
export const SEPSIS_OUTCOMES_BRIEF =
  'HCUP Statistical Brief #306, "Overview of Outcomes for Inpatient Stays Involving Sepsis, 2016-2021" (April 2024), Table 1';

export type SepsisPeriod =
  | 'avg_2016_2019'
  | 'y2020'
  | 'y2020_with_covid'
  | 'y2020_without_covid'
  | 'y2021'
  | 'y2021_with_covid'
  | 'y2021_without_covid';

export const SEPSIS_PERIODS: SepsisPeriod[] = [
  'avg_2016_2019',
  'y2020',
  'y2020_with_covid',
  'y2020_without_covid',
  'y2021',
  'y2021_with_covid',
  'y2021_without_covid',
];

export type SepsisPopulation =
  | 'all'
  | 'adult_65_plus_nonmaternal'
  | 'adult_18_64_nonmaternal'
  | 'maternal'
  | 'pediatric_28days_17years'
  | 'neonatal_0_27days';

interface SepsisSeries {
  avg_length_of_stay_days: Record<SepsisPeriod, number>;
  avg_total_cost_usd: Record<SepsisPeriod, number>;
}

export const SEPSIS_OUTCOMES: Record<SepsisPopulation, SepsisSeries> = {
  all: {
    avg_length_of_stay_days: { avg_2016_2019: 8.2, y2020: 8.8, y2020_with_covid: 11.4, y2020_without_covid: 8.3, y2021: 9.2, y2021_with_covid: 12.0, y2021_without_covid: 8.5 },
    avg_total_cost_usd: { avg_2016_2019: 24600, y2020: 28300, y2020_with_covid: 37000, y2020_without_covid: 26600, y2021: 28800, y2021_with_covid: 38500, y2021_without_covid: 26000 },
  },
  adult_65_plus_nonmaternal: {
    avg_length_of_stay_days: { avg_2016_2019: 7.6, y2020: 8.2, y2020_with_covid: 10.9, y2020_without_covid: 7.6, y2021: 8.5, y2021_with_covid: 11.5, y2021_without_covid: 7.9 },
    avg_total_cost_usd: { avg_2016_2019: 21700, y2020: 25100, y2020_with_covid: 33100, y2020_without_covid: 23500, y2021: 25000, y2021_with_covid: 34100, y2021_without_covid: 23100 },
  },
  adult_18_64_nonmaternal: {
    avg_length_of_stay_days: { avg_2016_2019: 9.1, y2020: 9.7, y2020_with_covid: 12.1, y2020_without_covid: 9.1, y2021: 10.3, y2021_with_covid: 12.4, y2021_without_covid: 9.4 },
    avg_total_cost_usd: { avg_2016_2019: 28700, y2020: 32700, y2020_with_covid: 41900, y2020_without_covid: 30400, y2021: 33500, y2021_with_covid: 42300, y2021_without_covid: 30100 },
  },
  maternal: {
    avg_length_of_stay_days: { avg_2016_2019: 7.9, y2020: 7.3, y2020_with_covid: 11.7, y2020_without_covid: 6.8, y2021: 9.7, y2021_with_covid: 20.3, y2021_without_covid: 7.2 },
    avg_total_cost_usd: { avg_2016_2019: 31000, y2020: 31000, y2020_with_covid: 73700, y2020_without_covid: 26400, y2021: 43800, y2021_with_covid: 110100, y2021_without_covid: 27900 },
  },
  pediatric_28days_17years: {
    avg_length_of_stay_days: { avg_2016_2019: 9.0, y2020: 9.3, y2020_with_covid: 8.1, y2020_without_covid: 9.3, y2021: 9.1, y2021_with_covid: 10.9, y2021_without_covid: 8.9 },
    avg_total_cost_usd: { avg_2016_2019: 38200, y2020: 44800, y2020_with_covid: 42700, y2020_without_covid: 44900, y2021: 61100, y2021_with_covid: 59300, y2021_without_covid: 40100 },
  },
  neonatal_0_27days: {
    avg_length_of_stay_days: { avg_2016_2019: 13.3, y2020: 15.7, y2020_with_covid: 7.0, y2020_without_covid: 15.8, y2021: 16.2, y2021_with_covid: 9.5, y2021_without_covid: 16.3 },
    avg_total_cost_usd: { avg_2016_2019: 43400, y2020: 61100, y2020_with_covid: 10300, y2020_without_covid: 61700, y2021: 56300, y2021_with_covid: 29000, y2021_without_covid: 56900 },
  },
};

/** Any-listed-diagnosis sepsis stay counts (broader than principal-diagnosis
 * — includes sepsis as a co-occurring condition), national, all patient
 * populations combined, for the specific years the brief prints a number.
 * Source: same brief, Figure 1. Do not mix with SEPSIS_OUTCOMES above, which
 * is principal-diagnosis only — mixing the two populations under one count
 * would misstate both. */
export const SEPSIS_ANY_DIAGNOSIS_STAYS_MILLIONS: Record<string, number> = {
  '2016': 1.8,
  '2019': 2.1,
  '2021': 2.5,
  '2021_without_covid': 2.0,
};

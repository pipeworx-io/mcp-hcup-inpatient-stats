# hcup-inpatient-stats

National U.S. hospital inpatient discharges, aggregate costs, and sepsis
outcomes by principal diagnosis and year, from the Agency for Healthcare
Research and Quality's Healthcare Cost and Utilization Project (HCUP).

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1856+ live data sources. This is an independent, unofficial integration — not affiliated with, endorsed by, or published by the upstream provider.

This answers questions like "how many heart failure hospitalizations were
there nationally, and what did they cost" — the kind of number epidemiology
and market-sizing claims lean on, cited the way HFSA/AHA cite it: AHRQ HCUP
for hospitalization and cost figures.

## Tools

- `condition_hospital_costs(year?, payer?, condition?)` — the top-20 most
  expensive principal-diagnosis conditions nationally for a year (2022 or
  2017), with discharge counts, aggregate cost, and mean cost per stay.
  Optionally filtered to one condition ("heart failure", "sepsis", a CCSR
  code) or one expected payer (2022 only: Medicare, Medicaid, private
  insurance, self-pay).
- `sepsis_hospital_outcomes(period?, population?)` — national sepsis
  (principal diagnosis) average length of stay and mean cost per stay by
  year, 2016–2021, with/without a co-occurring COVID-19 diagnosis, broken out
  by patient population (adult 65+, adult 18–64, maternal, pediatric,
  neonatal). Also reports any-listed-diagnosis sepsis stay counts for the
  years AHRQ printed a number (2016, 2019, 2021) — a broader population than
  principal diagnosis, clearly labeled and never mixed with it.

## Auth

Keyless.

## Data sources

- Agency for Healthcare Research and Quality (AHRQ), Healthcare Cost and
  Utilization Project (HCUP) — the "Most Expensive Conditions by Payer"
  Statistical Brief series (2022 and 2017 editions) and the sepsis-outcomes
  Statistical Brief (2016–2021). These are AHRQ's own aggregate reports
  computed from the National Inpatient Sample and published freely, with no
  account or data use agreement.

**What this pack deliberately does NOT use:** HCUP's National Inpatient
Sample (NIS) and Nationwide Readmissions Database (NRD) microdata files are
purchased and governed by a clicked-through Data Use Agreement. This pack
never touches those files or anything requiring that agreement — every number
here comes from AHRQ's own public reports, which state the same underlying
statistics without the DUA.

**Why these numbers and not a live query:** AHRQ's interactive query tools
(publicly branded "HCUPnet" and "HCUP Fast Stats") were migrated to a
Tableau Server deployment. It answers ordinary browser traffic with no login
or account — this is not a DUA or credential wall — but a CloudFront-level
WAF in front of it returns a 403 to plain HTTP clients regardless of
User-Agent or header set, the same class of block a Cloudflare Worker's
data-center egress IP would hit. That makes it unreliable to query live from
here. AHRQ's static Statistical Brief reports (served from hcup-us.ahrq.gov,
no such block) carry substantially the same aggregate numbers directly from
the publisher, so this pack is built from those instead.

**Refresh path:** AHRQ posts new Statistical Briefs on an irregular schedule
(no fixed annual cadence — as of 2026-10-21, the "Most Expensive Conditions"
series has editions for 2004, 2006, 2008, 2011, 2013, 2017 and 2022, with no
2021 edition). Periodically check AHRQ's public statistical-briefs index
(no account needed) for a newer cross-condition brief or sepsis-outcomes
brief, re-transcribe its Table 1 (and any per-payer tables) into
`src/data.ts`, and bump the `*_DATA_AS_OF` constants there. There is no API
to poll — this is a manual, low-frequency transcription task, same as any
other government report-based pack in this catalog.

## Heart failure prevalence — not publicly tabulated

The acceptance criteria for this pack asked for heart failure prevalence from
a public NCHS/CDC table. None was found. Checked:

- **data.cdc.gov (Socrata)** — no dataset title or description matching
  "heart failure prevalence" or "heart failure" in the catalog search API.
  `chronicdata.cdc.gov` (PLACES / BRFSS) publishes self-reported "coronary
  heart disease or angina" prevalence by county/tract/place — a related but
  **different** measure (CHD/angina, not heart failure), and this pack does
  not substitute one for the other.
- **CDC NHIS** (National Health Interview Survey) publishes a data query
  tool, but it is a client-side application with no discoverable public JSON
  endpoint found during this build, and `cdc.gov/nchs/nhis/health-conditions.htm`
  itself 403s to a plain client.
- A national heart-failure prevalence figure (e.g. the commonly cited ~6.7
  million US adults) traces back to published literature (AHA's "Heart
  Disease and Stroke Statistics" update) that derives it from NHANES exam and
  questionnaire microdata via survey-weighted analysis — NHANES publishes the
  raw microdata (including the congestive-heart-failure question) publicly,
  but NCHS does not publish a ready-made HF-prevalence *table* from it; that
  analysis step is not something this pack reproduces.

If a public NCHS/CDC prevalence table surfaces later, add it as a third tool
rather than reopening this one.

## Notes

- "Discharges" / "hospital stays" are the unit of analysis throughout — a
  hospital stay, not a unique patient. A patient admitted multiple times in a
  year is counted once per stay.
- Costs are the hospital's **cost** to produce the care (HCUP
  Cost-to-Charge Ratios applied to billed charges), not amounts paid by
  payers, and exclude separately billed physician fees.
- Condition names and CCSR codes come from AHRQ's Clinical Classifications
  Software Refined (CCSR) for ICD-10-CM — the same system `meps` uses for its
  condition lookups (`mcps/meps/src/conditions.ts`), though this pack ships
  its own small synonym map scoped to the ~20-40 conditions that actually
  appear in these tables rather than the full CCSR taxonomy.

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "hcup-inpatient-stats": {
      "url": "https://gateway.pipeworx.io/hcup-inpatient-stats/mcp"
    }
  }
}
```

### What this endpoint actually serves

`tools/list` at `https://gateway.pipeworx.io/hcup-inpatient-stats/mcp` returns the tools in the table
above **plus the shared Pipeworx meta-tools** — `ask_pipeworx`,
`discover_tools`, `search_within`, `remember`/`recall` and the rest of the
gateway-wide set. So the tool count you see is larger than this table: a
single-pack endpoint currently lists roughly 30 shared tools alongside the
pack's own. The connection's `initialize` response states its exact scope, and
is the authoritative answer for a given day.

This is deliberate, not multiplexing by accident. The meta-tools are what let a
scoped connection answer a question this pack does not cover — via
`ask_pipeworx`, which routes across the whole catalog — without you adding a
second MCP server. There is currently no way to mount a pack endpoint without
them; if the extra schemas cost you more context than the routing is worth,
connect to the full gateway once rather than to several pack endpoints.

Or connect to the full Pipeworx gateway to get every pack's tools listed
directly, instead of just this one's:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

Both URLs reach the same gateway and the same 1856+ data sources. The
only difference is which pack's tools are listed **directly**; `ask_pipeworx`
reaches all of them from either one.

## No MCP client? Call it over HTTP

```bash
curl -X POST https://gateway.pipeworx.io/v1/tools/condition_hospital_costs \
  -H 'Content-Type: application/json' \
  -d '{"year":2022,"condition":"heart failure"}'
```

No account needed for the first calls. Inspect any tool: `GET https://gateway.pipeworx.io/v1/tools/condition_hospital_costs`. Find one: `POST https://gateway.pipeworx.io/v1/tools/search_packs` with `{"query":"..."}`.

## Run it from npm

`@pipeworx/mcp-hcup-inpatient-stats` is a local stdio bridge to the Pipeworx gateway: your MCP client
starts it with `npx`, and it forwards every call to the same
`https://gateway.pipeworx.io/hcup-inpatient-stats/mcp` endpoint shown above. It needs network access;
there is no offline mode.

```json
{
  "mcpServers": {
    "hcup-inpatient-stats": {
      "command": "npx",
      "args": ["-y", "@pipeworx/mcp-hcup-inpatient-stats"]
    }
  }
}
```

Without a key it calls anonymously, capped at 50 calls a day. A free account
raises that to 200 a day: get a key at https://pipeworx.io/signup and add
`"env": { "PIPEWORX_API_KEY": "<your key>" }` to the server entry.
The key is sent as a Bearer token, the same way a hosted connection sends it,
so calls are metered and billed exactly as they are there.

It lists **only** this pack's tools by default. Set `PIPEWORX_META_TOOLS=1` to
also list `ask_pipeworx` and the other gateway-wide tools.

Behind an HTTPS proxy: Node's built-in `fetch` does not read `HTTPS_PROXY` by
default. Newer Node releases honour it when `NODE_USE_ENV_PROXY=1` is set; check
your Node version's documentation.

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English —
this works on the pack endpoint above as well as on the full gateway:

```
ask_pipeworx({ question: "your question about Hcup Inpatient Stats data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT

export type IssueConfidence = "High" | "Medium" | "Low";

export type IssueScope = "P105" | "District proxy" | "State proxy" | "Operational proxy";

export type IssueCard = {
  slug: string;
  title: string;
  shortTitle: string;
  residentFrame: string;
  whyItMatters: string;
  localSignals: string[];
  caveats: string[];
  confidence: IssueConfidence;
  jurisdiction: string[];
  prioritisationLens: string[];
  validationQuestions: string[];
  representativeActions: string[];
  sourceNotes: string[];
  scope: IssueScope;
};

export const p105AreaFacts = [
  {
    label: "P105 population",
    value: "364.6k",
    note: "2022 figure. Constituency-level population context only; it is not a support count.",
  },
  {
    label: "Petaling district median household income",
    value: "RM9,618",
    note: "2022 district proxy; household pressure can vary sharply by neighbourhood and tenancy status.",
  },
  {
    label: "Petaling district mean household expenditure",
    value: "RM7,721",
    note: "2022 district proxy; useful for affordability context, not a P105-only measurement.",
  },
  {
    label: "Petaling district poverty / inequality",
    value: "1.6% poverty · 0.39198 Gini",
    note: "2022 district proxy. Low aggregate poverty can still hide pockets of stress.",
  },
  {
    label: "PJ district crime trend",
    value: "5,005 to 1,472",
    note: "Reported district crime fell from 2016 to 2023. Perception, hotspot, and under-reporting caveats still apply.",
  },
  {
    label: "Public transport data signal",
    value: "Prasarana GTFS accessible",
    note: "Operational feed availability can support route and first/last-mile analysis, but rider experience needs resident validation.",
  },
] as const;

export const p105Rubric = [
  {
    label: "Resident burden",
    prompt: "How many households could plausibly feel the issue in daily routines, costs, safety, or mobility?",
  },
  {
    label: "Severity and urgency",
    prompt: "Does delay create health, safety, income, schooling, or property damage risk?",
  },
  {
    label: "Evidence readiness",
    prompt: "Can open data, agency records, photos, maps, or repeated resident reports verify the pattern?",
  },
  {
    label: "Jurisdiction fit",
    prompt: "Is there a clear council, state, federal, operator, or inter-agency route for action?",
  },
  {
    label: "Representative leverage",
    prompt: "Can a representative convene agencies, request records, monitor repairs, or publish a follow-up trail?",
  },
] as const;

export const p105IssueCards: IssueCard[] = [
  {
    slug: "cost-of-living-household-pressure",
    title: "Cost of living and household pressure",
    shortTitle: "Household pressure",
    residentFrame:
      "Residents may be earning on paper but still feel squeezed by food, rent, transport, childcare, medical, and debt costs.",
    whyItMatters:
      "Petaling is relatively high-income, but the district expenditure baseline shows why affordability should be tested as lived pressure rather than assumed comfort.",
    localSignals: [
      "Petaling district median household income in 2022: RM9,618.",
      "Petaling district mean household expenditure in 2022: RM7,721.",
      "Petaling district poverty in 2022: 1.6%; Gini: 0.39198.",
    ],
    caveats: [
      "Income, expenditure, poverty, and Gini figures are Petaling district proxies, not P105-only measurements.",
      "Aggregate income can mask renters, single-earner families, informal workers, students, older residents, and caregivers.",
    ],
    confidence: "Medium",
    jurisdiction: ["Federal social protection", "State welfare", "Local council licensing and markets", "Private employers and landlords"],
    prioritisationLens: ["High daily burden", "Needs neighbourhood segmentation", "Strong resident validation need"],
    validationQuestions: [
      "Which recurring expense has increased most for your household in the past six months?",
      "Which neighbourhoods or household types are most exposed: renters, older residents, young families, students, or gig workers?",
      "What would help first: food price monitoring, rent advice, transport savings, childcare support, or targeted aid navigation?",
    ],
    representativeActions: [
      "Run a resident cost diary sample with privacy-safe categories, not names or addresses.",
      "Ask agencies to publish clear aid eligibility pathways and service counters for P105 residents.",
      "Convene local traders, tenant groups, and welfare offices around practical relief points.",
    ],
    sourceNotes: ["DOSM 2022 district-level household income, expenditure, poverty, and inequality context."],
    scope: "District proxy",
  },
  {
    slug: "public-transport-first-last-mile",
    title: "Public transport and first/last-mile gaps",
    shortTitle: "Transit gaps",
    residentFrame:
      "A train or bus line nearby does not automatically mean the trip is usable if walking paths, feeder routes, crossings, shade, cost, and timing do not work.",
    whyItMatters:
      "P105 has major transport assets, but residents experience access at the door-to-stop and stop-to-destination level.",
    localSignals: [
      "Prasarana GTFS feeds are accessible for route, stop, and schedule analysis.",
      "First/last-mile issues can be mapped using stops, walking routes, crossings, gradients, shade, and service frequency.",
    ],
    caveats: [
      "GTFS is an operational data source; it does not prove reliability, crowding, safety, or accessibility experience by itself.",
      "Route coverage should be validated against actual walking paths, barriers, and resident travel times.",
    ],
    confidence: "High",
    jurisdiction: ["Prasarana and operators", "APAD and transport agencies", "MBPJ", "State transport coordination"],
    prioritisationLens: ["Strong data readiness", "High leverage through maps", "Needs accessibility and safety checks"],
    validationQuestions: [
      "Which trip is still hard even though there is a nearby stop or station?",
      "Where are the missing crossings, broken walkways, poor lighting, unsafe wait areas, or unreliable feeder links?",
      "What time of day is the problem worst: school run, commute, late night, rain, or weekends?",
    ],
    representativeActions: [
      "Publish a stop-access audit that combines GTFS stops with resident-reported barriers.",
      "Request operator responses for route gaps, frequency gaps, and feeder-bus pain points.",
      "Coordinate MBPJ fixes for crossings, lighting, walkway continuity, shade, and bus stop conditions.",
    ],
    sourceNotes: ["Prasarana GTFS accessibility for transit-feed analysis."],
    scope: "Operational proxy",
  },
  {
    slug: "flooding-drainage",
    title: "Flooding and drainage reliability",
    shortTitle: "Flooding and drainage",
    residentFrame:
      "Short but repeated flash floods can disrupt school runs, damage vehicles and homes, and make residents feel that drains are maintained only after a crisis.",
    whyItMatters:
      "Flood response is highly local: the right issue surface is not just whether flooding exists, but which drain, slope, road edge, or maintenance cycle fails repeatedly.",
    localSignals: [
      "Resident submissions can be tied to photos, dates, street segments, drain conditions, and repeat locations.",
      "Agency response pathways often cross council maintenance, state drainage, and road ownership boundaries.",
    ],
    caveats: [
      "No P105-wide verified flood count is included here; this card is a framework for validation.",
      "Rain intensity, upstream works, private development, roadside drains, and river systems can fall under different owners.",
    ],
    confidence: "Medium",
    jurisdiction: ["MBPJ", "JPS", "State agencies", "Road owners", "Developers or property managers where relevant"],
    prioritisationLens: ["High damage risk", "Location-specific evidence needed", "Cross-agency follow-up likely"],
    validationQuestions: [
      "Which exact stretch floods repeatedly, and after how much rain?",
      "Is the issue blocked drains, undersized drains, backflow, slope runoff, road design, construction debris, or river overflow?",
      "What evidence exists: dates, photos, repair reports, complaint numbers, or nearby development works?",
    ],
    representativeActions: [
      "Create a public issue log by location without exposing private addresses.",
      "Ask agencies for drain-cleaning schedules, complaint response times, and ownership boundaries.",
      "Track each site from report to inspection, mitigation, and post-rain review.",
    ],
    sourceNotes: ["Issue framework based on resident validation needs; no new flood statistic asserted."],
    scope: "P105",
  },
  {
    slug: "safety-property-crime-perception",
    title: "Safety and property-crime perception",
    shortTitle: "Safety perception",
    residentFrame:
      "Even where reported crime falls, residents may still change routines because of break-ins, snatch theft fear, poor lighting, parking-area risk, or under-reported incidents.",
    whyItMatters:
      "The product should separate verified crime trends from lived safety perception so responses do not dismiss residents or inflate fear.",
    localSignals: [
      "PJ district reported crime fell from 5,005 in 2016 to 1,472 in 2023.",
      "Safety perception can be tested through hotspot reports, lighting gaps, route avoidance, and property-management feedback.",
    ],
    caveats: [
      "Crime figures are PJ district-level, not P105-only, and reported cases may not capture under-reporting.",
      "Perception is valid for public-space planning but should not be treated as proof of crime at a named person or property.",
    ],
    confidence: "Medium",
    jurisdiction: ["PDRM", "MBPJ", "Resident associations", "Property managers", "State and federal safety programmes"],
    prioritisationLens: ["Sensitive claims risk", "Needs safe aggregation", "Strong public-realm action path"],
    validationQuestions: [
      "Which places do residents avoid, and why: lighting, visibility, repeat incidents, harassment, parking, or route isolation?",
      "Are concerns based on personal experience, neighbourhood reports, police reports, or social media rumours?",
      "What non-invasive fix would help first: lighting, patrol coordination, trimming, CPTED design, reporting pathways, or victim support?",
    ],
    representativeActions: [
      "Map safety concerns without naming accused individuals or private households.",
      "Request lighting, trimming, and public-space maintenance checks for repeated concern points.",
      "Coordinate a reporting guide with PDRM and residents that avoids vigilantism and protects privacy.",
    ],
    sourceNotes: ["PJ district reported crime trend, 2016 to 2023."],
    scope: "District proxy",
  },
  {
    slug: "housing-rent-pressure",
    title: "Housing and rent pressure",
    shortTitle: "Housing and rent",
    residentFrame:
      "Renters, room tenants, young workers, students, and families may face pressure even in a high-income district if rents, deposits, maintenance, and commute costs rise together.",
    whyItMatters:
      "Housing pressure links directly to cost of living, transport dependency, school stability, and whether residents can remain near support networks.",
    localSignals: [
      "Petaling district income and expenditure figures provide affordability context but do not show rent burden directly.",
      "Resident validation can separate rent increases, maintenance disputes, crowding, deposits, and displacement risk.",
    ],
    caveats: [
      "No verified P105 rent index is included here; treat this as a priority hypothesis for resident validation.",
      "Housing levers differ for private rentals, strata units, low-cost housing, public housing, and land-use planning.",
    ],
    confidence: "Low",
    jurisdiction: ["State housing agencies", "MBPJ planning and enforcement", "Strata bodies", "Private landlords", "Federal housing policy"],
    prioritisationLens: ["Potentially severe burden", "Evidence gap", "Requires tenancy-sensitive design"],
    validationQuestions: [
      "Are residents struggling with rent amount, deposit, eviction risk, maintenance, overcrowding, or access to affordable units?",
      "Which groups are most affected: families, older residents, students, migrant workers, young workers, or OKU residents?",
      "What records can residents safely share without exposing private tenancy details?",
    ],
    representativeActions: [
      "Set up a privacy-safe housing pressure survey that avoids landlord naming unless verified through a formal channel.",
      "Compile aid, tribunal, strata, and council contact pathways in one resident guide.",
      "Request state and council briefings on affordable housing supply, maintenance, and complaint response routes affecting P105.",
    ],
    sourceNotes: ["Petaling district income and expenditure context; no P105 rent statistic asserted."],
    scope: "District proxy",
  },
  {
    slug: "health-dengue",
    title: "Health and dengue prevention",
    shortTitle: "Health and dengue",
    residentFrame:
      "Dengue risk, clinic access, older-resident care, mental health, and preventive health all become local when residents need fast, understandable pathways before illness escalates.",
    whyItMatters:
      "Dengue and public health work depends on early reporting, environmental action, and trust between residents, council, health offices, schools, and property managers.",
    localSignals: [
      "Dengue validation can use resident reports of hotspots, stagnant water, fogging communication, and building-management response.",
      "Health-access validation can identify clinic travel barriers, appointment pain points, and information gaps.",
    ],
    caveats: [
      "No P105 dengue count is included here; avoid implying a verified outbreak or ranking.",
      "Health claims must avoid naming patients, households, or unverified premises as sources of disease.",
    ],
    confidence: "Medium",
    jurisdiction: ["District health office", "MBPJ", "Schools", "Property managers", "State and federal health agencies"],
    prioritisationLens: ["Potential health severity", "Privacy-sensitive", "Actionable through prevention loops"],
    validationQuestions: [
      "Where do residents see stagnant water or repeated dengue notices without sustained follow-up?",
      "Do residents understand who to contact and what happens after a report?",
      "Which health-access barriers are local: travel, cost, language, appointment systems, mobility, or caregiver constraints?",
    ],
    representativeActions: [
      "Publish a dengue-prevention reporting guide and escalation path for repeated hotspots.",
      "Convene health office, council, schools, and property managers for prevention follow-up where residents report recurring risk.",
      "Collect health-access barriers in aggregate categories only, without patient details.",
    ],
    sourceNotes: ["Issue framework only; no P105 dengue statistic asserted."],
    scope: "P105",
  },
  {
    slug: "elderly-oku-pedestrian-accessibility",
    title: "Elderly, OKU, and pedestrian accessibility",
    shortTitle: "Accessibility",
    residentFrame:
      "A neighbourhood can look connected on a map but still be unusable for wheelchair users, older residents, parents with strollers, visually impaired residents, and people walking in heat or rain.",
    whyItMatters:
      "Accessibility is a daily dignity issue and a practical test of whether public transport, shops, clinics, schools, and services are genuinely reachable.",
    localSignals: [
      "Prasarana GTFS stop data can help identify access points that need walking-route audits.",
      "Resident validation can capture kerb cuts, tactile paving, obstructions, slope, shade, crossing timing, lighting, and walkway continuity.",
    ],
    caveats: [
      "Transport-feed data does not show whether the walking route is accessible or safe.",
      "Accessibility barriers should be documented with location evidence while avoiding photos that expose vulnerable individuals without consent.",
    ],
    confidence: "High",
    jurisdiction: ["MBPJ", "Prasarana and operators", "JKR or road owners", "Property owners", "State accessibility programmes"],
    prioritisationLens: ["Equity impact", "High auditability", "Often fixable through maintenance and design standards"],
    validationQuestions: [
      "Which specific route is impossible or unsafe for an older resident, OKU resident, stroller, or pedestrian?",
      "What is the barrier: missing ramp, blocked walkway, drain cover, crossing time, bus stop access, shade, lighting, or surface condition?",
      "Which destination matters most: clinic, school, market, LRT/MRT/bus stop, park, or government service?",
    ],
    representativeActions: [
      "Run a barrier audit around clinics, schools, markets, stations, and bus stops using resident photos and map pins.",
      "Request council repair dates and operator access fixes for each validated barrier.",
      "Publish before/after updates for repairs without turning resident reports into public complaint rank lists.",
    ],
    sourceNotes: ["Prasarana GTFS accessibility for stop mapping; resident audits needed for walkability and universal-access conditions."],
    scope: "Operational proxy",
  },
  {
    slug: "local-maintenance",
    title: "Local maintenance and response reliability",
    shortTitle: "Local maintenance",
    residentFrame:
      "Potholes, clogged drains, broken lights, overgrown trees, damaged parks, illegal dumping, and slow complaint loops shape whether residents trust basic services.",
    whyItMatters:
      "Maintenance issues are often small individually but serious when they repeat, linger, or fall between agency responsibilities.",
    localSignals: [
      "Resident reports can capture location, date, complaint reference, hazard type, response time, and whether the fix lasted.",
      "This issue links to flood prevention, safety perception, pedestrian accessibility, and local business conditions.",
    ],
    caveats: [
      "No public complaint count or ward ranking is included here.",
      "A visible issue log must not shame individual officers, contractors, residents, or premises without due process.",
    ],
    confidence: "High",
    jurisdiction: ["MBPJ", "Concessionaires", "Road owners", "Utilities", "Property managers where relevant"],
    prioritisationLens: ["High actionability", "Evidence easy to collect", "Needs response-time tracking"],
    validationQuestions: [
      "What is broken, where is it, when was it reported, and what reference number exists?",
      "Is the problem unresolved, repeatedly patched, dangerous, or unclear in agency ownership?",
      "What would count as fixed: repair, cleaning, enforcement, redesign, signposting, or scheduled maintenance?",
    ],
    representativeActions: [
      "Maintain a private-to-public issue tracker that shows verified locations and status without public popularity counts.",
      "Ask responsible agencies for service standards and escalation timelines.",
      "Review repeat-failure locations monthly and publish lessons on what changed or why it is blocked.",
    ],
    sourceNotes: ["Issue framework only; no public complaint count asserted."],
    scope: "P105",
  },
];

export const p105IssuePrinciples = [
  "Issue-first, person-second: start with resident burden and evidence before naming any representative pathway.",
  "No public counts, rank lists, or popularity indicators until methodology, review, and privacy rules are published.",
  "Every card must show caveats, confidence, jurisdiction, validation questions, and practical action routes.",
  "District, state, and operational proxies are labelled clearly so residents know what is proven and what still needs local validation.",
] as const;

/** Response type for the POST endpoint */
export type AutofixPostResponse = {
  run_id: number;
};

/** Response type for the GET endpoint */
export type AutofixStateResponse = {
  autofix: { [key: string]: unknown | undefined } | null;
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type BaseDataConditionGroupValidator = {
  id?: string;
  /** * `any` * `any-short` * `all` * `none` */
  logic_type: "any" | "any-short" | "all" | "none";
  conditions?: (unknown)[];
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type BaseDetectorTypeValidator = {
  /** Name of the monitor. */
  name: string;
  /** The type of monitor - `metric_issue`. */
  type: string;
  /** The IDs of the alerts to connect this monitor to. Use the 'Fetch Alerts' endpoint to find the IDs. */
  workflow_ids?: (number)[];
  /**              The data sources for the monitor to use based on what you want to measure.              **Number of Errors Metric Monitor**             - `eventTypes`: Any of `error` or `default`.             ```json                 [                     {                         "aggregate": "count()",                         "dataset" : "events",                         "environment": "prod",                         "eventTypes": ["default", "error"],                         "query": "is:unresolved",                         "queryType": 0,                         "timeWindow": 3600,                     },                 ],             ```              **Users Experiencing Errors Metric Monitor**             - `eventTypes`: Any of `error` or `default`.             ```json                 [                     {                         "aggregate": "count_unique(tags[sentry:user])",                         "dataset" : "events",                         "environment": "prod",                         "eventTypes": ["default", "error"],                         "query": "is:unresolved",                         "queryType": 0,                         "timeWindow": 3600,                     },                 ],             ```               **Throughput Metric Monitor**             ```json                 [                     {                         "aggregate":"count(span.duration)",                         "dataset":"events_analytics_platform",                         "environment":"prod",                         "eventTypes":["trace_item_span"]                         "query":"",                         "queryType":1,                         "timeWindow":3600,                         "extrapolationMode":"unknown",                     },                 ],             ```              **Duration Metric Monitor**             ```json                 [                     {                         "aggregate":"p95(span.duration)",                         "dataset":"events_analytics_platform",                         "environment":"prod",                         "eventTypes":["trace_item_span"]                         "query":"",                         "queryType":1,                         "timeWindow":3600,                         "extrapolationMode":"unknown",                     },                 ],             ```              **Failure Rate Metric Monitor**             ```json                 [                     {                         "aggregate":"failure_rate()",                         "dataset":"events_analytics_platform",                         "environment":"prod",                         "eventTypes":["trace_item_span"]                         "query":"",                         "queryType":1,                         "timeWindow":3600,                         "extrapolationMode":"unknown",                     },                 ],             ```              **Largest Contentful Paint Metric Monitor**             - `dataset`: If a custom percentile is used, dataset is `transactions`. Otherwise, dataset is `events_analytics_platform`.             - `aggregate`: Valid values are `avg(measurements.lcp)`, `p50(measurements.lcp)`, `p75(measurements.lcp)`, `p95(measurements.lcp)`, `p99(measurements.lcp)`, `p100(measurements.lcp)`, and `percentile(measurements.lcp,x)`, where `x` is your custom percentile.              ```json                 [                     {                         "aggregate":"p95(measurements.lcp)",                         "dataset":"events_analytics_platform",                         "environment":"prod",                         "eventTypes":["trace_item_span"]                         "query":"",                         "queryType":1,                         "timeWindow":3600,                         "extrapolationMode":"unknown",                     },                 ],             ```              **Custom Metric Monitor**             - `dataset`: If a custom percentile is used, dataset is `transactions`. Otherwise, dataset is `events_analytics_platform`.             - `aggregate`: Valid values are:             `avg(x)`, where `x` is `transaction.duration`, `measurements.cls`, `measurements.fcp`, `measurements.fid`, `measurements.fp`, `measurements.lcp`, `measurements.ttfb`, or `measurements.ttfb.requesttime`.             `p50(x)`, where `x` is `transaction.duration`, `measurements.cls`, `measurements.fcp`, `measurements.fid`, `measurements.fp`, `measurements.lcp`, `measurements.ttfb`, or `measurements.ttfb.requesttime`.             `p75(x)`, where x is `transaction.duration`, `measurements.cls`, `measurements.fcp`, `measurements.fid`, `measurements.fp`, `measurements.lcp`, `measurements.ttfb`, or `measurements.ttfb.requesttime`.             `p95(x)`, where x is `transaction.duration`, `measurements.cls`, `measurements.fcp`, `measurements.fid`, `measurements.fp`, `measurements.lcp`, `measurements.ttfb`, or `measurements.ttfb.requesttime`.             `p99(x)`, where x is `transaction.duration`, `measurements.cls`, `measurements.fcp`, `measurements.fid`, `measurements.fp`, `measurements.lcp`, `measurements.ttfb`, or `measurements.ttfb.requesttime`.             `p100(x)`, where `x` is `transaction.duration`, `measurements.cls`, `measurements.fcp`, `measurements.fid`, `measurements.fp`, `measurements.lcp`, `measurements.ttfb`, or `measurements.ttfb.requesttime`.             `percentile(x,y)`, where `x` is `transaction.duration`, `measurements.cls`, `measurements.fcp`, `measurements.fid`, `measurements.fp`, `measurements.lcp`, `measurements.ttfb`, or `measurements.ttfb.requesttime`, and `y` is the custom percentile.             `failure_rate()`             `apdex(x)`, where `x` is the value of the Apdex score.             `count()`              ```json             [                 {                     "aggregate": "p75(measurements.ttfb)"                     "dataset": "events_analytics_platform",                     "queryType": 1,                 },             ],  */
  data_sources?: (unknown)[];
  /**              The issue detection type configuration.               - `detectionType`                 - `static`: Threshold based monitor                 - `percent`: Change based monitor                 - `dynamic`: Dynamic monitor             - `comparisonDelta`: If selecting a **change** detection type, the comparison delta is the time period at which to compare against in minutes.             For example, a value of 3600 compares the metric tracked against data 1 hour ago.                 - `300`: 5 minutes                 - `900`: 15 minutes                 - `3600`: 1 hour                 - `86400`: 1 day                 - `604800`: 1 week                 - `2592000`: 1 month              **Threshold**             ```json             {                 "detectionType": "static",             }             ```             **Change**             ```json             {                 "detectionType": "percent",                 "comparisonDelta": 3600,             }             ```             **Dynamic**             ```json             {                 "detectionType": "dynamic",             }             ```          */
  config?: { [key: string]: unknown | undefined };
  /**              Issue detection configuration for when to create an issue and at what priority level.               - `logicType`: `any`             - `type`: Any of `gt` (greater than), `lte` (less than or equal), or `anomaly_detection` (dynamic)             - `comparison`: Any positive integer. This is threshold that must be crossed for the monitor to create an issue, e.g. "Create a metric issue when there are more than 5 unresolved error events".                 - If creating a **dynamic** monitor, see the options below.                     - `seasonality`: `auto`                     - `sensitivity`: Level of responsiveness. Options are one of `low`, `medium`, or `high`                     - `thresholdType`: If you want to be alerted to anomalies that are moving above, below, or in both directions in relation to your threshold.                         - `0`: Above                         - `1`: Below                         - `2`: Above and below              - `conditionResult`: The issue state change when the threshold is crossed.                 - `75`: High priority                 - `50`: Low priority                 - `0`: Resolved               **Threshold and Change Monitor**             ```json                 "logicType": "any",                 "conditions": [                     {                         "type": "gt",                         "comparison": 10,                         "conditionResult": 75                     },                     {                         "type": "lte",                         "comparison": 10,                         "conditionResult": 0                     }                 ],                 "actions": []             ```              **Threshold Monitor with Medium Priority**             ```json                 "logicType": "any",                 "conditions": [                     {                         type: "gt",                         comparison: 5,                         conditionResult: 75                     },                     {                         type: "gt",                         comparison: 2,                         conditionResult: 50                     },                     {                         type: "lte",                         comparison: 2,                         conditionResult: 0                     }                 ],                 "actions": []             ```              **Dynamic Monitor**             ```json                 "logicType": "any",                 "conditions": [                     {                         "type": "anomaly_detection",                         "comparison": {                             "seasonality": "auto",                             "sensitivity": "medium",                             "thresholdType": 2                         },                         "conditionResult": 75                     }                 ],                 "actions": []             ```          */
  condition_group?: { id?: string; logic_type: "any" | "any-short" | "all" | "none"; conditions?: (unknown)[] };
  /**              The ID user or team who owns the monitor or alert prefaced by the string 'user' or 'team'.              **User**             ```json                 "user:123456"             ```              **Team**             ```json                 "team:456789"             ```          */
  owner?: string | null;
  /** A description of the monitor. Will be used in the resulting issue. */
  description?: string | null;
  /** Set to False if you want to disable the monitor. */
  enabled?: boolean;
};

export type BaseTeam = {
  id: string;
  slug: string;
  name: string;
  dateCreated: string | null;
  isMember: boolean;
  teamRole: string | null;
  flags: { [key: string]: unknown | undefined };
  access: (string)[];
  hasAccess: boolean;
  isPending: boolean;
  memberCount: number;
  avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null };
};

/** Serializer for individual branch nodes from GraphQL response */
export type BranchNode = {
  name: string;
};

/** Serializer for repository branches response */
export type Branches = {
  defaultBranch: string;
  results: ({ name: string })[];
  /** Serializer for pagination information */
  pageInfo: { endCursor: string | null; startCursor: string | null; hasPreviousPage: boolean; hasNextPage: boolean };
  totalCount: number;
};

export type BulkUpdateAlerts = {
  /** Whether to enable or disable the alerts */
  enabled: boolean;
};

export type BulkUpdateMonitors = {
  /** Whether to enable or disable the monitors */
  enabled: boolean;
};

export type CheckInList = ({ groups?: (string)[]; id: string; environment: string; status: string; duration: number | null; dateCreated: string; dateAdded: string; dateUpdated: string; dateInProgress: string | null; dateClock: string; expectedTime: string; monitorConfig: { schedule_type: "crontab" | "interval"; schedule: string | (number)[]; checkin_margin: number | null; max_runtime: number | null; timezone: string | null; failure_issue_threshold: number | null; recovery_threshold: number | null; alert_rule_id: number | null } })[];

export type Commit = {
  id: string;
  repository?: string | null;
  message?: string | null;
  author_name?: string | null;
  author_email?: string | null;
  timestamp?: string | null;
  patch_set?: ({ path: string; type: string })[] | null;
};

export type CommitPatchSet = {
  path: string;
  type: string;
};

export type CommitSerializerResponse = ({ id: string; message: string | null; dateCreated: string; pullRequest: { id: string; title: string | null; message: string | null; dateCreated: string; repository: { id?: string; name?: string; url?: string | null; provider?: { [key: string]: string | undefined }; status?: string; dateCreated?: string; integrationId?: string | null; externalSlug?: string | null; externalId?: string | null; settings?: { enabledCodeReview: boolean; codeReviewTriggers: (string)[] } | null }; author: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } | { name: string | null; email: string }; externalUrl: string } | null; suspectCommitType: string; repository?: { id?: string; name?: string; url?: string | null; provider?: { [key: string]: string | undefined }; status?: string; dateCreated?: string; integrationId?: string | null; externalSlug?: string | null; externalId?: string | null; settings?: { enabledCodeReview: boolean; codeReviewTriggers: (string)[] } | null }; author?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } | { name: string | null; email: string } })[];

export type ConfigValidator = {
  /** Currently supports "crontab" or "interval"  * `crontab` * `interval` */
  schedule_type?: "crontab" | "interval";
  /** Varies depending on the schedule_type. Is either a crontab string, or a 2 element tuple for intervals (e.g. [1, 'day']) */
  schedule: unknown;
  /** How long (in minutes) after the expected checkin time will we wait until we consider the checkin to have been missed. */
  checkin_margin?: number | null;
  /** How long (in minutes) is the checkin allowed to run for in CheckInStatus.IN_PROGRESS before it is considered failed. */
  max_runtime?: number | null;
  /** tz database style timezone string  * `Africa/Abidjan` * `Africa/Accra` * `Africa/Addis_Ababa` * `Africa/Algiers` * `Africa/Asmara` * `Africa/Asmera` * `Africa/Bamako` * `Africa/Bangui` * `Africa/Banjul` * `Africa/Bissau` * `Africa/Blantyre` * `Africa/Brazzaville` * `Africa/Bujumbura` * `Africa/Cairo` * `Africa/Casablanca` * `Africa/Ceuta` * `Africa/Conakry` * `Africa/Dakar` * `Africa/Dar_es_Salaam` * `Africa/Djibouti` * `Africa/Douala` * `Africa/El_Aaiun` * `Africa/Freetown` * `Africa/Gaborone` * `Africa/Harare` * `Africa/Johannesburg` * `Africa/Juba` * `Africa/Kampala` * `Africa/Khartoum` * `Africa/Kigali` * `Africa/Kinshasa` * `Africa/Lagos` * `Africa/Libreville` * `Africa/Lome` * `Africa/Luanda` * `Africa/Lubumbashi` * `Africa/Lusaka` * `Africa/Malabo` * `Africa/Maputo` * `Africa/Maseru` * `Africa/Mbabane` * `Africa/Mogadishu` * `Africa/Monrovia` * `Africa/Nairobi` * `Africa/Ndjamena` * `Africa/Niamey` * `Africa/Nouakchott` * `Africa/Ouagadougou` * `Africa/Porto-Novo` * `Africa/Sao_Tome` * `Africa/Timbuktu` * `Africa/Tripoli` * `Africa/Tunis` * `Africa/Windhoek` * `America/Adak` * `America/Anchorage` * `America/Anguilla` * `America/Antigua` * `America/Araguaina` * `America/Argentina/Buenos_Aires` * `America/Argentina/Catamarca` * `America/Argentina/ComodRivadavia` * `America/Argentina/Cordoba` * `America/Argentina/Jujuy` * `America/Argentina/La_Rioja` * `America/Argentina/Mendoza` * `America/Argentina/Rio_Gallegos` * `America/Argentina/Salta` * `America/Argentina/San_Juan` * `America/Argentina/San_Luis` * `America/Argentina/Tucuman` * `America/Argentina/Ushuaia` * `America/Aruba` * `America/Asuncion` * `America/Atikokan` * `America/Atka` * `America/Bahia` * `America/Bahia_Banderas` * `America/Barbados` * `America/Belem` * `America/Belize` * `America/Blanc-Sablon` * `America/Boa_Vista` * `America/Bogota` * `America/Boise` * `America/Buenos_Aires` * `America/Cambridge_Bay` * `America/Campo_Grande` * `America/Cancun` * `America/Caracas` * `America/Catamarca` * `America/Cayenne` * `America/Cayman` * `America/Chicago` * `America/Chihuahua` * `America/Ciudad_Juarez` * `America/Coral_Harbour` * `America/Cordoba` * `America/Costa_Rica` * `America/Coyhaique` * `America/Creston` * `America/Cuiaba` * `America/Curacao` * `America/Danmarkshavn` * `America/Dawson` * `America/Dawson_Creek` * `America/Denver` * `America/Detroit` * `America/Dominica` * `America/Edmonton` * `America/Eirunepe` * `America/El_Salvador` * `America/Ensenada` * `America/Fort_Nelson` * `America/Fort_Wayne` * `America/Fortaleza` * `America/Glace_Bay` * `America/Godthab` * `America/Goose_Bay` * `America/Grand_Turk` * `America/Grenada` * `America/Guadeloupe` * `America/Guatemala` * `America/Guayaquil` * `America/Guyana` * `America/Halifax` * `America/Havana` * `America/Hermosillo` * `America/Indiana/Indianapolis` * `America/Indiana/Knox` * `America/Indiana/Marengo` * `America/Indiana/Petersburg` * `America/Indiana/Tell_City` * `America/Indiana/Vevay` * `America/Indiana/Vincennes` * `America/Indiana/Winamac` * `America/Indianapolis` * `America/Inuvik` * `America/Iqaluit` * `America/Jamaica` * `America/Jujuy` * `America/Juneau` * `America/Kentucky/Louisville` * `America/Kentucky/Monticello` * `America/Knox_IN` * `America/Kralendijk` * `America/La_Paz` * `America/Lima` * `America/Los_Angeles` * `America/Louisville` * `America/Lower_Princes` * `America/Maceio` * `America/Managua` * `America/Manaus` * `America/Marigot` * `America/Martinique` * `America/Matamoros` * `America/Mazatlan` * `America/Mendoza` * `America/Menominee` * `America/Merida` * `America/Metlakatla` * `America/Mexico_City` * `America/Miquelon` * `America/Moncton` * `America/Monterrey` * `America/Montevideo` * `America/Montreal` * `America/Montserrat` * `America/Nassau` * `America/New_York` * `America/Nipigon` * `America/Nome` * `America/Noronha` * `America/North_Dakota/Beulah` * `America/North_Dakota/Center` * `America/North_Dakota/New_Salem` * `America/Nuuk` * `America/Ojinaga` * `America/Panama` * `America/Pangnirtung` * `America/Paramaribo` * `America/Phoenix` * `America/Port-au-Prince` * `America/Port_of_Spain` * `America/Porto_Acre` * `America/Porto_Velho` * `America/Puerto_Rico` * `America/Punta_Arenas` * `America/Rainy_River` * `America/Rankin_Inlet` * `America/Recife` * `America/Regina` * `America/Resolute` * `America/Rio_Branco` * `America/Rosario` * `America/Santa_Isabel` * `America/Santarem` * `America/Santiago` * `America/Santo_Domingo` * `America/Sao_Paulo` * `America/Scoresbysund` * `America/Shiprock` * `America/Sitka` * `America/St_Barthelemy` * `America/St_Johns` * `America/St_Kitts` * `America/St_Lucia` * `America/St_Thomas` * `America/St_Vincent` * `America/Swift_Current` * `America/Tegucigalpa` * `America/Thule` * `America/Thunder_Bay` * `America/Tijuana` * `America/Toronto` * `America/Tortola` * `America/Vancouver` * `America/Virgin` * `America/Whitehorse` * `America/Winnipeg` * `America/Yakutat` * `America/Yellowknife` * `Antarctica/Casey` * `Antarctica/Davis` * `Antarctica/DumontDUrville` * `Antarctica/Macquarie` * `Antarctica/Mawson` * `Antarctica/McMurdo` * `Antarctica/Palmer` * `Antarctica/Rothera` * `Antarctica/South_Pole` * `Antarctica/Syowa` * `Antarctica/Troll` * `Antarctica/Vostok` * `Arctic/Longyearbyen` * `Asia/Aden` * `Asia/Almaty` * `Asia/Amman` * `Asia/Anadyr` * `Asia/Aqtau` * `Asia/Aqtobe` * `Asia/Ashgabat` * `Asia/Ashkhabad` * `Asia/Atyrau` * `Asia/Baghdad` * `Asia/Bahrain` * `Asia/Baku` * `Asia/Bangkok` * `Asia/Barnaul` * `Asia/Beirut` * `Asia/Bishkek` * `Asia/Brunei` * `Asia/Calcutta` * `Asia/Chita` * `Asia/Choibalsan` * `Asia/Chongqing` * `Asia/Chungking` * `Asia/Colombo` * `Asia/Dacca` * `Asia/Damascus` * `Asia/Dhaka` * `Asia/Dili` * `Asia/Dubai` * `Asia/Dushanbe` * `Asia/Famagusta` * `Asia/Gaza` * `Asia/Harbin` * `Asia/Hebron` * `Asia/Ho_Chi_Minh` * `Asia/Hong_Kong` * `Asia/Hovd` * `Asia/Irkutsk` * `Asia/Istanbul` * `Asia/Jakarta` * `Asia/Jayapura` * `Asia/Jerusalem` * `Asia/Kabul` * `Asia/Kamchatka` * `Asia/Karachi` * `Asia/Kashgar` * `Asia/Kathmandu` * `Asia/Katmandu` * `Asia/Khandyga` * `Asia/Kolkata` * `Asia/Krasnoyarsk` * `Asia/Kuala_Lumpur` * `Asia/Kuching` * `Asia/Kuwait` * `Asia/Macao` * `Asia/Macau` * `Asia/Magadan` * `Asia/Makassar` * `Asia/Manila` * `Asia/Muscat` * `Asia/Nicosia` * `Asia/Novokuznetsk` * `Asia/Novosibirsk` * `Asia/Omsk` * `Asia/Oral` * `Asia/Phnom_Penh` * `Asia/Pontianak` * `Asia/Pyongyang` * `Asia/Qatar` * `Asia/Qostanay` * `Asia/Qyzylorda` * `Asia/Rangoon` * `Asia/Riyadh` * `Asia/Saigon` * `Asia/Sakhalin` * `Asia/Samarkand` * `Asia/Seoul` * `Asia/Shanghai` * `Asia/Singapore` * `Asia/Srednekolymsk` * `Asia/Taipei` * `Asia/Tashkent` * `Asia/Tbilisi` * `Asia/Tehran` * `Asia/Tel_Aviv` * `Asia/Thimbu` * `Asia/Thimphu` * `Asia/Tokyo` * `Asia/Tomsk` * `Asia/Ujung_Pandang` * `Asia/Ulaanbaatar` * `Asia/Ulan_Bator` * `Asia/Urumqi` * `Asia/Ust-Nera` * `Asia/Vientiane` * `Asia/Vladivostok` * `Asia/Yakutsk` * `Asia/Yangon` * `Asia/Yekaterinburg` * `Asia/Yerevan` * `Atlantic/Azores` * `Atlantic/Bermuda` * `Atlantic/Canary` * `Atlantic/Cape_Verde` * `Atlantic/Faeroe` * `Atlantic/Faroe` * `Atlantic/Jan_Mayen` * `Atlantic/Madeira` * `Atlantic/Reykjavik` * `Atlantic/South_Georgia` * `Atlantic/St_Helena` * `Atlantic/Stanley` * `Australia/ACT` * `Australia/Adelaide` * `Australia/Brisbane` * `Australia/Broken_Hill` * `Australia/Canberra` * `Australia/Currie` * `Australia/Darwin` * `Australia/Eucla` * `Australia/Hobart` * `Australia/LHI` * `Australia/Lindeman` * `Australia/Lord_Howe` * `Australia/Melbourne` * `Australia/NSW` * `Australia/North` * `Australia/Perth` * `Australia/Queensland` * `Australia/South` * `Australia/Sydney` * `Australia/Tasmania` * `Australia/Victoria` * `Australia/West` * `Australia/Yancowinna` * `Brazil/Acre` * `Brazil/DeNoronha` * `Brazil/East` * `Brazil/West` * `CET` * `CST6CDT` * `Canada/Atlantic` * `Canada/Central` * `Canada/Eastern` * `Canada/Mountain` * `Canada/Newfoundland` * `Canada/Pacific` * `Canada/Saskatchewan` * `Canada/Yukon` * `Chile/Continental` * `Chile/EasterIsland` * `Cuba` * `EET` * `EST` * `EST5EDT` * `Egypt` * `Eire` * `Etc/GMT` * `Etc/GMT+0` * `Etc/GMT+1` * `Etc/GMT+10` * `Etc/GMT+11` * `Etc/GMT+12` * `Etc/GMT+2` * `Etc/GMT+3` * `Etc/GMT+4` * `Etc/GMT+5` * `Etc/GMT+6` * `Etc/GMT+7` * `Etc/GMT+8` * `Etc/GMT+9` * `Etc/GMT-0` * `Etc/GMT-1` * `Etc/GMT-10` * `Etc/GMT-11` * `Etc/GMT-12` * `Etc/GMT-13` * `Etc/GMT-14` * `Etc/GMT-2` * `Etc/GMT-3` * `Etc/GMT-4` * `Etc/GMT-5` * `Etc/GMT-6` * `Etc/GMT-7` * `Etc/GMT-8` * `Etc/GMT-9` * `Etc/GMT0` * `Etc/Greenwich` * `Etc/UCT` * `Etc/UTC` * `Etc/Universal` * `Etc/Zulu` * `Europe/Amsterdam` * `Europe/Andorra` * `Europe/Astrakhan` * `Europe/Athens` * `Europe/Belfast` * `Europe/Belgrade` * `Europe/Berlin` * `Europe/Bratislava` * `Europe/Brussels` * `Europe/Bucharest` * `Europe/Budapest` * `Europe/Busingen` * `Europe/Chisinau` * `Europe/Copenhagen` * `Europe/Dublin` * `Europe/Gibraltar` * `Europe/Guernsey` * `Europe/Helsinki` * `Europe/Isle_of_Man` * `Europe/Istanbul` * `Europe/Jersey` * `Europe/Kaliningrad` * `Europe/Kiev` * `Europe/Kirov` * `Europe/Kyiv` * `Europe/Lisbon` * `Europe/Ljubljana` * `Europe/London` * `Europe/Luxembourg` * `Europe/Madrid` * `Europe/Malta` * `Europe/Mariehamn` * `Europe/Minsk` * `Europe/Monaco` * `Europe/Moscow` * `Europe/Nicosia` * `Europe/Oslo` * `Europe/Paris` * `Europe/Podgorica` * `Europe/Prague` * `Europe/Riga` * `Europe/Rome` * `Europe/Samara` * `Europe/San_Marino` * `Europe/Sarajevo` * `Europe/Saratov` * `Europe/Simferopol` * `Europe/Skopje` * `Europe/Sofia` * `Europe/Stockholm` * `Europe/Tallinn` * `Europe/Tirane` * `Europe/Tiraspol` * `Europe/Ulyanovsk` * `Europe/Uzhgorod` * `Europe/Vaduz` * `Europe/Vatican` * `Europe/Vienna` * `Europe/Vilnius` * `Europe/Volgograd` * `Europe/Warsaw` * `Europe/Zagreb` * `Europe/Zaporozhye` * `Europe/Zurich` * `GB` * `GB-Eire` * `GMT` * `GMT+0` * `GMT-0` * `GMT0` * `Greenwich` * `HST` * `Hongkong` * `Iceland` * `Indian/Antananarivo` * `Indian/Chagos` * `Indian/Christmas` * `Indian/Cocos` * `Indian/Comoro` * `Indian/Kerguelen` * `Indian/Mahe` * `Indian/Maldives` * `Indian/Mauritius` * `Indian/Mayotte` * `Indian/Reunion` * `Iran` * `Israel` * `Jamaica` * `Japan` * `Kwajalein` * `Libya` * `MET` * `MST` * `MST7MDT` * `Mexico/BajaNorte` * `Mexico/BajaSur` * `Mexico/General` * `NZ` * `NZ-CHAT` * `Navajo` * `PRC` * `PST8PDT` * `Pacific/Apia` * `Pacific/Auckland` * `Pacific/Bougainville` * `Pacific/Chatham` * `Pacific/Chuuk` * `Pacific/Easter` * `Pacific/Efate` * `Pacific/Enderbury` * `Pacific/Fakaofo` * `Pacific/Fiji` * `Pacific/Funafuti` * `Pacific/Galapagos` * `Pacific/Gambier` * `Pacific/Guadalcanal` * `Pacific/Guam` * `Pacific/Honolulu` * `Pacific/Johnston` * `Pacific/Kanton` * `Pacific/Kiritimati` * `Pacific/Kosrae` * `Pacific/Kwajalein` * `Pacific/Majuro` * `Pacific/Marquesas` * `Pacific/Midway` * `Pacific/Nauru` * `Pacific/Niue` * `Pacific/Norfolk` * `Pacific/Noumea` * `Pacific/Pago_Pago` * `Pacific/Palau` * `Pacific/Pitcairn` * `Pacific/Pohnpei` * `Pacific/Ponape` * `Pacific/Port_Moresby` * `Pacific/Rarotonga` * `Pacific/Saipan` * `Pacific/Samoa` * `Pacific/Tahiti` * `Pacific/Tarawa` * `Pacific/Tongatapu` * `Pacific/Truk` * `Pacific/Wake` * `Pacific/Wallis` * `Pacific/Yap` * `Poland` * `Portugal` * `ROC` * `ROK` * `Singapore` * `Turkey` * `UCT` * `US/Alaska` * `US/Aleutian` * `US/Arizona` * `US/Central` * `US/East-Indiana` * `US/Eastern` * `US/Hawaii` * `US/Indiana-Starke` * `US/Michigan` * `US/Mountain` * `US/Pacific` * `US/Samoa` * `UTC` * `Universal` * `W-SU` * `WET` * `Zulu` * `localtime` */
  timezone?: "Africa/Abidjan" | "Africa/Accra" | "Africa/Addis_Ababa" | "Africa/Algiers" | "Africa/Asmara" | "Africa/Asmera" | "Africa/Bamako" | "Africa/Bangui" | "Africa/Banjul" | "Africa/Bissau" | "Africa/Blantyre" | "Africa/Brazzaville" | "Africa/Bujumbura" | "Africa/Cairo" | "Africa/Casablanca" | "Africa/Ceuta" | "Africa/Conakry" | "Africa/Dakar" | "Africa/Dar_es_Salaam" | "Africa/Djibouti" | "Africa/Douala" | "Africa/El_Aaiun" | "Africa/Freetown" | "Africa/Gaborone" | "Africa/Harare" | "Africa/Johannesburg" | "Africa/Juba" | "Africa/Kampala" | "Africa/Khartoum" | "Africa/Kigali" | "Africa/Kinshasa" | "Africa/Lagos" | "Africa/Libreville" | "Africa/Lome" | "Africa/Luanda" | "Africa/Lubumbashi" | "Africa/Lusaka" | "Africa/Malabo" | "Africa/Maputo" | "Africa/Maseru" | "Africa/Mbabane" | "Africa/Mogadishu" | "Africa/Monrovia" | "Africa/Nairobi" | "Africa/Ndjamena" | "Africa/Niamey" | "Africa/Nouakchott" | "Africa/Ouagadougou" | "Africa/Porto-Novo" | "Africa/Sao_Tome" | "Africa/Timbuktu" | "Africa/Tripoli" | "Africa/Tunis" | "Africa/Windhoek" | "America/Adak" | "America/Anchorage" | "America/Anguilla" | "America/Antigua" | "America/Araguaina" | "America/Argentina/Buenos_Aires" | "America/Argentina/Catamarca" | "America/Argentina/ComodRivadavia" | "America/Argentina/Cordoba" | "America/Argentina/Jujuy" | "America/Argentina/La_Rioja" | "America/Argentina/Mendoza" | "America/Argentina/Rio_Gallegos" | "America/Argentina/Salta" | "America/Argentina/San_Juan" | "America/Argentina/San_Luis" | "America/Argentina/Tucuman" | "America/Argentina/Ushuaia" | "America/Aruba" | "America/Asuncion" | "America/Atikokan" | "America/Atka" | "America/Bahia" | "America/Bahia_Banderas" | "America/Barbados" | "America/Belem" | "America/Belize" | "America/Blanc-Sablon" | "America/Boa_Vista" | "America/Bogota" | "America/Boise" | "America/Buenos_Aires" | "America/Cambridge_Bay" | "America/Campo_Grande" | "America/Cancun" | "America/Caracas" | "America/Catamarca" | "America/Cayenne" | "America/Cayman" | "America/Chicago" | "America/Chihuahua" | "America/Ciudad_Juarez" | "America/Coral_Harbour" | "America/Cordoba" | "America/Costa_Rica" | "America/Coyhaique" | "America/Creston" | "America/Cuiaba" | "America/Curacao" | "America/Danmarkshavn" | "America/Dawson" | "America/Dawson_Creek" | "America/Denver" | "America/Detroit" | "America/Dominica" | "America/Edmonton" | "America/Eirunepe" | "America/El_Salvador" | "America/Ensenada" | "America/Fort_Nelson" | "America/Fort_Wayne" | "America/Fortaleza" | "America/Glace_Bay" | "America/Godthab" | "America/Goose_Bay" | "America/Grand_Turk" | "America/Grenada" | "America/Guadeloupe" | "America/Guatemala" | "America/Guayaquil" | "America/Guyana" | "America/Halifax" | "America/Havana" | "America/Hermosillo" | "America/Indiana/Indianapolis" | "America/Indiana/Knox" | "America/Indiana/Marengo" | "America/Indiana/Petersburg" | "America/Indiana/Tell_City" | "America/Indiana/Vevay" | "America/Indiana/Vincennes" | "America/Indiana/Winamac" | "America/Indianapolis" | "America/Inuvik" | "America/Iqaluit" | "America/Jamaica" | "America/Jujuy" | "America/Juneau" | "America/Kentucky/Louisville" | "America/Kentucky/Monticello" | "America/Knox_IN" | "America/Kralendijk" | "America/La_Paz" | "America/Lima" | "America/Los_Angeles" | "America/Louisville" | "America/Lower_Princes" | "America/Maceio" | "America/Managua" | "America/Manaus" | "America/Marigot" | "America/Martinique" | "America/Matamoros" | "America/Mazatlan" | "America/Mendoza" | "America/Menominee" | "America/Merida" | "America/Metlakatla" | "America/Mexico_City" | "America/Miquelon" | "America/Moncton" | "America/Monterrey" | "America/Montevideo" | "America/Montreal" | "America/Montserrat" | "America/Nassau" | "America/New_York" | "America/Nipigon" | "America/Nome" | "America/Noronha" | "America/North_Dakota/Beulah" | "America/North_Dakota/Center" | "America/North_Dakota/New_Salem" | "America/Nuuk" | "America/Ojinaga" | "America/Panama" | "America/Pangnirtung" | "America/Paramaribo" | "America/Phoenix" | "America/Port-au-Prince" | "America/Port_of_Spain" | "America/Porto_Acre" | "America/Porto_Velho" | "America/Puerto_Rico" | "America/Punta_Arenas" | "America/Rainy_River" | "America/Rankin_Inlet" | "America/Recife" | "America/Regina" | "America/Resolute" | "America/Rio_Branco" | "America/Rosario" | "America/Santa_Isabel" | "America/Santarem" | "America/Santiago" | "America/Santo_Domingo" | "America/Sao_Paulo" | "America/Scoresbysund" | "America/Shiprock" | "America/Sitka" | "America/St_Barthelemy" | "America/St_Johns" | "America/St_Kitts" | "America/St_Lucia" | "America/St_Thomas" | "America/St_Vincent" | "America/Swift_Current" | "America/Tegucigalpa" | "America/Thule" | "America/Thunder_Bay" | "America/Tijuana" | "America/Toronto" | "America/Tortola" | "America/Vancouver" | "America/Virgin" | "America/Whitehorse" | "America/Winnipeg" | "America/Yakutat" | "America/Yellowknife" | "Antarctica/Casey" | "Antarctica/Davis" | "Antarctica/DumontDUrville" | "Antarctica/Macquarie" | "Antarctica/Mawson" | "Antarctica/McMurdo" | "Antarctica/Palmer" | "Antarctica/Rothera" | "Antarctica/South_Pole" | "Antarctica/Syowa" | "Antarctica/Troll" | "Antarctica/Vostok" | "Arctic/Longyearbyen" | "Asia/Aden" | "Asia/Almaty" | "Asia/Amman" | "Asia/Anadyr" | "Asia/Aqtau" | "Asia/Aqtobe" | "Asia/Ashgabat" | "Asia/Ashkhabad" | "Asia/Atyrau" | "Asia/Baghdad" | "Asia/Bahrain" | "Asia/Baku" | "Asia/Bangkok" | "Asia/Barnaul" | "Asia/Beirut" | "Asia/Bishkek" | "Asia/Brunei" | "Asia/Calcutta" | "Asia/Chita" | "Asia/Choibalsan" | "Asia/Chongqing" | "Asia/Chungking" | "Asia/Colombo" | "Asia/Dacca" | "Asia/Damascus" | "Asia/Dhaka" | "Asia/Dili" | "Asia/Dubai" | "Asia/Dushanbe" | "Asia/Famagusta" | "Asia/Gaza" | "Asia/Harbin" | "Asia/Hebron" | "Asia/Ho_Chi_Minh" | "Asia/Hong_Kong" | "Asia/Hovd" | "Asia/Irkutsk" | "Asia/Istanbul" | "Asia/Jakarta" | "Asia/Jayapura" | "Asia/Jerusalem" | "Asia/Kabul" | "Asia/Kamchatka" | "Asia/Karachi" | "Asia/Kashgar" | "Asia/Kathmandu" | "Asia/Katmandu" | "Asia/Khandyga" | "Asia/Kolkata" | "Asia/Krasnoyarsk" | "Asia/Kuala_Lumpur" | "Asia/Kuching" | "Asia/Kuwait" | "Asia/Macao" | "Asia/Macau" | "Asia/Magadan" | "Asia/Makassar" | "Asia/Manila" | "Asia/Muscat" | "Asia/Nicosia" | "Asia/Novokuznetsk" | "Asia/Novosibirsk" | "Asia/Omsk" | "Asia/Oral" | "Asia/Phnom_Penh" | "Asia/Pontianak" | "Asia/Pyongyang" | "Asia/Qatar" | "Asia/Qostanay" | "Asia/Qyzylorda" | "Asia/Rangoon" | "Asia/Riyadh" | "Asia/Saigon" | "Asia/Sakhalin" | "Asia/Samarkand" | "Asia/Seoul" | "Asia/Shanghai" | "Asia/Singapore" | "Asia/Srednekolymsk" | "Asia/Taipei" | "Asia/Tashkent" | "Asia/Tbilisi" | "Asia/Tehran" | "Asia/Tel_Aviv" | "Asia/Thimbu" | "Asia/Thimphu" | "Asia/Tokyo" | "Asia/Tomsk" | "Asia/Ujung_Pandang" | "Asia/Ulaanbaatar" | "Asia/Ulan_Bator" | "Asia/Urumqi" | "Asia/Ust-Nera" | "Asia/Vientiane" | "Asia/Vladivostok" | "Asia/Yakutsk" | "Asia/Yangon" | "Asia/Yekaterinburg" | "Asia/Yerevan" | "Atlantic/Azores" | "Atlantic/Bermuda" | "Atlantic/Canary" | "Atlantic/Cape_Verde" | "Atlantic/Faeroe" | "Atlantic/Faroe" | "Atlantic/Jan_Mayen" | "Atlantic/Madeira" | "Atlantic/Reykjavik" | "Atlantic/South_Georgia" | "Atlantic/St_Helena" | "Atlantic/Stanley" | "Australia/ACT" | "Australia/Adelaide" | "Australia/Brisbane" | "Australia/Broken_Hill" | "Australia/Canberra" | "Australia/Currie" | "Australia/Darwin" | "Australia/Eucla" | "Australia/Hobart" | "Australia/LHI" | "Australia/Lindeman" | "Australia/Lord_Howe" | "Australia/Melbourne" | "Australia/NSW" | "Australia/North" | "Australia/Perth" | "Australia/Queensland" | "Australia/South" | "Australia/Sydney" | "Australia/Tasmania" | "Australia/Victoria" | "Australia/West" | "Australia/Yancowinna" | "Brazil/Acre" | "Brazil/DeNoronha" | "Brazil/East" | "Brazil/West" | "CET" | "CST6CDT" | "Canada/Atlantic" | "Canada/Central" | "Canada/Eastern" | "Canada/Mountain" | "Canada/Newfoundland" | "Canada/Pacific" | "Canada/Saskatchewan" | "Canada/Yukon" | "Chile/Continental" | "Chile/EasterIsland" | "Cuba" | "EET" | "EST" | "EST5EDT" | "Egypt" | "Eire" | "Etc/GMT" | "Etc/GMT+0" | "Etc/GMT+1" | "Etc/GMT+10" | "Etc/GMT+11" | "Etc/GMT+12" | "Etc/GMT+2" | "Etc/GMT+3" | "Etc/GMT+4" | "Etc/GMT+5" | "Etc/GMT+6" | "Etc/GMT+7" | "Etc/GMT+8" | "Etc/GMT+9" | "Etc/GMT-0" | "Etc/GMT-1" | "Etc/GMT-10" | "Etc/GMT-11" | "Etc/GMT-12" | "Etc/GMT-13" | "Etc/GMT-14" | "Etc/GMT-2" | "Etc/GMT-3" | "Etc/GMT-4" | "Etc/GMT-5" | "Etc/GMT-6" | "Etc/GMT-7" | "Etc/GMT-8" | "Etc/GMT-9" | "Etc/GMT0" | "Etc/Greenwich" | "Etc/UCT" | "Etc/UTC" | "Etc/Universal" | "Etc/Zulu" | "Europe/Amsterdam" | "Europe/Andorra" | "Europe/Astrakhan" | "Europe/Athens" | "Europe/Belfast" | "Europe/Belgrade" | "Europe/Berlin" | "Europe/Bratislava" | "Europe/Brussels" | "Europe/Bucharest" | "Europe/Budapest" | "Europe/Busingen" | "Europe/Chisinau" | "Europe/Copenhagen" | "Europe/Dublin" | "Europe/Gibraltar" | "Europe/Guernsey" | "Europe/Helsinki" | "Europe/Isle_of_Man" | "Europe/Istanbul" | "Europe/Jersey" | "Europe/Kaliningrad" | "Europe/Kiev" | "Europe/Kirov" | "Europe/Kyiv" | "Europe/Lisbon" | "Europe/Ljubljana" | "Europe/London" | "Europe/Luxembourg" | "Europe/Madrid" | "Europe/Malta" | "Europe/Mariehamn" | "Europe/Minsk" | "Europe/Monaco" | "Europe/Moscow" | "Europe/Nicosia" | "Europe/Oslo" | "Europe/Paris" | "Europe/Podgorica" | "Europe/Prague" | "Europe/Riga" | "Europe/Rome" | "Europe/Samara" | "Europe/San_Marino" | "Europe/Sarajevo" | "Europe/Saratov" | "Europe/Simferopol" | "Europe/Skopje" | "Europe/Sofia" | "Europe/Stockholm" | "Europe/Tallinn" | "Europe/Tirane" | "Europe/Tiraspol" | "Europe/Ulyanovsk" | "Europe/Uzhgorod" | "Europe/Vaduz" | "Europe/Vatican" | "Europe/Vienna" | "Europe/Vilnius" | "Europe/Volgograd" | "Europe/Warsaw" | "Europe/Zagreb" | "Europe/Zaporozhye" | "Europe/Zurich" | "GB" | "GB-Eire" | "GMT" | "GMT+0" | "GMT-0" | "GMT0" | "Greenwich" | "HST" | "Hongkong" | "Iceland" | "Indian/Antananarivo" | "Indian/Chagos" | "Indian/Christmas" | "Indian/Cocos" | "Indian/Comoro" | "Indian/Kerguelen" | "Indian/Mahe" | "Indian/Maldives" | "Indian/Mauritius" | "Indian/Mayotte" | "Indian/Reunion" | "Iran" | "Israel" | "Jamaica" | "Japan" | "Kwajalein" | "Libya" | "MET" | "MST" | "MST7MDT" | "Mexico/BajaNorte" | "Mexico/BajaSur" | "Mexico/General" | "NZ" | "NZ-CHAT" | "Navajo" | "PRC" | "PST8PDT" | "Pacific/Apia" | "Pacific/Auckland" | "Pacific/Bougainville" | "Pacific/Chatham" | "Pacific/Chuuk" | "Pacific/Easter" | "Pacific/Efate" | "Pacific/Enderbury" | "Pacific/Fakaofo" | "Pacific/Fiji" | "Pacific/Funafuti" | "Pacific/Galapagos" | "Pacific/Gambier" | "Pacific/Guadalcanal" | "Pacific/Guam" | "Pacific/Honolulu" | "Pacific/Johnston" | "Pacific/Kanton" | "Pacific/Kiritimati" | "Pacific/Kosrae" | "Pacific/Kwajalein" | "Pacific/Majuro" | "Pacific/Marquesas" | "Pacific/Midway" | "Pacific/Nauru" | "Pacific/Niue" | "Pacific/Norfolk" | "Pacific/Noumea" | "Pacific/Pago_Pago" | "Pacific/Palau" | "Pacific/Pitcairn" | "Pacific/Pohnpei" | "Pacific/Ponape" | "Pacific/Port_Moresby" | "Pacific/Rarotonga" | "Pacific/Saipan" | "Pacific/Samoa" | "Pacific/Tahiti" | "Pacific/Tarawa" | "Pacific/Tongatapu" | "Pacific/Truk" | "Pacific/Wake" | "Pacific/Wallis" | "Pacific/Yap" | "Poland" | "Portugal" | "ROC" | "ROK" | "Singapore" | "Turkey" | "UCT" | "US/Alaska" | "US/Aleutian" | "US/Arizona" | "US/Central" | "US/East-Indiana" | "US/Eastern" | "US/Hawaii" | "US/Indiana-Starke" | "US/Michigan" | "US/Mountain" | "US/Pacific" | "US/Samoa" | "UTC" | "Universal" | "W-SU" | "WET" | "Zulu" | "localtime" | "";
  /** How many consecutive missed or failed check-ins in a row before creating a new issue. */
  failure_issue_threshold?: number | null;
  /** How many successful check-ins in a row before resolving an issue. */
  recovery_threshold?: number | null;
};

export type CreateReplayDeletionJob = {
  data: { id: number; dateCreated: string; dateUpdated: string; rangeStart: string; rangeEnd: string; environments: (string)[]; status: string; query: string; countDeleted: number };
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type Dashboard = {
  /** The user defined title for this dashboard. */
  title: string;
  /** A dashboard's unique id. */
  id?: string;
  /** A json list of widgets saved in this dashboard. */
  widgets?: ({ id?: string; title?: string; description?: string | null; thresholds?: { [key: string]: unknown | undefined } | null; display_type?: "line" | "area" | "bar" | "table" | "big_number" | "details" | "categorical_bar" | "wheel" | "rage_and_dead_clicks" | "server_tree" | "text" | "agents_traces_table"; interval?: string; queries?: ({ id?: string; fields?: (string)[]; aggregates?: (string)[] | null; columns?: (string)[] | null; field_aliases?: (string)[] | null; name?: string; conditions?: string; orderby?: string; is_hidden?: boolean; on_demand_extraction?: { extraction_state?: string; enabled?: boolean }; on_demand_extraction_disabled?: boolean; selected_aggregate?: number | null; linked_dashboards?: ({ field: string; dashboard_id: string })[] | null })[]; widget_type?: "discover" | "issue" | "metrics" | "error-events" | "transaction-like" | "spans" | "logs" | "tracemetrics" | "preprod-app-size" | null | null; limit?: number | null; layout?: { x: number; y: number; w: number; h: number; min_h: number } | null; axis_range?: "auto" | "dataMin" | null | null; legend_type?: "default" | "breakdown" | null | null })[];
  /** The saved projects filter for this dashboard. */
  projects?: (number)[];
  /** The saved environment filter for this dashboard. */
  environment?: (string)[] | null;
  /** The saved time range period for this dashboard. */
  period?: string | null;
  /** The saved start time for this dashboard. */
  start?: string | null;
  /** The saved end time for this dashboard. */
  end?: string | null;
  /** The saved filters for this dashboard. */
  filters?: { [key: string]: unknown | undefined };
  /** Setting that lets you display saved time range for this dashboard in UTC. */
  utc?: boolean;
  /** Permissions that restrict users from editing dashboards */
  permissions?: { is_editable_by_everyone: boolean; teams_with_edit_access?: (number)[] } | null;
  /** Favorite the dashboard automatically for the request user */
  is_favorited?: boolean;
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type DashboardDetails = {
  /** A dashboard's unique id. */
  id?: string;
  /** The user-defined dashboard title. */
  title?: string;
  /** A json list of widgets saved in this dashboard. */
  widgets?: ({ id?: string; title?: string; description?: string | null; thresholds?: { [key: string]: unknown | undefined } | null; display_type?: "line" | "area" | "bar" | "table" | "big_number" | "details" | "categorical_bar" | "wheel" | "rage_and_dead_clicks" | "server_tree" | "text" | "agents_traces_table"; interval?: string; queries?: ({ id?: string; fields?: (string)[]; aggregates?: (string)[] | null; columns?: (string)[] | null; field_aliases?: (string)[] | null; name?: string; conditions?: string; orderby?: string; is_hidden?: boolean; on_demand_extraction?: { extraction_state?: string; enabled?: boolean }; on_demand_extraction_disabled?: boolean; selected_aggregate?: number | null; linked_dashboards?: ({ field: string; dashboard_id: string })[] | null })[]; widget_type?: "discover" | "issue" | "metrics" | "error-events" | "transaction-like" | "spans" | "logs" | "tracemetrics" | "preprod-app-size" | null | null; limit?: number | null; layout?: { x: number; y: number; w: number; h: number; min_h: number } | null; axis_range?: "auto" | "dataMin" | null | null; legend_type?: "default" | "breakdown" | null | null })[];
  /** The saved projects filter for this dashboard. */
  projects?: (number)[];
  /** The saved environment filter for this dashboard. */
  environment?: (string)[] | null;
  /** The saved time range period for this dashboard. */
  period?: string | null;
  /** The saved start time for this dashboard. */
  start?: string | null;
  /** The saved end time for this dashboard. */
  end?: string | null;
  /** The saved filters for this dashboard. */
  filters?: { [key: string]: unknown | undefined };
  /** Setting that lets you display saved time range for this dashboard in UTC. */
  utc?: boolean;
  /** Permissions that restrict users from editing dashboards */
  permissions?: { is_editable_by_everyone: boolean; teams_with_edit_access?: (number)[] } | null;
};

export type DashboardDetailsModel = {
  environment?: (string)[];
  period?: string;
  utc?: string;
  expired?: boolean;
  start?: string;
  end?: string;
  id: string;
  title: string;
  dateCreated: string;
  createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } | null;
  widgets: ({ id: string; title: string; description: string | null; displayType: string; thresholds: { preferredPolarity?: string; max_values: { [key: string]: number | undefined }; unit: string } | null; interval: string; dateCreated: string; dashboardId: string; queries: ({ id: string; name: string; fields: (string)[]; aggregates: (string)[]; columns: (string)[]; fieldAliases: (string)[]; conditions: string; orderby: string; widgetId: string; onDemand: ({ enabled: boolean; extractionState: string; dashboardWidgetQueryId: number })[]; isHidden: boolean; selectedAggregate: number | null; linkedDashboards: ({ field: string; dashboardId: number })[] })[]; limit: number | null; widgetType: string | null; layout: { [key: string]: number | undefined } | null; axisRange: string | null; legendType: "default" | "breakdown" | null; datasetSource: string | null; exploreUrls: (string)[] | null; changedReason: ({ orderby: ({ [key: string]: string | undefined })[] | null; equations: ({ [key: string]: string | (string)[] | undefined })[] | null; selected_columns: (string)[] })[] | null })[];
  projects: (number)[];
  filters: { release?: (string)[]; releaseId?: (string)[]; globalFilter?: ({ [key: string]: unknown | undefined })[] };
  permissions: { isEditableByEveryone: boolean; teamsWithEditAccess: (number)[] } | null;
  isFavorited: boolean;
  prebuiltId: number | null;
};

export type DashboardListResponse = ({ id: string; title: string; dateCreated: string; createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; environment: (string)[]; filters: { release?: (string)[]; releaseId?: (string)[]; globalFilter?: ({ [key: string]: unknown | undefined })[] }; lastVisited: string | null; widgetDisplay: (string)[]; widgetPreview: ({ [key: string]: string | undefined })[]; permissions: { isEditableByEveryone: boolean; teamsWithEditAccess: (number)[] } | null; isFavorited: boolean; projects: (number)[]; prebuiltId: number | null })[];

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type DashboardPermissions = {
  /** Whether the dashboard is editable by everyone. */
  is_editable_by_everyone: boolean;
  /** List of team IDs that have edit access to a dashboard. */
  teams_with_edit_access?: (number)[];
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type DashboardWidget = {
  id?: string;
  title?: string;
  description?: string | null;
  thresholds?: { [key: string]: unknown | undefined } | null;
  /** * `line` * `area` * `bar` * `table` * `big_number` * `details` * `categorical_bar` * `wheel` * `rage_and_dead_clicks` * `server_tree` * `text` * `agents_traces_table` */
  display_type?: "line" | "area" | "bar" | "table" | "big_number" | "details" | "categorical_bar" | "wheel" | "rage_and_dead_clicks" | "server_tree" | "text" | "agents_traces_table";
  interval?: string;
  queries?: ({ id?: string; fields?: (string)[]; aggregates?: (string)[] | null; columns?: (string)[] | null; field_aliases?: (string)[] | null; name?: string; conditions?: string; orderby?: string; is_hidden?: boolean; on_demand_extraction?: { extraction_state?: string; enabled?: boolean }; on_demand_extraction_disabled?: boolean; selected_aggregate?: number | null; linked_dashboards?: ({ field: string; dashboard_id: string })[] | null })[];
  /** * `discover` * `issue` * `metrics` * `error-events` * `transaction-like` * `spans` * `logs` * `tracemetrics` * `preprod-app-size` */
  widget_type?: "discover" | "issue" | "metrics" | "error-events" | "transaction-like" | "spans" | "logs" | "tracemetrics" | "preprod-app-size" | null | null;
  limit?: number | null;
  layout?: { x: number; y: number; w: number; h: number; min_h: number } | null;
  /** * `auto` * `dataMin` */
  axis_range?: "auto" | "dataMin" | null | null;
  /** * `default` * `breakdown` */
  legend_type?: "default" | "breakdown" | null | null;
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type DashboardWidgetQuery = {
  id?: string;
  fields?: (string)[];
  aggregates?: (string)[] | null;
  columns?: (string)[] | null;
  field_aliases?: (string)[] | null;
  name?: string;
  conditions?: string;
  orderby?: string;
  is_hidden?: boolean;
  /** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
  on_demand_extraction?: { extraction_state?: string; enabled?: boolean };
  on_demand_extraction_disabled?: boolean;
  selected_aggregate?: number | null;
  linked_dashboards?: ({ field: string; dashboard_id: string })[] | null;
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type DashboardWidgetQueryOnDemand = {
  extraction_state?: string;
  enabled?: boolean;
};

export type DataForwarder = {
  /** The ID of the organization related to the data forwarder. */
  organization_id: number;
  /** The provider of the data forwarder. One of "segment", "sqs", or "splunk".  * `segment` - Segment * `sqs` - Amazon SQS * `splunk` - Splunk */
  provider: "segment" | "sqs" | "splunk";
  /** Whether the data forwarder is enabled. */
  is_enabled?: boolean;
  /** Whether to enroll new projects automatically, after they're created. */
  enroll_new_projects?: boolean;
  /** The configuration for the data forwarder, specific to the provider type.  For a 'sqs' provider, the required keys are queue_url, region, access_key, secret_key. If using a FIFO queue, you must also provide a message_group_id, though s3_bucket is optional.  For a 'segment' provider, the required keys are write_key.  For a 'splunk' provider, the required keys are instance_url, index, source, token. */
  config?: { [key: string]: string | undefined };
  /** The IDs of the projects connected to the data forwarder. Missing project IDs will be unenrolled if previously enrolled. */
  project_ids?: (number)[];
};

export type DataForwarderResponse = {
  id: string;
  organizationId: string;
  isEnabled: boolean;
  enrollNewProjects: boolean;
  enrolledProjects: ({ id: string; slug: string; platform: string | null })[];
  provider: string;
  config: { [key: string]: string | undefined } | null;
  projectConfigs: ({ id: string; isEnabled: boolean; dataForwarderId: string; project: { id: string; slug: string; platform: string | null }; overrides: { [key: string]: string | undefined }; effectiveConfig: { [key: string]: string | undefined }; dateAdded: string; dateUpdated: string })[];
  dateAdded: string;
  dateUpdated: string;
};

export type Deploy = {
  /** The environment you're deploying to */
  environment: string;
  /** The optional name of the deploy */
  name?: string | null;
  /** The optional URL that points to the deploy */
  url?: string | null;
  /** An optional date that indicates when the deploy started */
  dateStarted?: string | null;
  /** An optional date that indicates when the deploy ended. If not provided, the current time is used. */
  dateFinished?: string | null;
  /** The optional list of project slugs to create a deploy within. If not provided, deploys are created for all of the release's projects. */
  projects?: (string)[];
};

/** Serializer for Deploy response objects */
export type DeployResponse = {
  /** The ID of the deploy */
  id: string;
  /** The environment name */
  environment: string;
  /** An optional date that indicates when the deploy started */
  dateStarted: string | null;
  /** An optional date that indicates when the deploy ended */
  dateFinished: string;
  /** The optional name of the deploy */
  name: string | null;
  /** The optional URL that points to the deploy */
  url: string | null;
};

export type DetailedProject = {
  stats?: unknown;
  transactionStats?: unknown;
  sessionStats?: unknown;
  id: string;
  slug: string;
  name: string;
  platform: string | null;
  dateCreated: string;
  isBookmarked: boolean;
  isMember: boolean;
  features: (string)[];
  firstEvent: string | null;
  firstTransactionEvent: boolean;
  access: (string)[];
  hasAccess: boolean;
  hasFeedbacks: boolean;
  hasFlags: boolean;
  hasMinifiedStackTrace: boolean;
  hasMonitors: boolean;
  hasNewFeedbacks: boolean;
  hasProfiles: boolean;
  hasReplays: boolean;
  hasSessions: boolean;
  hasInsightsHttp: boolean;
  hasInsightsDb: boolean;
  hasInsightsAssets: boolean;
  hasInsightsAppStart: boolean;
  hasInsightsScreenLoad: boolean;
  hasInsightsVitals: boolean;
  hasInsightsCaches: boolean;
  hasInsightsQueues: boolean;
  hasInsightsAgentMonitoring: boolean;
  hasInsightsMCP: boolean;
  hasLogs: boolean;
  hasTraceMetrics: boolean;
  isInternal: boolean;
  isPublic: boolean;
  avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null };
  color: string;
  status: string;
  team?: { id: string; name: string; slug: string };
  teams: ({ id: string; name: string; slug: string })[];
  latestRelease: { version: string } | null;
  options: { [key: string]: unknown | undefined };
  digestsMinDelay: number;
  digestsMaxDelay: number;
  subjectPrefix: string;
  allowedDomains: (string)[];
  resolveAge: number;
  dataScrubber: boolean;
  dataScrubberDefaults: boolean;
  safeFields: (string)[];
  storeCrashReports: number | null;
  sensitiveFields: (string)[];
  subjectTemplate: string;
  securityToken: string;
  securityTokenHeader: string | null;
  verifySSL: boolean;
  scrubIPAddresses: boolean;
  scrapeJavaScript: boolean;
  highlightTags: (string)[];
  highlightContext: { [key: string]: unknown | undefined };
  highlightPreset: { tags: (string)[]; context: { [key: string]: (string)[] | undefined } };
  groupingConfig: string;
  derivedGroupingEnhancements: string;
  groupingEnhancements: string;
  secondaryGroupingExpiry: number;
  secondaryGroupingConfig: string | null;
  fingerprintingRules: string;
  organization: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean };
  plugins: ({ id: string; name: string; slug: string; shortName: string; type: string; canDisable: boolean; isTestable: boolean; hasConfiguration: boolean; metadata: { [key: string]: unknown | undefined }; contexts: (string)[]; status: string; assets: (unknown)[]; doc: string; firstPartyAlternative: unknown; deprecationDate: unknown; altIsSentryApp: unknown; enabled: boolean; version: string; author: { [key: string]: string | undefined }; isDeprecated: boolean; isHidden: boolean; description: string; features: (string)[]; featureDescriptions: ({ [key: string]: string | undefined })[]; resourceLinks: ({ [key: string]: string | undefined })[] })[];
  platforms: (string)[];
  processingIssues: number;
  defaultEnvironment: string | null;
  relayPiiConfig: string | null;
  builtinSymbolSources: (string)[];
  dynamicSamplingBiases: ({ [key: string]: string | boolean | undefined })[];
  symbolSources: string;
  isDynamicallySampled: boolean;
  tempestFetchScreenshots: boolean;
  autofixAutomationTuning: string;
  seerScannerAutomation: boolean;
  seerNightshiftTweaks: unknown;
  scmSourceContextEnabled: boolean;
  debugFilesRole: string | null;
};

export type Detector = {
  owner?: { type: "user" | "team"; id: string; name: string; email?: string } | null;
  createdBy?: string | null;
  latestGroup?: { [key: string]: unknown | undefined } | null;
  description?: string | null;
  id: string;
  projectId: string;
  name: string;
  type: string;
  workflowIds: (string)[] | null;
  dateCreated: string;
  dateUpdated: string;
  dataSources: ({ [key: string]: unknown | undefined })[] | null;
  conditionGroup: { [key: string]: unknown | undefined } | null;
  config: { [key: string]: unknown | undefined };
  enabled: boolean;
};

export type DiscoverSavedQuery = {
  /** The user-defined saved query name. */
  name: string;
  /** The saved projects filter for this query. */
  projects?: (number)[];
  /** The dataset you would like to query. Note: `discover` is a **deprecated** value. The allowed values are: `error-events`, `transaction-like`  * `discover` * `error-events` * `transaction-like` */
  queryDataset?: "discover" | "error-events" | "transaction-like";
  /** The saved start time for this saved query. */
  start?: string | null;
  /** The saved end time for this saved query. */
  end?: string | null;
  /** The saved time range period for this saved query. */
  range?: string | null;
  /** The fields, functions, or equations that can be requested for the query. At most 20 fields can be selected per request. Each field can be one of the following types: - A built-in key field. See possible fields in the [properties table](/product/sentry-basics/search/searchable-properties/#properties-table), under any field that is an event property.     - example: `field=transaction` - A tag. Tags should use the `tag[]` formatting to avoid ambiguity with any fields     - example: `field=tag[isEnterprise]` - A function which will be in the format of `function_name(parameters,...)`. See possible functions in the [query builder documentation](/product/discover-queries/query-builder/#stacking-functions).     - when a function is included, Discover will group by any tags or fields     - example: `field=count_if(transaction.duration,greater,300)` - An equation when prefixed with `equation|`. Read more about [equations here](/product/discover-queries/query-builder/query-equations/).     - example: `field=equation|count_if(transaction.duration,greater,300) / count() * 100`  */
  fields?: (string)[] | null;
  /** How to order the query results. Must be something in the `field` list, excluding equations. */
  orderby?: string | null;
  /** The name of environments to filter by. */
  environment?: (string)[] | null;
  /** Filters results by using [query syntax](/product/sentry-basics/search/). */
  query?: string | null;
  /** Aggregate functions to be plotted on the chart. */
  yAxis?: (string)[] | null;
  /** Visualization type for saved query chart. Allowed values are: - default - previous - top5 - daily - dailytop5 - bar  */
  display?: string | null;
  /** Number of top events' timeseries to be visualized. */
  topEvents?: number | null;
  /** Resolution of the time series. */
  interval?: string | null;
};

export type DiscoverSavedQueryListResponse = ({ environment?: (string)[]; query?: string; fields?: (string)[]; widths?: (string)[]; conditions?: (string)[]; aggregations?: (string)[]; range?: string; start?: string; end?: string; orderby?: string; limit?: string; yAxis?: (string)[]; display?: string; topEvents?: number; interval?: string; exploreQuery?: { [key: string]: unknown | undefined }; id: string; name: string; projects: (number)[]; version: number; queryDataset: string; datasetSource: string; expired: boolean; dateCreated: string; dateUpdated: string; createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } })[];

export type DiscoverSavedQueryModel = {
  environment?: (string)[];
  query?: string;
  fields?: (string)[];
  widths?: (string)[];
  conditions?: (string)[];
  aggregations?: (string)[];
  range?: string;
  start?: string;
  end?: string;
  orderby?: string;
  limit?: string;
  yAxis?: (string)[];
  display?: string;
  topEvents?: number;
  interval?: string;
  exploreQuery?: { [key: string]: unknown | undefined };
  id: string;
  name: string;
  projects: (number)[];
  version: number;
  queryDataset: string;
  datasetSource: string;
  expired: boolean;
  dateCreated: string;
  dateUpdated: string;
  createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] };
};

/** Configures multiple options for the Javascript Loader Script. - `Performance Monitoring` - `Debug Bundles & Logging` - `Session Replay` - Note that the loader will load the ES6 bundle instead of the ES5 bundle. - `User Feedback` - Note that the loader will load the ES6 bundle instead of the ES5 bundle. - `Logs and Metrics` - Note that the loader will load the ES6 bundle instead of the ES5 bundle. Requires SDK >= 10.0.0. ```json {     "dynamicSdkLoaderOptions": {         "hasReplay": true,         "hasPerformance": true,         "hasDebug": true,         "hasFeedback": true,         "hasLogsAndMetrics": true     } } ``` */
export type DynamicSdkLoaderOption = {
  hasReplay?: boolean;
  hasPerformance?: boolean;
  hasDebug?: boolean;
  hasFeedback?: boolean;
  hasLogsAndMetrics?: boolean;
};

export type Environment = {
  /** Specify `true` to make the environment visible or `false` to make the environment hidden. */
  isHidden: boolean;
};

export type EnvironmentProject = {
  id: string;
  name: string;
  isHidden: boolean;
};

export type EventIdLookupResponse = {
  organizationSlug: string;
  projectSlug: string;
  groupId: string;
  eventId: string;
  event: { id: string; groupID: string | null; eventID: string; projectID: string; message: string | null; title: string; location: string | null; user: { id?: string | null; email?: string | null; username?: string | null; ip_address?: string | null; name?: string | null; geo?: { [key: string]: string | undefined } | null; data?: { [key: string]: unknown | undefined } | null } | null; tags: ({ query?: string; key: string; value: string })[]; platform: string; dateReceived: string | null; contexts: { [key: string]: unknown | undefined } | null; size: number | null; entries: (unknown)[]; dist: string | null; sdk: { [key: string]: string | undefined }; context: { [key: string]: unknown | undefined } | null; packages: { [key: string]: unknown | undefined }; type: string; metadata: unknown; errors: (unknown)[]; occurrence: unknown; _meta: { [key: string]: unknown | undefined }; crashFile?: string | null; culprit?: string | null; dateCreated?: string; fingerprints?: (string)[]; groupingConfig?: unknown; startTimestamp?: string; endTimestamp?: string; measurements?: unknown; breakdowns?: unknown };
};

/** Serializer for the agent-based autofix requests. */
export type ExplorerAutofixRequest = {
  /** Which autofix step to run.  * `root_cause` * `solution` * `code_changes` * `open_pr` * `coding_agent_handoff` */
  step?: "root_cause" | "solution" | "code_changes" | "open_pr" | "coding_agent_handoff";
  /** Where the issue fix process should stop. If not provided, will run to root cause.  * `root_cause` * `solution` * `code_changes` * `open_pr` */
  stopping_point?: "root_cause" | "solution" | "code_changes" | "open_pr";
  /** Existing run ID to continue. If not provided, starts a new run. */
  run_id?: number;
  /** Coding agent integration ID. Required for coding_agent_handoff step (unless provider is specified). */
  integration_id?: number;
  /** Coding agent provider (e.g., 'github_copilot'). Alternative to integration_id for user-authenticated providers. */
  provider?: string;
  /** Optional user context to append to the step prompt. */
  user_context?: string;
  /** Optional repository name for which to create the pull request. Do not pass a repository name to create pull requests in all relevant repositories. */
  repo_name?: string;
  /** Block index to insert at. When provided, truncates blocks after this point for retry-from-step. */
  insert_index?: number;
  /** Referrer identifying where the issue fix was triggered from. */
  referrer?: string;
};

export type ExternalActor = {
  externalId?: string;
  userId?: string;
  teamId?: string;
  id: string;
  provider: string;
  externalName: string;
  integrationId: string;
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type ExternalTeam = {
  /** The associated name for the provider. */
  external_name: string;
  /** The provider of the external actor.  * `github` * `github_enterprise` * `jira_server` * `slack` * `slack_staging` * `perforce` * `gitlab` * `msteams` * `custom_scm` */
  provider: "github" | "github_enterprise" | "jira_server" | "slack" | "slack_staging" | "perforce" | "gitlab" | "msteams" | "custom_scm";
  /** The Integration ID. */
  integration_id: number;
  /** The associated user ID for provider. */
  external_id?: string | null;
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type ExternalUser = {
  /** The user ID in Sentry. */
  user_id: number;
  /** The associated name for the provider. */
  external_name: string;
  /** The provider of the external actor.  * `github` * `github_enterprise` * `jira_server` * `slack` * `slack_staging` * `perforce` * `gitlab` * `msteams` * `custom_scm` */
  provider: "github" | "github_enterprise" | "jira_server" | "slack" | "slack_staging" | "perforce" | "gitlab" | "msteams" | "custom_scm";
  /** The Integration ID. */
  integration_id: number;
  /** The external actor ID. */
  id: number;
  /** The associated user ID for provider. */
  external_id?: string | null;
};

/** Filter settings for the source. This is optional for all sources.  **`filetypes`** ***(list)*** - A list of file types that can be found on this source. If this is left empty, all file types will be enabled. The options are: - `pe` - Windows executable files - `pdb` - Windows debug files - `portablepdb` - .NET portable debug files - `mach_code` - MacOS executable files - `mach_debug` - MacOS debug files - `elf_code` - ELF executable files - `elf_debug` - ELF debug files - `wasm_code` - WASM executable files - `wasm_debug` - WASM debug files - `breakpad` - Breakpad symbol files - `sourcebundle` - Source code bundles - `uuidmap` - Apple UUID mapping files - `bcsymbolmap` - Apple bitcode symbol maps - `il2cpp` - Unity IL2CPP mapping files - `proguard` - ProGuard mapping files  **`path_patterns`** ***(list)*** - A list of glob patterns to check against the debug and code file paths of debug files. Only files that match one of these patterns will be requested from the source. If this is left empty, no path-based filtering takes place.  **`requires_checksum`** ***(boolean)*** - Whether this source requires a debug checksum to be sent with each request. Defaults to `false`.  ```json {     "filters": {         "filetypes": ["pe", "pdb", "portablepdb"],         "path_patterns": ["*ffmpeg*"]     } } ``` */
export type Filters = {
  /** The file types enabled for the source. */
  filetypes?: ("pe" | "pdb" | "portablepdb" | "mach_debug" | "mach_code" | "elf_debug" | "elf_code" | "wasm_debug" | "wasm_code" | "breakpad" | "sourcebundle" | "uuidmap" | "bcsymbolmap" | "il2cpp" | "proguard" | "dartsymbolmap")[];
  /** The debug and code file paths enabled for the source. */
  path_patterns?: (string)[];
  /** Whether the source requires debug checksums. */
  requires_checksum?: boolean;
};

export type GetReplay = {
  data: { id?: string; project_id?: string; trace_ids?: (string)[]; error_ids?: (string)[]; environment?: string | null; tags?: { [key: string]: (string)[] | undefined } | (unknown)[]; user?: { id?: string | null; username?: string | null; email?: string | null; ip?: string | null; display_name?: string | null; geo?: { city?: string | null; country_code?: string | null; region?: string | null; subdivision?: string | null } }; sdk?: { name?: string | null; version?: string | null }; os?: { name?: string | null; version?: string | null }; browser?: { name?: string | null; version?: string | null }; device?: { name?: string | null; brand?: string | null; model?: string | null; family?: string | null }; ota_updates?: { channel?: string | null; runtime_version?: string | null; update_id?: string | null }; is_archived?: boolean | null; urls?: (string)[] | null; clicks?: ({ [key: string]: unknown | undefined })[]; count_dead_clicks?: number | null; count_rage_clicks?: number | null; count_errors?: number | null; duration?: number | null; finished_at?: string | null; started_at?: string | null; activity?: number | null; count_urls?: number | null; replay_type?: string; count_segments?: number | null; platform?: string | null; releases?: (string)[]; dist?: string | null; count_warnings?: number | null; count_infos?: number | null; has_viewed?: boolean };
};

export type GetReplayDeletionJob = {
  data: { id: number; dateCreated: string; dateUpdated: string; rangeStart: string; rangeEnd: string; environments: (string)[]; status: string; query: string; countDeleted: number };
};

export type GetReplayRecordingSegment = ({ [key: string]: unknown | undefined })[];

export type GetReplayViewedBy = {
  data: { viewed_by: ({ [key: string]: unknown | undefined })[] };
};

export type GroupDetailsResponse = {
  isUnhandled?: boolean;
  count?: string;
  userCount?: number;
  firstSeen?: string | null;
  lastSeen?: string | null;
  id: string;
  shareId: string | null;
  shortId: string;
  title: string;
  culprit: string | null;
  permalink: string;
  logger: string | null;
  level: string;
  status: string;
  statusDetails: { autoResolved?: boolean; ignoreCount?: number; ignoreUntil?: string; ignoreUserCount?: number; ignoreUserWindow?: number; ignoreWindow?: number; actor?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; inNextRelease?: boolean; inRelease?: string; inCommit?: string; pendingEvents?: number; info?: unknown };
  substatus: string | null;
  isPublic: boolean;
  platform: string | null;
  priority: string | null;
  priorityLockedAt: string | null;
  seerFixabilityScore: number | null;
  seerAutofixLastTriggered: string | null;
  seerExplorerAutofixLastTriggered: string | null;
  project: { id: string; name: string; slug: string; platform: string | null };
  type: string;
  issueType: string;
  issueCategory: string;
  metadata: { [key: string]: unknown | undefined };
  numComments: number;
  assignedTo: { type: "user" | "team"; id: string; name: string; email?: string } | null;
  isBookmarked: boolean;
  isSubscribed: boolean;
  subscriptionDetails: { disabled?: boolean; reason?: string } | null;
  hasSeen: boolean;
  annotations: ({ displayName: string; url: string })[];
  firstRelease?: { [key: string]: unknown | undefined } | null;
  lastRelease?: { [key: string]: unknown | undefined } | null;
  tags?: ({ [key: string]: unknown | undefined })[];
  stats?: { [key: string]: ((number)[])[] | undefined };
  inbox?: { [key: string]: unknown | undefined } | null;
  owners?: ({ [key: string]: unknown | undefined })[] | null;
  forecast?: { [key: string]: unknown | undefined };
  integrationIssues?: ({ [key: string]: unknown | undefined })[];
  sentryAppIssues?: ({ [key: string]: unknown | undefined })[];
  latestEventHasAttachments?: boolean;
  activity: ({ [key: string]: unknown | undefined })[];
  seenBy: ({ [key: string]: unknown | undefined })[];
  pluginActions: (unknown)[];
  pluginIssues: ({ [key: string]: unknown | undefined })[];
  pluginContexts: ({ [key: string]: unknown | undefined })[];
  userReportCount: number;
  participants: ({ [key: string]: unknown | undefined })[];
};

export type GroupEventsResponseDict = ({ id: string; "event.type": string; groupID: string | null; eventID: string; projectID: string; message: string; title: string; location: string | null; culprit: string | null; user: { id?: string | null; email?: string | null; username?: string | null; ip_address?: string | null; name?: string | null; geo?: { [key: string]: string | undefined } | null; data?: { [key: string]: unknown | undefined } | null } | null; tags: ({ query?: string; key: string; value: string })[]; platform: string | null; dateCreated: string; crashFile: string | null; metadata: { [key: string]: unknown | undefined } | null })[];

export type GroupExternalIssueResponse = ({ id: string; issueId: string; serviceType: string; displayName: string; webUrl: string })[];

export type GroupUpdateResponse = {
  isUnhandled?: boolean;
  count?: string;
  userCount?: number;
  firstSeen?: string | null;
  lastSeen?: string | null;
  id: string;
  shareId: string | null;
  shortId: string;
  title: string;
  culprit: string | null;
  permalink: string;
  logger: string | null;
  level: string;
  status: string;
  statusDetails: { autoResolved?: boolean; ignoreCount?: number; ignoreUntil?: string; ignoreUserCount?: number; ignoreUserWindow?: number; ignoreWindow?: number; actor?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; inNextRelease?: boolean; inRelease?: string; inCommit?: string; pendingEvents?: number; info?: unknown };
  substatus: string | null;
  isPublic: boolean;
  platform: string | null;
  priority: string | null;
  priorityLockedAt: string | null;
  seerFixabilityScore: number | null;
  seerAutofixLastTriggered: string | null;
  seerExplorerAutofixLastTriggered: string | null;
  project: { id: string; name: string; slug: string; platform: string | null };
  type: string;
  issueType: string;
  issueCategory: string;
  metadata: { [key: string]: unknown | undefined };
  numComments: number;
  assignedTo: { type: "user" | "team"; id: string; name: string; email?: string } | null;
  isBookmarked: boolean;
  isSubscribed: boolean;
  subscriptionDetails: { disabled?: boolean; reason?: string } | null;
  hasSeen: boolean;
  annotations: ({ displayName: string; url: string })[];
};

export type GroupValidator = {
  /** If true, marks the issue as reviewed by the requestor. */
  inbox: boolean;
  /** Limit mutations to only issues with the given status.  * `resolved` * `unresolved` * `ignored` * `resolvedInNextRelease` * `muted` */
  status: "resolved" | "unresolved" | "ignored" | "resolvedInNextRelease" | "muted";
  /** Additional details about the resolution. Status detail updates that include release data are only allowed for issues within a single project. */
  statusDetails: { inNextRelease: boolean; inRelease: string; inCommit?: { commit: string; repository: string }; ignoreDuration: number; ignoreCount: number; ignoreWindow: number; ignoreUserCount: number; ignoreUserWindow: number };
  /** The new substatus of the issue.  * `archived_until_escalating` * `archived_until_condition_met` * `archived_forever` * `escalating` * `ongoing` * `regressed` * `new` */
  substatus: "archived_until_escalating" | "archived_until_condition_met" | "archived_forever" | "escalating" | "ongoing" | "regressed" | "new" | null | null;
  /** If true, marks the issue as seen by the requestor. */
  hasSeen: boolean;
  /** If true, bookmarks the issue for the requestor. */
  isBookmarked: boolean;
  /** If true, publishes the issue. */
  isPublic: boolean;
  /** If true, subscribes the requestor to the issue. */
  isSubscribed: boolean;
  /** If true, merges the issues together. */
  merge: boolean;
  /** If true, discards the issues instead of updating them. */
  discard: boolean;
  /** The user or team that should be assigned to the issues. Values take the form of `<user_id>`, `user:<user_id>`, `<username>`, `<user_primary_email>`, or `team:<team_id>`. */
  assignedTo: string;
  /** The priority that should be set for the issues  * `low` * `medium` * `high` */
  priority: "low" | "medium" | "high";
};

export type InCommitValidator = {
  /** The SHA of the resolving commit. */
  commit: string;
  /** The name of the repository (as it appears in Sentry). */
  repository: string;
};

export type InstallInfoResponse = {
  buildId: string;
  state: string;
  appInfo: { appId: string | null; name: string | null; version: string | null; buildNumber: number | null; artifactType: string | null; dateAdded: string | null; dateBuilt: string | null };
  gitInfo: { headSha: string | null; baseSha: string | null; provider: string | null; headRepoName: string | null; baseRepoName: string | null; headRef: string | null; baseRef: string | null; prNumber: number | null } | null;
  platform: string | null;
  projectId: string;
  projectSlug: string;
  buildConfiguration: string | null;
  isInstallable: boolean;
  installUrl: string | null;
  installUrlExpiresAt: string | null;
  downloadCount: number;
  releaseNotes: string | null;
  installGroups: (string)[] | null;
  isCodeSignatureValid: boolean | null;
  profileName: string | null;
  codesigningType: string | null;
};

export type IssueEventDetailsResponse = {
  id: string;
  groupID: string | null;
  eventID: string;
  projectID: string;
  message: string | null;
  title: string;
  location: string | null;
  user: { id?: string | null; email?: string | null; username?: string | null; ip_address?: string | null; name?: string | null; geo?: { [key: string]: string | undefined } | null; data?: { [key: string]: unknown | undefined } | null } | null;
  tags: ({ query?: string; key: string; value: string })[];
  platform: string;
  dateReceived: string | null;
  contexts: { [key: string]: unknown | undefined } | null;
  size: number | null;
  entries: (unknown)[];
  dist: string | null;
  sdk: { [key: string]: string | undefined };
  context: { [key: string]: unknown | undefined } | null;
  packages: { [key: string]: unknown | undefined };
  type: string;
  metadata: unknown;
  errors: (unknown)[];
  occurrence: unknown;
  _meta: { [key: string]: unknown | undefined };
  crashFile?: string | null;
  culprit?: string | null;
  dateCreated?: string;
  fingerprints?: (string)[];
  groupingConfig?: unknown;
  startTimestamp?: string;
  endTimestamp?: string;
  measurements?: unknown;
  breakdowns?: unknown;
  release: { id?: number; commitCount?: number; data?: { [key: string]: unknown | undefined }; dateCreated?: string; dateReleased?: string | null; deployCount?: number; ref?: string | null; lastCommit?: { [key: string]: unknown | undefined } | null; lastDeploy?: { dateStarted?: string | null; url?: string | null; id: string; environment: string; dateFinished: string; name: string } | null; status?: string; url?: string | null; userAgent?: string | null; version?: string | null; versionInfo?: { description?: string; package: string | null; version: { [key: string]: unknown | undefined }; buildHash: string | null } | null } | null;
  userReport: { id: string; eventID: string; name: string | null; email: string | null; comments: string; dateCreated: string; user: { id: string; username: string | null; email: string | null; name: string | null; ipAddress: string | null; avatarUrl: string | null } | null; event: { id: string; eventID: string } } | null;
  sdkUpdates: ({ [key: string]: unknown | undefined })[];
  resolvedWith: (string)[];
  nextEventID: string | null;
  previousEventID: string | null;
};

export type LatestBaseSnapshotResponse = {
  head_artifact_id?: string;
  project_id?: string;
  project_slug?: string;
  app_id?: string | null;
  image_count?: number;
  images?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number; image_url?: string })[];
  diff_threshold?: number | null;
  date_added?: string;
  vcs_info?: { head_sha?: string | null; base_sha?: string | null; head_ref?: string | null; base_ref?: string | null; head_repo_name?: string | null; pr_number?: number | null };
};

export type LatestInstallableBuildResponse = {
  latestArtifact: { buildId: string; state: string; appInfo: { appId: string | null; name: string | null; version: string | null; buildNumber: number | null; artifactType: string | null; dateAdded: string | null; dateBuilt: string | null }; gitInfo: { headSha: string | null; baseSha: string | null; provider: string | null; headRepoName: string | null; baseRepoName: string | null; headRef: string | null; baseRef: string | null; prNumber: number | null } | null; platform: string | null; projectId: string; projectSlug: string; buildConfiguration: string | null; isInstallable: boolean; installUrl: string | null; installUrlExpiresAt: string | null; downloadCount: number; releaseNotes: string | null; installGroups: (string)[] | null; isCodeSignatureValid: boolean | null; profileName: string | null; codesigningType: string | null } | null;
  currentArtifact: { buildId: string; state: string; appInfo: { appId: string | null; name: string | null; version: string | null; buildNumber: number | null; artifactType: string | null; dateAdded: string | null; dateBuilt: string | null }; gitInfo: { headSha: string | null; baseSha: string | null; provider: string | null; headRepoName: string | null; baseRepoName: string | null; headRef: string | null; baseRef: string | null; prNumber: number | null } | null; platform: string | null; projectId: string; projectSlug: string; buildConfiguration: string | null; isInstallable: boolean; installUrl: string | null; installUrlExpiresAt: string | null; downloadCount: number; releaseNotes: string | null; installGroups: (string)[] | null; isCodeSignatureValid: boolean | null; profileName: string | null; codesigningType: string | null } | null;
};

/** Layout settings for the source. This is required for HTTP, GCS, and S3 sources.  **`type`** ***(string)*** - The layout of the folder structure. The options are: - `native` - Platform-Specific (SymStore / GDB / LLVM) - `symstore` - Microsoft SymStore - `symstore_index2` - Microsoft SymStore (with index2.txt) - `ssqp` - Microsoft SSQP - `unified` - Unified Symbol Server Layout - `debuginfod` - debuginfod  **`casing`** ***(string)*** - The layout of the folder structure. The options are: - `default` - Default (mixed case) - `uppercase` - Uppercase - `lowercase` - Lowercase  ```json {     "layout": {         "type": "native"         "casing": "default"     } } ``` */
export type Layout = {
  /** The source's layout type.  * `native` * `symstore` * `symstore_index2` * `ssqp` * `unified` * `debuginfod` * `slashsymbols` */
  type: "native" | "symstore" | "symstore_index2" | "ssqp" | "unified" | "debuginfod" | "slashsymbols";
  /** The source's casing rules.  * `lowercase` * `uppercase` * `default` */
  casing: "lowercase" | "uppercase" | "default";
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type LinkedDashboard = {
  field: string;
  dashboard_id: string;
};

export type ListClientKeysResponse = ({ id: string; name: string; label: string; public: string | null; secret: string | null; projectId: number; isActive: boolean; rateLimit: { window: number; count: number } | null; dsn: { secret: string; public: string; csp: string; security: string; minidump: string; nel: string; unreal: string; crons: string; cdn: string; playstation: string; integration: string; otlp_traces: string; otlp_logs: string }; browserSdkVersion: string; browserSdk: { choices: ((string)[])[] }; dateCreated: string | null; dynamicSdkLoaderOptions: { hasReplay: boolean; hasPerformance: boolean; hasDebug: boolean; hasFeedback: boolean; hasLogsAndMetrics: boolean }; useCase?: string })[];

export type ListDataForwarderResponse = ({ id: string; organizationId: string; isEnabled: boolean; enrollNewProjects: boolean; enrolledProjects: ({ id: string; slug: string; platform: string | null })[]; provider: string; config: { [key: string]: string | undefined } | null; projectConfigs: ({ id: string; isEnabled: boolean; dataForwarderId: string; project: { id: string; slug: string; platform: string | null }; overrides: { [key: string]: string | undefined }; effectiveConfig: { [key: string]: string | undefined }; dateAdded: string; dateUpdated: string })[]; dateAdded: string; dateUpdated: string })[];

export type ListDetectorSerializerResponse = ({ owner?: { type: "user" | "team"; id: string; name: string; email?: string } | null; createdBy?: string | null; latestGroup?: { [key: string]: unknown | undefined } | null; description?: string | null; id: string; projectId: string; name: string; type: string; workflowIds: (string)[] | null; dateCreated: string; dateUpdated: string; dataSources: ({ [key: string]: unknown | undefined })[] | null; conditionGroup: { [key: string]: unknown | undefined } | null; config: { [key: string]: unknown | undefined }; enabled: boolean })[];

export type ListMemberOnTeamResponse = ({ externalUsers?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; role?: string; roleName?: string; id: string; email: string; name: string; user: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; orgRole: string; pending: boolean; expired: boolean; flags: { "idp:provisioned": boolean; "idp:role-restricted": boolean; "sso:linked": boolean; "sso:invalid": boolean; "member-limit:restricted": boolean; "partnership:restricted": boolean }; dateCreated: string; inviteStatus: string; inviterName: string | null; teamRole: string | null; teamSlug: string })[];

export type ListOrgMembersResponse = ({ externalUsers?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; id: string; email: string; name: string; user?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; orgRole: string; pending: boolean; expired: boolean; flags: { "idp:provisioned": boolean; "idp:role-restricted": boolean; "sso:linked": boolean; "sso:invalid": boolean; "member-limit:restricted": boolean; "partnership:restricted": boolean }; dateCreated: string; inviteStatus: string; inviterName: string | null })[];

export type ListOrgTeamResponse = ({ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; externalTeams?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; organization?: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean }; projects?: ({ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string })[] })[];

export type ListOrganizationClientKeysResponse = ({ id: string; name: string; label: string; public: string | null; secret: string | null; projectId: number; isActive: boolean; rateLimit: { window: number; count: number } | null; dsn: { secret: string; public: string; csp: string; security: string; minidump: string; nel: string; unreal: string; crons: string; cdn: string; playstation: string; integration: string; otlp_traces: string; otlp_logs: string }; browserSdkVersion: string; browserSdk: { choices: ((string)[])[] }; dateCreated: string | null; dynamicSdkLoaderOptions: { hasReplay: boolean; hasPerformance: boolean; hasDebug: boolean; hasFeedback: boolean; hasLogsAndMetrics: boolean }; useCase?: string })[];

export type ListOrganizationIntegrationResponse = ({ id: string; name: string; icon: string | null; domainName: string | null; accountType: string | null; scopes: (string)[] | null; status: string; provider: unknown; configOrganization: unknown; configData: unknown; externalId: string; organizationId: number; organizationIntegrationStatus: string; gracePeriodEnd: string | null })[];

export type ListOrganizationMemberResponse = ({ externalUsers?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; id: string; email: string; name: string; user?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; orgRole: string; pending: boolean; expired: boolean; flags: { "idp:provisioned": boolean; "idp:role-restricted": boolean; "sso:linked": boolean; "sso:invalid": boolean; "member-limit:restricted": boolean; "partnership:restricted": boolean }; dateCreated: string; inviteStatus: string; inviterName: string | null })[];

export type ListOrganizations = ({ features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean })[];

export type ListProjectDebugFilesResponse = ({ id: string; uuid: string; debugId: string; codeId: string | null; cpuName: string; objectName: string; symbolType: string; headers: { [key: string]: string | undefined }; size: number; sha1: string; dateCreated: string; data: { [key: string]: unknown | undefined } })[];

export type ListProjectEnvironments = ({ id: string; name: string; isHidden: boolean })[];

export type ListReplayClicks = {
  data: ({ node_id: number; timestamp: string })[];
};

export type ListReplayDeletionJobs = {
  data: ({ id: number; dateCreated: string; dateUpdated: string; rangeStart: string; rangeEnd: string; environments: (string)[]; status: string; query: string; countDeleted: number })[];
};

export type ListReplayRecordingSegments = (({ [key: string]: unknown | undefined })[])[];

export type ListReplays = ({ id?: string; project_id?: string; trace_ids?: (string)[]; error_ids?: (string)[]; environment?: string | null; tags?: { [key: string]: (string)[] | undefined } | (unknown)[]; user?: { id?: string | null; username?: string | null; email?: string | null; ip?: string | null; display_name?: string | null; geo?: { city?: string | null; country_code?: string | null; region?: string | null; subdivision?: string | null } }; sdk?: { name?: string | null; version?: string | null }; os?: { name?: string | null; version?: string | null }; browser?: { name?: string | null; version?: string | null }; device?: { name?: string | null; brand?: string | null; model?: string | null; family?: string | null }; ota_updates?: { channel?: string | null; runtime_version?: string | null; update_id?: string | null }; is_archived?: boolean | null; urls?: (string)[] | null; clicks?: ({ [key: string]: unknown | undefined })[]; count_dead_clicks?: number | null; count_rage_clicks?: number | null; count_errors?: number | null; duration?: number | null; finished_at?: string | null; started_at?: string | null; activity?: number | null; count_urls?: number | null; replay_type?: string; count_segments?: number | null; platform?: string | null; releases?: (string)[]; dist?: string | null; count_warnings?: number | null; count_infos?: number | null; has_viewed?: boolean })[];

export type ListSelectors = {
  data: ({ count_dead_clicks?: number; count_rage_clicks?: number; dom_element?: string; element?: { alt: string; aria_label: string; class: (string)[]; component_name: string; id: string; role: string; tag: string; testid: string; title: string }; project_id?: string })[];
};

export type ListTeamProjectResponse = ({ latestDeploys?: { [key: string]: { [key: string]: string | undefined } | undefined } | null; options?: { [key: string]: unknown | undefined }; stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; team: { id: string; name: string; slug: string } | null; teams: ({ id: string; name: string; slug: string })[]; platforms: (string)[]; hasUserReports: boolean; environments: (string)[]; latestRelease: { version: string } | null })[];

export type ListWorkflow = ({ id: string; name: string; organizationId: string; createdBy: string | null; dateCreated: string; dateUpdated: string; triggers: { id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] } | null; actionFilters: ({ id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] })[] | null; environment: string | null; config: { [key: string]: unknown | undefined }; detectorIds: (string)[] | null; enabled: boolean; lastTriggered: string | null; owner: string | null })[];

export type Monitor = {
  alertRule?: { targets: ({ targetIdentifier: number; targetType: string })[]; environment: string };
  id: string;
  name: string;
  slug: string;
  status: string;
  isMuted: boolean;
  isUpserting: boolean;
  config: { schedule_type: "crontab" | "interval"; schedule: string | (number)[]; checkin_margin: number | null; max_runtime: number | null; timezone: string | null; failure_issue_threshold: number | null; recovery_threshold: number | null; alert_rule_id: number | null };
  dateCreated: string;
  project: { stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string };
  environments: { name: string; status: string; isMuted: boolean; dateCreated: string; lastCheckIn: string; nextCheckIn: string; nextCheckInLatest: string; activeIncident: { startingTimestamp: string; resolvingTimestamp: string; brokenNotice: { userNotifiedTimestamp: string; environmentMutedTimestamp: string } | null } | null };
  owner: { type: "user" | "team"; id: string; name: string; email?: string };
};

export type MonitorList = ({ alertRule?: { targets: ({ targetIdentifier: number; targetType: string })[]; environment: string }; id: string; name: string; slug: string; status: string; isMuted: boolean; isUpserting: boolean; config: { schedule_type: "crontab" | "interval"; schedule: string | (number)[]; checkin_margin: number | null; max_runtime: number | null; timezone: string | null; failure_issue_threshold: number | null; recovery_threshold: number | null; alert_rule_id: number | null }; dateCreated: string; project: { stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string }; environments: { name: string; status: string; isMuted: boolean; dateCreated: string; lastCheckIn: string; nextCheckIn: string; nextCheckInLatest: string; activeIncident: { startingTimestamp: string; resolvingTimestamp: string; brokenNotice: { userNotifiedTimestamp: string; environmentMutedTimestamp: string } | null } | null }; owner: { type: "user" | "team"; id: string; name: string; email?: string } })[];

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type MonitorValidator = {
  /** The project slug to associate the monitor to. */
  project: string;
  /** Name of the monitor. Used for notifications. If not set the slug will be derived from your monitor name. */
  name: string;
  /** The configuration for the monitor. */
  config: { schedule_type?: "crontab" | "interval"; schedule: unknown; checkin_margin?: number | null; max_runtime?: number | null; timezone?: "Africa/Abidjan" | "Africa/Accra" | "Africa/Addis_Ababa" | "Africa/Algiers" | "Africa/Asmara" | "Africa/Asmera" | "Africa/Bamako" | "Africa/Bangui" | "Africa/Banjul" | "Africa/Bissau" | "Africa/Blantyre" | "Africa/Brazzaville" | "Africa/Bujumbura" | "Africa/Cairo" | "Africa/Casablanca" | "Africa/Ceuta" | "Africa/Conakry" | "Africa/Dakar" | "Africa/Dar_es_Salaam" | "Africa/Djibouti" | "Africa/Douala" | "Africa/El_Aaiun" | "Africa/Freetown" | "Africa/Gaborone" | "Africa/Harare" | "Africa/Johannesburg" | "Africa/Juba" | "Africa/Kampala" | "Africa/Khartoum" | "Africa/Kigali" | "Africa/Kinshasa" | "Africa/Lagos" | "Africa/Libreville" | "Africa/Lome" | "Africa/Luanda" | "Africa/Lubumbashi" | "Africa/Lusaka" | "Africa/Malabo" | "Africa/Maputo" | "Africa/Maseru" | "Africa/Mbabane" | "Africa/Mogadishu" | "Africa/Monrovia" | "Africa/Nairobi" | "Africa/Ndjamena" | "Africa/Niamey" | "Africa/Nouakchott" | "Africa/Ouagadougou" | "Africa/Porto-Novo" | "Africa/Sao_Tome" | "Africa/Timbuktu" | "Africa/Tripoli" | "Africa/Tunis" | "Africa/Windhoek" | "America/Adak" | "America/Anchorage" | "America/Anguilla" | "America/Antigua" | "America/Araguaina" | "America/Argentina/Buenos_Aires" | "America/Argentina/Catamarca" | "America/Argentina/ComodRivadavia" | "America/Argentina/Cordoba" | "America/Argentina/Jujuy" | "America/Argentina/La_Rioja" | "America/Argentina/Mendoza" | "America/Argentina/Rio_Gallegos" | "America/Argentina/Salta" | "America/Argentina/San_Juan" | "America/Argentina/San_Luis" | "America/Argentina/Tucuman" | "America/Argentina/Ushuaia" | "America/Aruba" | "America/Asuncion" | "America/Atikokan" | "America/Atka" | "America/Bahia" | "America/Bahia_Banderas" | "America/Barbados" | "America/Belem" | "America/Belize" | "America/Blanc-Sablon" | "America/Boa_Vista" | "America/Bogota" | "America/Boise" | "America/Buenos_Aires" | "America/Cambridge_Bay" | "America/Campo_Grande" | "America/Cancun" | "America/Caracas" | "America/Catamarca" | "America/Cayenne" | "America/Cayman" | "America/Chicago" | "America/Chihuahua" | "America/Ciudad_Juarez" | "America/Coral_Harbour" | "America/Cordoba" | "America/Costa_Rica" | "America/Coyhaique" | "America/Creston" | "America/Cuiaba" | "America/Curacao" | "America/Danmarkshavn" | "America/Dawson" | "America/Dawson_Creek" | "America/Denver" | "America/Detroit" | "America/Dominica" | "America/Edmonton" | "America/Eirunepe" | "America/El_Salvador" | "America/Ensenada" | "America/Fort_Nelson" | "America/Fort_Wayne" | "America/Fortaleza" | "America/Glace_Bay" | "America/Godthab" | "America/Goose_Bay" | "America/Grand_Turk" | "America/Grenada" | "America/Guadeloupe" | "America/Guatemala" | "America/Guayaquil" | "America/Guyana" | "America/Halifax" | "America/Havana" | "America/Hermosillo" | "America/Indiana/Indianapolis" | "America/Indiana/Knox" | "America/Indiana/Marengo" | "America/Indiana/Petersburg" | "America/Indiana/Tell_City" | "America/Indiana/Vevay" | "America/Indiana/Vincennes" | "America/Indiana/Winamac" | "America/Indianapolis" | "America/Inuvik" | "America/Iqaluit" | "America/Jamaica" | "America/Jujuy" | "America/Juneau" | "America/Kentucky/Louisville" | "America/Kentucky/Monticello" | "America/Knox_IN" | "America/Kralendijk" | "America/La_Paz" | "America/Lima" | "America/Los_Angeles" | "America/Louisville" | "America/Lower_Princes" | "America/Maceio" | "America/Managua" | "America/Manaus" | "America/Marigot" | "America/Martinique" | "America/Matamoros" | "America/Mazatlan" | "America/Mendoza" | "America/Menominee" | "America/Merida" | "America/Metlakatla" | "America/Mexico_City" | "America/Miquelon" | "America/Moncton" | "America/Monterrey" | "America/Montevideo" | "America/Montreal" | "America/Montserrat" | "America/Nassau" | "America/New_York" | "America/Nipigon" | "America/Nome" | "America/Noronha" | "America/North_Dakota/Beulah" | "America/North_Dakota/Center" | "America/North_Dakota/New_Salem" | "America/Nuuk" | "America/Ojinaga" | "America/Panama" | "America/Pangnirtung" | "America/Paramaribo" | "America/Phoenix" | "America/Port-au-Prince" | "America/Port_of_Spain" | "America/Porto_Acre" | "America/Porto_Velho" | "America/Puerto_Rico" | "America/Punta_Arenas" | "America/Rainy_River" | "America/Rankin_Inlet" | "America/Recife" | "America/Regina" | "America/Resolute" | "America/Rio_Branco" | "America/Rosario" | "America/Santa_Isabel" | "America/Santarem" | "America/Santiago" | "America/Santo_Domingo" | "America/Sao_Paulo" | "America/Scoresbysund" | "America/Shiprock" | "America/Sitka" | "America/St_Barthelemy" | "America/St_Johns" | "America/St_Kitts" | "America/St_Lucia" | "America/St_Thomas" | "America/St_Vincent" | "America/Swift_Current" | "America/Tegucigalpa" | "America/Thule" | "America/Thunder_Bay" | "America/Tijuana" | "America/Toronto" | "America/Tortola" | "America/Vancouver" | "America/Virgin" | "America/Whitehorse" | "America/Winnipeg" | "America/Yakutat" | "America/Yellowknife" | "Antarctica/Casey" | "Antarctica/Davis" | "Antarctica/DumontDUrville" | "Antarctica/Macquarie" | "Antarctica/Mawson" | "Antarctica/McMurdo" | "Antarctica/Palmer" | "Antarctica/Rothera" | "Antarctica/South_Pole" | "Antarctica/Syowa" | "Antarctica/Troll" | "Antarctica/Vostok" | "Arctic/Longyearbyen" | "Asia/Aden" | "Asia/Almaty" | "Asia/Amman" | "Asia/Anadyr" | "Asia/Aqtau" | "Asia/Aqtobe" | "Asia/Ashgabat" | "Asia/Ashkhabad" | "Asia/Atyrau" | "Asia/Baghdad" | "Asia/Bahrain" | "Asia/Baku" | "Asia/Bangkok" | "Asia/Barnaul" | "Asia/Beirut" | "Asia/Bishkek" | "Asia/Brunei" | "Asia/Calcutta" | "Asia/Chita" | "Asia/Choibalsan" | "Asia/Chongqing" | "Asia/Chungking" | "Asia/Colombo" | "Asia/Dacca" | "Asia/Damascus" | "Asia/Dhaka" | "Asia/Dili" | "Asia/Dubai" | "Asia/Dushanbe" | "Asia/Famagusta" | "Asia/Gaza" | "Asia/Harbin" | "Asia/Hebron" | "Asia/Ho_Chi_Minh" | "Asia/Hong_Kong" | "Asia/Hovd" | "Asia/Irkutsk" | "Asia/Istanbul" | "Asia/Jakarta" | "Asia/Jayapura" | "Asia/Jerusalem" | "Asia/Kabul" | "Asia/Kamchatka" | "Asia/Karachi" | "Asia/Kashgar" | "Asia/Kathmandu" | "Asia/Katmandu" | "Asia/Khandyga" | "Asia/Kolkata" | "Asia/Krasnoyarsk" | "Asia/Kuala_Lumpur" | "Asia/Kuching" | "Asia/Kuwait" | "Asia/Macao" | "Asia/Macau" | "Asia/Magadan" | "Asia/Makassar" | "Asia/Manila" | "Asia/Muscat" | "Asia/Nicosia" | "Asia/Novokuznetsk" | "Asia/Novosibirsk" | "Asia/Omsk" | "Asia/Oral" | "Asia/Phnom_Penh" | "Asia/Pontianak" | "Asia/Pyongyang" | "Asia/Qatar" | "Asia/Qostanay" | "Asia/Qyzylorda" | "Asia/Rangoon" | "Asia/Riyadh" | "Asia/Saigon" | "Asia/Sakhalin" | "Asia/Samarkand" | "Asia/Seoul" | "Asia/Shanghai" | "Asia/Singapore" | "Asia/Srednekolymsk" | "Asia/Taipei" | "Asia/Tashkent" | "Asia/Tbilisi" | "Asia/Tehran" | "Asia/Tel_Aviv" | "Asia/Thimbu" | "Asia/Thimphu" | "Asia/Tokyo" | "Asia/Tomsk" | "Asia/Ujung_Pandang" | "Asia/Ulaanbaatar" | "Asia/Ulan_Bator" | "Asia/Urumqi" | "Asia/Ust-Nera" | "Asia/Vientiane" | "Asia/Vladivostok" | "Asia/Yakutsk" | "Asia/Yangon" | "Asia/Yekaterinburg" | "Asia/Yerevan" | "Atlantic/Azores" | "Atlantic/Bermuda" | "Atlantic/Canary" | "Atlantic/Cape_Verde" | "Atlantic/Faeroe" | "Atlantic/Faroe" | "Atlantic/Jan_Mayen" | "Atlantic/Madeira" | "Atlantic/Reykjavik" | "Atlantic/South_Georgia" | "Atlantic/St_Helena" | "Atlantic/Stanley" | "Australia/ACT" | "Australia/Adelaide" | "Australia/Brisbane" | "Australia/Broken_Hill" | "Australia/Canberra" | "Australia/Currie" | "Australia/Darwin" | "Australia/Eucla" | "Australia/Hobart" | "Australia/LHI" | "Australia/Lindeman" | "Australia/Lord_Howe" | "Australia/Melbourne" | "Australia/NSW" | "Australia/North" | "Australia/Perth" | "Australia/Queensland" | "Australia/South" | "Australia/Sydney" | "Australia/Tasmania" | "Australia/Victoria" | "Australia/West" | "Australia/Yancowinna" | "Brazil/Acre" | "Brazil/DeNoronha" | "Brazil/East" | "Brazil/West" | "CET" | "CST6CDT" | "Canada/Atlantic" | "Canada/Central" | "Canada/Eastern" | "Canada/Mountain" | "Canada/Newfoundland" | "Canada/Pacific" | "Canada/Saskatchewan" | "Canada/Yukon" | "Chile/Continental" | "Chile/EasterIsland" | "Cuba" | "EET" | "EST" | "EST5EDT" | "Egypt" | "Eire" | "Etc/GMT" | "Etc/GMT+0" | "Etc/GMT+1" | "Etc/GMT+10" | "Etc/GMT+11" | "Etc/GMT+12" | "Etc/GMT+2" | "Etc/GMT+3" | "Etc/GMT+4" | "Etc/GMT+5" | "Etc/GMT+6" | "Etc/GMT+7" | "Etc/GMT+8" | "Etc/GMT+9" | "Etc/GMT-0" | "Etc/GMT-1" | "Etc/GMT-10" | "Etc/GMT-11" | "Etc/GMT-12" | "Etc/GMT-13" | "Etc/GMT-14" | "Etc/GMT-2" | "Etc/GMT-3" | "Etc/GMT-4" | "Etc/GMT-5" | "Etc/GMT-6" | "Etc/GMT-7" | "Etc/GMT-8" | "Etc/GMT-9" | "Etc/GMT0" | "Etc/Greenwich" | "Etc/UCT" | "Etc/UTC" | "Etc/Universal" | "Etc/Zulu" | "Europe/Amsterdam" | "Europe/Andorra" | "Europe/Astrakhan" | "Europe/Athens" | "Europe/Belfast" | "Europe/Belgrade" | "Europe/Berlin" | "Europe/Bratislava" | "Europe/Brussels" | "Europe/Bucharest" | "Europe/Budapest" | "Europe/Busingen" | "Europe/Chisinau" | "Europe/Copenhagen" | "Europe/Dublin" | "Europe/Gibraltar" | "Europe/Guernsey" | "Europe/Helsinki" | "Europe/Isle_of_Man" | "Europe/Istanbul" | "Europe/Jersey" | "Europe/Kaliningrad" | "Europe/Kiev" | "Europe/Kirov" | "Europe/Kyiv" | "Europe/Lisbon" | "Europe/Ljubljana" | "Europe/London" | "Europe/Luxembourg" | "Europe/Madrid" | "Europe/Malta" | "Europe/Mariehamn" | "Europe/Minsk" | "Europe/Monaco" | "Europe/Moscow" | "Europe/Nicosia" | "Europe/Oslo" | "Europe/Paris" | "Europe/Podgorica" | "Europe/Prague" | "Europe/Riga" | "Europe/Rome" | "Europe/Samara" | "Europe/San_Marino" | "Europe/Sarajevo" | "Europe/Saratov" | "Europe/Simferopol" | "Europe/Skopje" | "Europe/Sofia" | "Europe/Stockholm" | "Europe/Tallinn" | "Europe/Tirane" | "Europe/Tiraspol" | "Europe/Ulyanovsk" | "Europe/Uzhgorod" | "Europe/Vaduz" | "Europe/Vatican" | "Europe/Vienna" | "Europe/Vilnius" | "Europe/Volgograd" | "Europe/Warsaw" | "Europe/Zagreb" | "Europe/Zaporozhye" | "Europe/Zurich" | "GB" | "GB-Eire" | "GMT" | "GMT+0" | "GMT-0" | "GMT0" | "Greenwich" | "HST" | "Hongkong" | "Iceland" | "Indian/Antananarivo" | "Indian/Chagos" | "Indian/Christmas" | "Indian/Cocos" | "Indian/Comoro" | "Indian/Kerguelen" | "Indian/Mahe" | "Indian/Maldives" | "Indian/Mauritius" | "Indian/Mayotte" | "Indian/Reunion" | "Iran" | "Israel" | "Jamaica" | "Japan" | "Kwajalein" | "Libya" | "MET" | "MST" | "MST7MDT" | "Mexico/BajaNorte" | "Mexico/BajaSur" | "Mexico/General" | "NZ" | "NZ-CHAT" | "Navajo" | "PRC" | "PST8PDT" | "Pacific/Apia" | "Pacific/Auckland" | "Pacific/Bougainville" | "Pacific/Chatham" | "Pacific/Chuuk" | "Pacific/Easter" | "Pacific/Efate" | "Pacific/Enderbury" | "Pacific/Fakaofo" | "Pacific/Fiji" | "Pacific/Funafuti" | "Pacific/Galapagos" | "Pacific/Gambier" | "Pacific/Guadalcanal" | "Pacific/Guam" | "Pacific/Honolulu" | "Pacific/Johnston" | "Pacific/Kanton" | "Pacific/Kiritimati" | "Pacific/Kosrae" | "Pacific/Kwajalein" | "Pacific/Majuro" | "Pacific/Marquesas" | "Pacific/Midway" | "Pacific/Nauru" | "Pacific/Niue" | "Pacific/Norfolk" | "Pacific/Noumea" | "Pacific/Pago_Pago" | "Pacific/Palau" | "Pacific/Pitcairn" | "Pacific/Pohnpei" | "Pacific/Ponape" | "Pacific/Port_Moresby" | "Pacific/Rarotonga" | "Pacific/Saipan" | "Pacific/Samoa" | "Pacific/Tahiti" | "Pacific/Tarawa" | "Pacific/Tongatapu" | "Pacific/Truk" | "Pacific/Wake" | "Pacific/Wallis" | "Pacific/Yap" | "Poland" | "Portugal" | "ROC" | "ROK" | "Singapore" | "Turkey" | "UCT" | "US/Alaska" | "US/Aleutian" | "US/Arizona" | "US/Central" | "US/East-Indiana" | "US/Eastern" | "US/Hawaii" | "US/Indiana-Starke" | "US/Michigan" | "US/Mountain" | "US/Pacific" | "US/Samoa" | "UTC" | "Universal" | "W-SU" | "WET" | "Zulu" | "localtime" | ""; failure_issue_threshold?: number | null; recovery_threshold?: number | null };
  /** Uniquely identifies your monitor within your organization. Changing this slug will require updates to any instrumented check-in calls. */
  slug?: string;
  /** Status of the monitor. Disabled monitors will not accept events and will not count towards the monitor quota.  * `active` * `disabled` */
  status?: "active" | "disabled";
  /** The ID of the team or user that owns the monitor. (eg. user:51 or team:6) */
  owner?: string | null;
  /** Disable creation of monitor incidents */
  is_muted?: boolean;
};

/** Django Rest Framework serializer for incoming NotificationAction API payloads */
export type NotificationAction = {
  /** Type of the trigger that causes the notification. The only supported trigger right now is: `spike-protection`. */
  trigger_type: string;
  /** Service that is used for sending the notification. - `email` - `slack` - `sentry_notification` - `pagerduty` - `opsgenie`  */
  service_type: string;
  /** ID of the integration used as the notification service. See [List Integrations](https://docs.sentry.io/api/integrations/list-an-organizations-available-integrations/) to retrieve a full list of integrations.  Required if **service_type** is `slack`, `pagerduty` or `opsgenie`.  */
  integration_id?: number;
  /** ID of the notification target, like a Slack channel ID.  Required if **service_type** is `slack` or `opsgenie`.  */
  target_identifier?: string;
  /** Name of the notification target, like a Slack channel name.  Required if **service_type** is `slack` or `opsgenie`.  */
  target_display?: string;
  /** List of projects slugs that the Notification Action is created for. */
  projects?: (string)[];
};

export type OrgReleaseResponse = {
  ref?: string | null;
  url?: string | null;
  dateReleased?: string | null;
  dateCreated?: string | null;
  dateStarted?: string | null;
  owner?: { [key: string]: unknown | undefined } | null;
  lastCommit?: { [key: string]: unknown | undefined } | null;
  lastDeploy?: { dateStarted?: string | null; url?: string | null; id: string; environment: string; dateFinished: string; name: string } | null;
  firstEvent?: string | null;
  lastEvent?: string | null;
  currentProjectMeta?: { [key: string]: unknown | undefined } | null;
  userAgent?: string | null;
  adoptionStages?: { [key: string]: unknown | undefined } | null;
  id: number;
  version: string;
  newGroups: number;
  status: string;
  shortVersion: string;
  versionInfo: { description?: string; package: string | null; version: { [key: string]: unknown | undefined }; buildHash: string | null } | null;
  data: { [key: string]: unknown | undefined };
  commitCount: number;
  deployCount: number;
  authors: ({ identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } | { name: string | null; email: string })[];
  projects: ({ healthData?: { durationP50?: number | null; durationP90?: number | null; crashFreeUsers?: number | null; crashFreeSessions?: number | null; totalUsers?: number | null; totalUsers24h?: number | null; totalProjectUsers24h?: number | null; totalSessions?: number | null; totalSessions24h?: number | null; totalProjectSessions24h?: number | null; adoption?: number | null; sessionsAdoption?: number | null; sessionsCrashed: number; sessionsErrored: number; hasHealthData: boolean; stats: { [key: string]: unknown | undefined } } | null; dateReleased?: string | null; dateCreated?: string | null; dateStarted?: string | null; id: number; slug: string; name: string; platform: string | null; platforms: (string)[] | null; hasHealthData: boolean; newGroups: number })[];
};

export type OrganizationConfigIntegrationsEndpointResponse = {
  providers: ({ key: string; slug: string; name: string; metadata: unknown; canAdd: boolean; canDisable: boolean; features: (string)[]; setupDialog: { [key: string]: unknown | undefined } })[];
};

export type OrganizationDetailsPut = {
  /** The new slug for the organization, which needs to be unique. */
  slug?: string;
  /** The new name for the organization. */
  name?: string;
  /** Specify `true` to opt-in to new features before they're released to the public. */
  isEarlyAdopter?: boolean;
  /** Specify `true` to hide AI features from the organization. */
  hideAiFeatures?: boolean;
  /** Specify `true` to enable Code Coverage Insights. This feature is only available for organizations on the Team plan and above. Learn more about Codecov [here](/product/codecov/). */
  codecovAccess?: boolean;
  /** The default role new members will receive.  * `member` - Member * `admin` - Admin * `manager` - Manager * `owner` - Owner */
  defaultRole?: "member" | "admin" | "manager" | "owner";
  /** Specify `true` to allow organization members to freely join any team. */
  openMembership?: boolean;
  /** Specify `true` to allow members to delete events (including the delete & discard action) by granting them the `event:admin` scope. */
  eventsMemberAdmin?: boolean;
  /** Specify `true` to allow members to create, edit, and delete alert rules by granting them the `alerts:write` scope. */
  alertsMemberWrite?: boolean;
  /** The role required to download event attachments, such as native crash reports or log files.  * `member` - Member * `admin` - Admin * `manager` - Manager * `owner` - Owner */
  attachmentsRole?: "member" | "admin" | "manager" | "owner";
  /** The role required to download debug information files, ProGuard mappings and source maps.  * `member` - Member * `admin` - Admin * `manager` - Manager * `owner` - Owner */
  debugFilesRole?: "member" | "admin" | "manager" | "owner";
  /** Specify `true` to enable granular replay permissions, allowing per-member access control for replay data. */
  hasGranularReplayPermissions?: boolean;
  /** A list of user IDs who have permission to access replay data. Requires the hasGranularReplayPermissions flag to be true to be enforced. */
  replayAccessMembers?: (number)[] | null;
  /** The type of display picture for the organization.  * `letter_avatar` - Use initials * `upload` - Upload an image */
  avatarType?: "letter_avatar" | "upload";
  /** The image to upload as the organization avatar, in base64. Required if `avatarType` is `upload`. */
  avatar?: string;
  /** Specify `true` to require and enforce two-factor authentication for all members. */
  require2FA?: boolean;
  /** Specify `true` to allow sharing of limited details on issues to anonymous users. */
  allowSharedIssues?: boolean;
  /** Specify `true` to enable enhanced privacy controls to limit personally identifiable information (PII) as well as source code in things like notifications. */
  enhancedPrivacy?: boolean;
  /** Specify `true` to allow Sentry to scrape missing JavaScript source context when possible. */
  scrapeJavaScript?: boolean;
  /** How many native crash reports (such as Minidumps for improved processing and download in issue details) to store per issue.  * `0` - Disabled * `1` - 1 per issue * `5` - 5 per issue * `10` - 10 per issue * `20` - 20 per issue * `50` - 50 per issue * `100` - 100 per issue * `-1` - Unlimited */
  storeCrashReports?: 0 | 1 | 5 | 10 | 20 | 50 | 100 | -1;
  /** Specify `true` to allow users to request to join your organization. */
  allowJoinRequests?: boolean;
  /** Specify `true` to require server-side data scrubbing for all projects. */
  dataScrubber?: boolean;
  /** Specify `true` to apply the default scrubbers to prevent things like passwords and credit cards from being stored for all projects. */
  dataScrubberDefaults?: boolean;
  /** A list of additional global field names to match against when scrubbing data for all projects. */
  sensitiveFields?: (string)[];
  /** A list of global field names which data scrubbers should ignore. */
  safeFields?: (string)[];
  /** Specify `true` to prevent IP addresses from being stored for new events on all projects. */
  scrubIPAddresses?: boolean;
  /** Advanced data scrubbing rules that can be configured for each project as a JSON string. The new rules will only apply to new incoming events. For more details on advanced data scrubbing, see our [full documentation](/security-legal-pii/scrubbing/advanced-datascrubbing/).  > Warning: Calling this endpoint with this field fully overwrites the advanced data scrubbing rules.  Below is an example of a payload for a set of advanced data scrubbing rules for masking credit card numbers from the log message (equivalent to `[Mask] [Credit card numbers] from [$message]` in the Sentry app) and removing a specific key called `foo` (equivalent to `[Remove] [Anything] from [extra.foo]` in the Sentry app): ```json {     relayPiiConfig: "{\"rules":{\"0\":{\"type\":\"creditcard\",\"redaction\":{\"method\":\"mask\"}},\"1\":{\"type\":\"anything\",\"redaction\":{\"method\":\"remove\"}}},\"applications\":{\"$message\":[\"0\"],\"extra.foo\":[\"1\"]}}" } ```          */
  relayPiiConfig?: string;
  /** A list of local Relays (the name, public key, and description as a JSON) registered for the organization. This feature is only available for organizations on the Business and Enterprise plans. Read more about Relay [here](/product/relay/).                                            Below is an example of a list containing a single local Relay registered for the organization:                                           ```json                                           {                                             trustedRelays: [                                                 {                                                     name: "my-relay",                                                     publicKey: "eiwr9fdruw4erfh892qy4493reyf89ur34wefd90h",                                                     description: "Configuration for my-relay."                                                 }                                             ]                                           }                                           ```                                            */
  trustedRelays?: ({ [key: string]: unknown | undefined })[];
  /** Specify `true` to allow the Sentry Slack integration to post replies in threads for an Issue Alert notification. Requires a Slack integration. */
  issueAlertsThreadFlag?: boolean;
  /** Specify `true` to allow the Sentry Slack integration to post replies in threads for a Metric Alert notification. Requires a Slack integration. */
  metricAlertsThreadFlag?: boolean;
  /** Specify `true` to restore an organization that is pending deletion. */
  cancelDeletion?: boolean;
};

export type OrganizationEnvironmentResponse = ({ id: string; name: string })[];

export type OrganizationEventsResponseDict = {
  data: ({ [key: string]: unknown | undefined })[];
  meta: { fields: { [key: string]: string | undefined }; datasetReason?: string; isMetricsData?: boolean; isMetricsExtractedData?: boolean };
};

export type OrganizationEventsTimeseriesResponse = {
  meta?: { dataset: string; start: number; end: number };
  timeSeries: ({ values: ({ timestamp: number; value: number; incomplete: boolean; comparisonValue?: number; sampleCount?: number; sampleRate?: number | null; confidence?: "low" | "high" | null; incompleteReason?: string })[]; yAxis: string; groupBy?: ({ key: string; value: string | number | { [key: string]: unknown } | null })[]; meta: { order?: number; isOther?: boolean; valueUnit: string | null; dataScanned?: "partial" | "full"; valueType: string; interval: number } })[];
};

export type OrganizationGroupIndexGetResponse = ({ id: string; shareId: string | null; shortId: string; title: string; culprit: string | null; permalink: string; logger: string | null; level: string; status: string; statusDetails: { autoResolved?: boolean; ignoreCount?: number; ignoreUntil?: string; ignoreUserCount?: number; ignoreUserWindow?: number; ignoreWindow?: number; actor?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; inNextRelease?: boolean; inRelease?: string; inCommit?: string; pendingEvents?: number; info?: unknown }; substatus: string | null; isPublic: boolean; platform: string | null; priority: string | null; priorityLockedAt: string | null; seerFixabilityScore: number | null; seerAutofixLastTriggered: string | null; seerExplorerAutofixLastTriggered: string | null; project: { id: string; name: string; slug: string; platform: string | null }; type: string; issueType: string; issueCategory: string; metadata: { [key: string]: unknown | undefined }; numComments: number; assignedTo: { type: "user" | "team"; id: string; name: string; email?: string } | null; isBookmarked: boolean; isSubscribed: boolean; subscriptionDetails: { disabled?: boolean; reason?: string } | null; hasSeen: boolean; annotations: ({ displayName: string; url: string })[]; isUnhandled: boolean; count: string; userCount: number; firstSeen: string | null; lastSeen: string | null; stats: { [key: string]: unknown | undefined }; lifetime: { [key: string]: unknown | undefined }; filtered: { count: string; userCount: number; firstSeen: string | null; lastSeen: string | null; stats: { [key: string]: unknown | undefined } } | null; sessionCount: number; inbox: { reason: number; reason_details: { until: string | null; count: number | null; window: number | null; user_count: number | null; user_window: number | null } | null; date_added: string }; owners: { type: string; owner: string; date_added: string }; pluginActions: ((string)[])[]; pluginIssues: ({ [key: string]: unknown | undefined })[]; integrationIssues: ({ [key: string]: unknown | undefined })[]; sentryAppIssues: ({ [key: string]: unknown | undefined })[]; latestEventHasAttachments: boolean })[];

export type OrganizationGroupIndexPutResponse = {
  assignedTo?: { type: "user" | "team"; id: string; name: string; email?: string };
  discard?: boolean;
  hasSeen?: boolean;
  inbox?: boolean;
  isBookmarked?: boolean;
  isPublic?: boolean;
  isSubscribed?: boolean;
  merge?: { parent: string; children: (string)[] };
  priority?: string;
  shareId?: string;
  status?: string;
  statusDetails?: { inNextRelease?: boolean; inRelease?: string; inCommit?: { commit: string; repository: string }; ignoreDuration?: number; ignoreCount?: number; ignoreWindow?: number; ignoreUserCount?: number; ignoreUserWindow?: number };
  subscriptionDetails?: { disabled?: boolean; reason?: string };
  substatus?: string;
};

export type OrganizationIntegrationResponse = {
  id: string;
  name: string;
  icon: string | null;
  domainName: string | null;
  accountType: string | null;
  scopes: (string)[] | null;
  status: string;
  provider: unknown;
  configOrganization: unknown;
  configData: unknown;
  externalId: string;
  organizationId: number;
  organizationIntegrationStatus: string;
  gracePeriodEnd: string | null;
};

export type OrganizationMember = {
  externalUsers?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[];
  id: string;
  email: string;
  name: string;
  user?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] };
  orgRole: string;
  pending: boolean;
  expired: boolean;
  flags: { "idp:provisioned": boolean; "idp:role-restricted": boolean; "sso:linked": boolean; "sso:invalid": boolean; "member-limit:restricted": boolean; "partnership:restricted": boolean };
  dateCreated: string;
  inviteStatus: string;
  inviterName: string | null;
};

export type OrganizationMemberRequest = {
  /** The email address to send the invitation to. */
  email: string;
  /** The organization-level role of the new member. Roles include:  * `billing` - Can manage payment and compliance details. * `member` - Can view and act on events, as well as view most other data within the organization. * `manager` - Has full management access to all teams and projects. Can also manage         the organization's membership. * `owner` - Has unrestricted access to the organization, its data, and its         settings. Can add, modify, and delete projects and members, as well as         make billing and plan changes. * `admin` - Can edit global integrations, manage projects, and add/remove teams.         They automatically assume the Team Admin role for teams they join.         Note: This role can no longer be assigned in Business and Enterprise plans. Use `TeamRoles` instead.          */
  orgRole?: "billing" | "member" | "manager" | "owner" | "admin";
  /** The team and team-roles assigned to the member. Team roles can be either:         - `contributor` - Can view and act on issues. Depending on organization settings, they can also add team members.         - `admin` - Has full management access to their team's membership and projects. */
  teamRoles?: ({ [key: string]: unknown | undefined })[] | null;
  /** Whether or not to send an invite notification through email. Defaults to True. */
  sendInvite?: boolean;
  /** Whether or not to re-invite a user who has already been invited to the organization. Defaults to True. */
  reinvite?: boolean;
};

/** Conforming to the SCIM RFC, this represents a Sentry Org Member as a SCIM user object. */
export type OrganizationMemberScim = {
  active?: boolean;
  schemas: (string)[];
  id: string;
  userName: string;
  name: { givenName: string; familyName: string };
  emails: ({ primary: boolean; value: string; type: string })[];
  meta: { resourceType: string };
  sentryOrgRole: string;
};

export type OrganizationMemberTeam = {
  /** The team-level role to switch to. Valid roles include:  * `contributor` - Contributors can view and act on events, as well as view most other data within the team's projects. * `admin` - Admin privileges on the team. They can create and remove projects, and can manage the team's memberships. */
  teamRole?: "contributor" | "admin";
};

export type OrganizationMemberTeamDetails = {
  isActive: boolean;
  teamRole: "contributor" | "admin";
};

export type OrganizationMemberWithRoles = {
  externalUsers?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[];
  role?: string;
  roleName?: string;
  id: string;
  email: string;
  name: string;
  user?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] };
  orgRole: string;
  pending: boolean;
  expired: boolean;
  flags: { "idp:provisioned": boolean; "idp:role-restricted": boolean; "sso:linked": boolean; "sso:invalid": boolean; "member-limit:restricted": boolean; "partnership:restricted": boolean };
  dateCreated: string;
  inviteStatus: string;
  inviterName: string | null;
  teams: (string)[];
  teamRoles: ({ teamSlug: string; role: string | null })[];
  invite_link: string | null;
  isOnlyOwner: boolean;
  orgRoleList: ({ id: string; name: string; desc: string; scopes: (string)[]; allowed: boolean; isAllowed: boolean; isRetired: boolean; isTeamRolesAllowed: boolean; is_global: boolean; isGlobal: boolean; minimumTeamRole: string })[];
  teamRoleList: ({ id: string; name: string; desc: string; scopes: (string)[]; allowed: boolean; isAllowed: boolean; isRetired: boolean; isTeamRolesAllowed: boolean; isMinimumRoleFor: string | null })[];
};

export type OrganizationProjectResponseDict = ({ latestDeploys?: { [key: string]: { [key: string]: string | undefined } | undefined } | null; options?: { [key: string]: unknown | undefined }; stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; team: { id: string; name: string; slug: string } | null; teams: ({ id: string; name: string; slug: string })[]; platforms: (string)[]; hasUserReports: boolean; environments: (string)[]; latestRelease: { version: string } | null })[];

export type OrganizationRelayResponse = ({ relayId: string; version: string; publicKey: string; firstSeen: string; lastSeen: string })[];

export type OrganizationRelease = {
  /** An optional commit reference. This is useful if a tagged version has been provided. */
  ref?: string | null;
  /** A URL that points to the release. For instance, this can be the path to an online interface to the source code, such as a GitHub URL. */
  url?: string | null;
  /** An optional date that indicates when the release went live.  If not provided the current time is used. */
  dateReleased?: string | null;
  /** An optional list of commit data to be associated. */
  commits?: ({ id: string; repository?: string | null; message?: string | null; author_name?: string | null; author_email?: string | null; timestamp?: string | null; patch_set?: ({ path: string; type: string })[] | null })[];
  /** An optional way to indicate the start and end commits for each repository included in a release. Head commits must include parameters ``repository`` and ``commit`` (the HEAD SHA). For GitLab repositories, please use the Group name instead of the slug. They can optionally include ``previousCommit`` (the SHA of the HEAD of the previous release), which should be specified if this is the first time you've sent commit data. */
  refs?: ({ commit: string; repository: string; previousCommit?: string | null })[];
};

export type OrganizationSentryAppDetailsResponse = ({ allowedOrigins: (string)[]; avatars: ({ avatarType: string; avatarUuid: string; avatarUrl: string; color: boolean; photoType: string })[]; events: (string)[]; featureData: (string)[]; isAlertable: boolean; metadata: string; name: string; schema: string; scopes: (string)[]; slug: string; status: string; uuid: string; verifyInstall: boolean; isDisabled?: boolean; author?: string | null; overview?: string | null; popularity?: number | null; redirectUrl?: string | null; webhookUrl?: string | null; clientSecret?: string | null; datePublished?: string; clientId?: string; owner?: { id: number; slug: string } })[];

export type OrganizationStatsSummaryResponse = {
  start: string;
  end: string;
  projects: ({ id: string; slug: string; stats: ({ [key: string]: unknown | undefined })[] })[];
};

export type OrganizationSummary = {
  features?: (string)[];
  extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined };
  access?: (string)[];
  onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[];
  id: string;
  slug: string;
  status: { id: string; name: string };
  name: string;
  dateCreated: string;
  isEarlyAdopter: boolean;
  require2FA: boolean;
  avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null };
  links: { organizationUrl: string; regionUrl: string };
  hasAuthProvider: boolean;
  allowMemberInvite: boolean;
  allowMemberProjectCreation: boolean;
  allowSuperuserAccess: boolean;
};

export type OrganizationWithProjectsAndTeams = {
  features?: (string)[];
  extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined };
  access?: (string)[];
  onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[];
  id: string;
  slug: string;
  status: { id: string; name: string };
  name: string;
  dateCreated: string;
  isEarlyAdopter: boolean;
  require2FA: boolean;
  avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null };
  links: { organizationUrl: string; regionUrl: string };
  hasAuthProvider: boolean;
  allowMemberInvite: boolean;
  allowMemberProjectCreation: boolean;
  allowSuperuserAccess: boolean;
  role?: unknown;
  orgRole?: string;
  targetSampleRate?: number;
  samplingMode?: string;
  planSampleRate?: number;
  desiredSampleRate?: number;
  experiments: { [key: string]: string | undefined };
  isDefault: boolean;
  defaultRole: string;
  orgRoleList: ({ id: string; name: string; desc: string; scopes: (string)[]; allowed: boolean; isAllowed: boolean; isRetired: boolean; isTeamRolesAllowed: boolean; is_global: boolean; isGlobal: boolean; minimumTeamRole: string })[];
  teamRoleList: ({ id: string; name: string; desc: string; scopes: (string)[]; allowed: boolean; isAllowed: boolean; isRetired: boolean; isTeamRolesAllowed: boolean; isMinimumRoleFor: string | null })[];
  openMembership: boolean;
  allowSharedIssues: boolean;
  enhancedPrivacy: boolean;
  dataScrubber: boolean;
  dataScrubberDefaults: boolean;
  sensitiveFields: (string)[];
  safeFields: (string)[];
  storeCrashReports: number;
  attachmentsRole: string;
  debugFilesRole: string;
  eventsMemberAdmin: boolean;
  alertsMemberWrite: boolean;
  scrubIPAddresses: boolean;
  scrapeJavaScript: boolean;
  allowJoinRequests: boolean;
  relayPiiConfig: string | null;
  trustedRelays: ({ name?: string; description?: string; publicKey?: string; created?: string; lastModified?: string })[];
  pendingAccessRequests: number;
  codecovAccess: boolean;
  hideAiFeatures: boolean;
  aggregatedDataConsent: boolean;
  isDynamicallySampled: boolean;
  issueAlertsThreadFlag: boolean;
  metricAlertsThreadFlag: boolean;
  requiresSso: boolean;
  defaultAutofixAutomationTuning: string;
  defaultSeerScannerAutomation: boolean;
  enableSeerCoding: boolean;
  defaultCodingAgent: string;
  defaultCodingAgentIntegrationId: string | null;
  defaultAutomatedRunStoppingPoint: string;
  autoEnableCodeReview: boolean;
  autoOpenPrs: boolean;
  defaultCodeReviewTriggers: (string)[];
  teams: ({ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; externalTeams?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; organization?: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean }; projects?: ({ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string })[] })[];
  projects: ({ latestDeploys?: { [key: string]: { [key: string]: string | undefined } | undefined } | null; options?: { [key: string]: unknown | undefined }; stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; team: { id: string; name: string; slug: string } | null; teams: ({ id: string; name: string; slug: string })[]; platforms: (string)[]; hasUserReports: boolean; environments: (string)[]; latestRelease: { version: string } | null })[];
};

export type OutcomesResponse = {
  start: string;
  end: string;
  intervals: (string)[];
  groups: ({ by: { [key: string]: unknown | undefined }; totals: { [key: string]: unknown | undefined }; series: { [key: string]: unknown | undefined } })[];
};

export type OutgoingNotificationAction = { [key: string]: unknown | undefined };

/** Serializer for pagination information */
export type PageInfo = {
  endCursor: string | null;
  startCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type ProjectAdmin = {
  /** Enables starring the project within the projects tab. Can be updated with **`project:read`** permission. */
  isBookmarked?: boolean;
  /** The name for the project */
  name?: string;
  /** Uniquely identifies a project and is used for the interface. */
  slug?: string;
  /** The platform for the project */
  platform?: string | null;
  /** Custom prefix for emails from this project. */
  subjectPrefix?: string;
  /** The email subject to use (excluding the prefix) for individual alerts. Here are the list of variables you can use: - `$title` - `$shortID` - `$projectID` - `$orgID` - `${tag:key}` - such as `${tag:environment}` or `${tag:release}`. */
  subjectTemplate?: string;
  /** Automatically resolve an issue if it hasn't been seen for this many hours. Set to `0` to disable auto-resolve. */
  resolveAge?: number | null;
  /** A JSON mapping of context types to lists of strings for their keys. E.g. `{'user': ['id', 'email']}` */
  highlightContext?: { [key: string]: unknown | undefined };
  /** A list of strings with tag keys to highlight on this project's issues. E.g. `['release', 'environment']` */
  highlightTags?: (string)[];
  /** Enable on-demand source context fetching from SCM integrations for stack traces. */
  scmSourceContextEnabled?: boolean;
};

export type ProjectEventDetailsResponse = {
  id: string;
  groupID: string | null;
  eventID: string;
  projectID: string;
  message: string | null;
  title: string;
  location: string | null;
  user: { id?: string | null; email?: string | null; username?: string | null; ip_address?: string | null; name?: string | null; geo?: { [key: string]: string | undefined } | null; data?: { [key: string]: unknown | undefined } | null } | null;
  tags: ({ query?: string; key: string; value: string })[];
  platform: string;
  dateReceived: string | null;
  contexts: { [key: string]: unknown | undefined } | null;
  size: number | null;
  entries: (unknown)[];
  dist: string | null;
  sdk: { [key: string]: string | undefined };
  context: { [key: string]: unknown | undefined } | null;
  packages: { [key: string]: unknown | undefined };
  type: string;
  metadata: unknown;
  errors: (unknown)[];
  occurrence: unknown;
  _meta: { [key: string]: unknown | undefined };
  crashFile?: string | null;
  culprit?: string | null;
  dateCreated?: string;
  fingerprints?: (string)[];
  groupingConfig?: unknown;
  startTimestamp?: string;
  endTimestamp?: string;
  measurements?: unknown;
  breakdowns?: unknown;
  release: { id?: number; commitCount?: number; data?: { [key: string]: unknown | undefined }; dateCreated?: string; dateReleased?: string | null; deployCount?: number; ref?: string | null; lastCommit?: { [key: string]: unknown | undefined } | null; lastDeploy?: { dateStarted?: string | null; url?: string | null; id: string; environment: string; dateFinished: string; name: string } | null; status?: string; url?: string | null; userAgent?: string | null; version?: string | null; versionInfo?: { description?: string; package: string | null; version: { [key: string]: unknown | undefined }; buildHash: string | null } | null } | null;
  userReport: { id: string; eventID: string; name: string | null; email: string | null; comments: string; dateCreated: string; user: { id: string; username: string | null; email: string | null; name: string | null; ipAddress: string | null; avatarUrl: string | null } | null; event: { id: string; eventID: string } } | null;
  sdkUpdates: ({ [key: string]: unknown | undefined })[];
  resolvedWith: (string)[];
  nextEventID: string | null;
  previousEventID: string | null;
};

export type ProjectEventsResponseDict = ({ id: string; "event.type": string; groupID: string | null; eventID: string; projectID: string; message: string; title: string; location: string | null; culprit: string | null; user: { id?: string | null; email?: string | null; username?: string | null; ip_address?: string | null; name?: string | null; geo?: { [key: string]: string | undefined } | null; data?: { [key: string]: unknown | undefined } | null } | null; tags: ({ query?: string; key: string; value: string })[]; platform: string | null; dateCreated: string; crashFile: string | null; metadata: { [key: string]: unknown | undefined } | null })[];

export type ProjectFilterResponse = ({ id: string; active: boolean | (string)[] })[];

/** This represents a Sentry Project Client Key. */
export type ProjectKey = {
  id: string;
  name: string;
  label: string;
  public: string | null;
  secret: string | null;
  projectId: number;
  isActive: boolean;
  rateLimit: { window: number; count: number } | null;
  dsn: { secret: string; public: string; csp: string; security: string; minidump: string; nel: string; unreal: string; crons: string; cdn: string; playstation: string; integration: string; otlp_traces: string; otlp_logs: string };
  browserSdkVersion: string;
  browserSdk: { choices: ((string)[])[] };
  dateCreated: string | null;
  dynamicSdkLoaderOptions: { hasReplay: boolean; hasPerformance: boolean; hasDebug: boolean; hasFeedback: boolean; hasLogsAndMetrics: boolean };
  useCase?: string;
};

export type ProjectKeyPost = {
  /** The optional name of the key. If not provided it will be automatically generated. */
  name?: string | null;
  /** Applies a rate limit to cap the number of errors accepted during a given time window. To disable entirely set `rateLimit` to null. ```json {     "rateLimit": {         "window": 7200, // time in seconds         "count": 1000 // error cap     } } ``` */
  rateLimit?: { count?: number | null; window?: number | null };
  /** * `user` * `profiling` * `tempest` * `demo` */
  useCase?: "user" | "profiling" | "tempest" | "demo";
};

export type ProjectOwnership = {
  schema?: { $version: number; rules: ({ matcher: { type: string; pattern: string }; owners: ({ type: string; name: string; id?: string })[] })[] } | null;
  raw: string;
  fallthrough: boolean;
  dateCreated: string;
  lastUpdated: string;
  isActive: boolean;
  autoAssignment: string;
  codeownersAutoSync: boolean;
};

export type ProjectOwnershipRequest = {
  /** Raw input for ownership configuration. See the [Ownership Rules Documentation](/product/issues/ownership-rules/) to learn more. */
  raw?: string;
  /** A boolean determining who to assign ownership to when an ownership rule has no match. If set to `True`, all project members are made owners. Otherwise, no owners are set. */
  fallthrough?: boolean;
  /** Auto-assignment settings. The available options are: - Auto Assign to Issue Owner - Auto Assign to Suspect Commits - Turn off Auto-Assignment */
  autoAssignment?: string;
  /** Set to `True` to sync issue owners with CODEOWNERS updates in a release. */
  codeownersAutoSync?: boolean;
};

export type ProjectPost = {
  /** The name for the project. */
  name: string;
  /** Uniquely identifies a project and is used for the interface.         If not provided, it is automatically generated from the name. */
  slug?: string | null;
  /** The platform for the project. */
  platform?: string | null;
  /**  Defaults to true where the behavior is to alert the user on every new issue. Setting this to false will turn this off and the user must create their own alerts to be notified of new issues.          */
  default_rules?: boolean;
};

export type ProjectRepoLinkRequest = {
  /** The ID of the repository to link. */
  repositoryId: number;
};

export type ProjectRepoLinkResponse = {
  id: string;
  projectId: string;
  repositoryId: string;
  source: string;
  created: boolean;
};

export type ProjectSizeStatusCheckRulesResponse = {
  enabled: boolean;
  rules: ({ id: string; metric: "install_size" | "download_size"; measurement: "absolute" | "absolute_diff" | "relative_diff"; value: string; filterQuery: string; filters: ({ key: "app_id" | "build_configuration_name" | "git_head_ref" | "platform_name"; conditions: ({ operator: "contains" | "endsWith" | "equals" | "in" | "matches" | "notContains" | "notEndsWith" | "notEquals" | "notIn" | "notMatches" | "notStartsWith" | "startsWith"; values: (string)[] })[] })[] | null; artifactType: "main_artifact" | "watch_artifact" | "android_dynamic_feature_artifact" | "app_clip_artifact" | "all_artifacts" })[];
};

export type ProjectSnapshotStatusCheckRulesResponse = {
  enabled: boolean;
  rules: { failOnAdded: boolean; failOnRemoved: boolean; failOnChanged: boolean; failOnRenamed: boolean };
};

export type ProjectSummary = {
  latestDeploys?: { [key: string]: { [key: string]: string | undefined } | undefined } | null;
  options?: { [key: string]: unknown | undefined };
  stats?: unknown;
  transactionStats?: unknown;
  sessionStats?: unknown;
  id: string;
  slug: string;
  name: string;
  platform: string | null;
  dateCreated: string;
  isBookmarked: boolean;
  isMember: boolean;
  features: (string)[];
  firstEvent: string | null;
  firstTransactionEvent: boolean;
  access: (string)[];
  hasAccess: boolean;
  hasFeedbacks: boolean;
  hasFlags: boolean;
  hasMinifiedStackTrace: boolean;
  hasMonitors: boolean;
  hasNewFeedbacks: boolean;
  hasProfiles: boolean;
  hasReplays: boolean;
  hasSessions: boolean;
  hasInsightsHttp: boolean;
  hasInsightsDb: boolean;
  hasInsightsAssets: boolean;
  hasInsightsAppStart: boolean;
  hasInsightsScreenLoad: boolean;
  hasInsightsVitals: boolean;
  hasInsightsCaches: boolean;
  hasInsightsQueues: boolean;
  hasInsightsAgentMonitoring: boolean;
  hasInsightsMCP: boolean;
  hasLogs: boolean;
  hasTraceMetrics: boolean;
  team: { id: string; name: string; slug: string } | null;
  teams: ({ id: string; name: string; slug: string })[];
  platforms: (string)[];
  hasUserReports: boolean;
  environments: (string)[];
  latestRelease: { version: string } | null;
};

export type ProjectTeamsResponse = ({ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null } })[];

export type ProjectWithTeam = {
  stats?: unknown;
  transactionStats?: unknown;
  sessionStats?: unknown;
  id: string;
  slug: string;
  name: string;
  platform: string | null;
  dateCreated: string;
  isBookmarked: boolean;
  isMember: boolean;
  features: (string)[];
  firstEvent: string | null;
  firstTransactionEvent: boolean;
  access: (string)[];
  hasAccess: boolean;
  hasFeedbacks: boolean;
  hasFlags: boolean;
  hasMinifiedStackTrace: boolean;
  hasMonitors: boolean;
  hasNewFeedbacks: boolean;
  hasProfiles: boolean;
  hasReplays: boolean;
  hasSessions: boolean;
  hasInsightsHttp: boolean;
  hasInsightsDb: boolean;
  hasInsightsAssets: boolean;
  hasInsightsAppStart: boolean;
  hasInsightsScreenLoad: boolean;
  hasInsightsVitals: boolean;
  hasInsightsCaches: boolean;
  hasInsightsQueues: boolean;
  hasInsightsAgentMonitoring: boolean;
  hasInsightsMCP: boolean;
  hasLogs: boolean;
  hasTraceMetrics: boolean;
  isInternal: boolean;
  isPublic: boolean;
  avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null };
  color: string;
  status: string;
  team?: { id: string; name: string; slug: string };
  teams: ({ id: string; name: string; slug: string })[];
};

/** Applies a rate limit to cap the number of errors accepted during a given time window. To disable entirely set `rateLimit` to null. ```json {     "rateLimit": {         "window": 7200, // time in seconds         "count": 1000 // error cap     } } ``` */
export type RateLimit = {
  count?: number | null;
  window?: number | null;
};

export type ReleaseHeadCommit = {
  commit: string;
  repository: string;
  previousCommit?: string | null;
};

export type ReleaseThresholdStatusResponse = { [key: string]: ({ id?: string; date?: string; environment?: { [key: string]: unknown | undefined } | null; project?: { [key: string]: unknown | undefined }; release?: string; threshold_type?: number; trigger_type?: string; value?: number; window_in_seconds?: number; end: string; is_healthy: boolean; key: string; project_slug: string; project_id: number; start: string; metric_value: number | number | { [key: string]: unknown } | null })[] | undefined };

export type ReplayCounts = { [key: string]: number | undefined };

export type ReplayDeletionJobCreate = {
  data: { rangeStart: string; rangeEnd: string; environments: (string)[]; query: string | null };
};

export type ReplayDeletionJobCreateData = {
  rangeStart: string;
  rangeEnd: string;
  environments: (string)[];
  query: string | null;
};

/** Serializer for repositories response */
export type Repositories = {
  results: ({ name: string; updatedAt: string; latestCommitAt: string; defaultBranch: string })[];
  /** Serializer for pagination information */
  pageInfo: { endCursor: string | null; startCursor: string | null; hasPreviousPage: boolean; hasNextPage: boolean };
  totalCount: number;
};

/** Serializer for single repository response */
export type Repository = {
  uploadToken: string | null;
  testAnalyticsEnabled: boolean;
};

/** Serializer for individual repository nodes from GraphQL response */
export type RepositoryNode = {
  name: string;
  updatedAt: string;
  latestCommitAt: string;
  defaultBranch: string;
};

/** Serializer for individual repository nodes from GraphQL response */
export type RepositoryTokenNode = {
  name: string;
  token: string;
};

/** Serializer for repositories response */
export type RepositoryTokenRegenerate = {
  token: string;
};

/** Serializer for repository tokens response */
export type RepositoryTokens = {
  results: ({ name: string; token: string })[];
  /** Serializer for pagination information */
  pageInfo: { endCursor: string | null; startCursor: string | null; hasPreviousPage: boolean; hasNextPage: boolean };
  totalCount: number;
};

export type ScimListResponseEnvelopeScimMemberIndexResponse = {
  schemas: (string)[];
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  Resources: ({ active?: boolean; schemas: (string)[]; id: string; userName: string; name: { givenName: string; familyName: string }; emails: ({ primary: boolean; value: string; type: string })[]; meta: { resourceType: string }; sentryOrgRole: string })[];
};

export type ScimListResponseEnvelopeScimTeamIndexResponse = {
  schemas: (string)[];
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  Resources: ({ schemas: (string)[]; id: string; displayName: string; meta: { resourceType: string }; members?: ({ value: string; display: string })[] })[];
};

export type ScimMemberProvision = {
  /** The SAML field used for email. */
  userName: string;
  /** The organization role of the member. If unspecified, this will be                     set to the organization's default role. The options are:  * `billing` - Can manage payment and compliance details. * `member` - Can view and act on events, as well as view most other data within the organization. * `manager` - Has full management access to all teams and projects. Can also manage         the organization's membership. * `admin` - Can edit global integrations, manage projects, and add/remove teams.         They automatically assume the Team Admin role for teams they join.         Note: This role can no longer be assigned in Business and Enterprise plans. Use `TeamRoles` instead.          */
  sentryOrgRole?: "billing" | "member" | "manager" | "admin";
};

export type ScimPatchOperation = {
  op: string;
  value: unknown;
  path?: string;
};

export type ScimPatchRequest = {
  /** A list of operations to perform. Currently, the only valid operation is setting a member's `active` attribute to false, after which the member will be permanently deleted. ```json {     "Operations": [{         "op": "replace",         "path": "active",         "value": False     }] } ```  */
  Operations: ({ op: string; value: unknown; path?: string })[];
};

export type ScimTeamPatchOperation = {
  op: string;
  value?: { [key: string]: unknown | undefined };
  path?: string;
};

export type ScimTeamPatchRequest = {
  /** The list of operations to perform. Valid operations are: * Renaming a team: ```json {     "Operations": [{         "op": "replace",         "value": {             "id": 23,             "displayName": "newName"         }     }] } ``` * Adding a member to a team: ```json {     "Operations": [{         "op": "add",         "path": "members",         "value": [             {                 "value": 23,                 "display": "testexample@example.com"             }         ]     }] } ``` * Removing a member from a team: ```json {     "Operations": [{         "op": "remove",         "path": "members[value eq "23"]"     }] } ``` * Replacing an entire member set of a team: ```json {     "Operations": [{         "op": "replace",         "path": "members",         "value": [             {                 "value": 23,                 "display": "testexample2@sentry.io"             },             {                 "value": 24,                 "display": "testexample3@sentry.io"             }         ]     }] } ```  */
  Operations: ({ op: string; value?: { [key: string]: unknown | undefined }; path?: string })[];
};

export type ScimTeamRequestBody = {
  /** The slug of the team that is shown in the UI. */
  displayName: string;
};

/** Response containing list of actively used LLM model names from Seer. */
export type SeerModelsResponse = {
  models: (string)[];
};

export type SentryAppDetailsResponse = {
  allowedOrigins: (string)[];
  avatars: ({ avatarType: string; avatarUuid: string; avatarUrl: string; color: boolean; photoType: string })[];
  events: (string)[];
  featureData: (string)[];
  isAlertable: boolean;
  metadata: string;
  name: string;
  schema: string;
  scopes: (string)[];
  slug: string;
  status: string;
  uuid: string;
  verifyInstall: boolean;
  isDisabled?: boolean;
  author?: string | null;
  overview?: string | null;
  popularity?: number | null;
  redirectUrl?: string | null;
  webhookUrl?: string | null;
  clientSecret?: string | null;
  datePublished?: string;
  clientId?: string;
  owner?: { id: number; slug: string };
};

export type SentryAppParser = {
  /** The name of the custom integration. */
  name: string;
  /** The custom integration's permission scopes for API access. */
  scopes: (string)[] | null;
  /** The custom integration's author. */
  author?: string | null;
  /** Webhook events the custom integration is subscribed to. */
  events?: (string)[] | null;
  /** The UI components schema, used to render the custom integration's configuration UI elements. See our [schema docs](https://docs.sentry.io/organization/integrations/integration-platform/ui-components/) for more information. */
  schema?: { [key: string]: unknown | undefined } | null;
  /** The webhook destination URL. */
  webhookUrl?: string | null;
  /** The post-installation redirect URL. */
  redirectUrl?: string | null;
  /** Whether or not the integration is internal only. False means the integration is public. */
  isInternal?: boolean;
  /** Marks whether or not the custom integration can be used in an alert rule. */
  isAlertable?: boolean;
  /** The custom integration's description. */
  overview?: string | null;
  /** Whether or not an installation of the custom integration should be verified. */
  verifyInstall?: boolean;
  /** The list of allowed origins for CORS. */
  allowedOrigins?: (string)[];
};

export type SessionsQueryResult = {
  start: string;
  end: string;
  intervals: (string)[];
  groups: ({ by: { project?: number; release?: string; environment?: string; "session.status"?: string }; series: { [key: string]: (number | null)[] | undefined }; totals: { [key: string]: number | null | undefined } })[];
  query: string;
};

export type ShortIdLookupResponse = {
  organizationSlug: string;
  projectSlug: string;
  groupId: string;
  group: { isUnhandled?: boolean; count?: string; userCount?: number; firstSeen?: string | null; lastSeen?: string | null; id: string; shareId: string | null; shortId: string; title: string; culprit: string | null; permalink: string; logger: string | null; level: string; status: string; statusDetails: { autoResolved?: boolean; ignoreCount?: number; ignoreUntil?: string; ignoreUserCount?: number; ignoreUserWindow?: number; ignoreWindow?: number; actor?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; inNextRelease?: boolean; inRelease?: string; inCommit?: string; pendingEvents?: number; info?: unknown }; substatus: string | null; isPublic: boolean; platform: string | null; priority: string | null; priorityLockedAt: string | null; seerFixabilityScore: number | null; seerAutofixLastTriggered: string | null; seerExplorerAutofixLastTriggered: string | null; project: { id: string; name: string; slug: string; platform: string | null }; type: string; issueType: string; issueCategory: string; metadata: { [key: string]: unknown | undefined }; numComments: number; assignedTo: { type: "user" | "team"; id: string; name: string; email?: string } | null; isBookmarked: boolean; isSubscribed: boolean; subscriptionDetails: { disabled?: boolean; reason?: string } | null; hasSeen: boolean; annotations: ({ displayName: string; url: string })[] };
  shortId: string;
};

export type SizeAnalysisResponse = {
  buildId: string;
  state: string;
  appInfo: { appId: string | null; name: string | null; version: string | null; buildNumber: number | null; artifactType: string | null; dateAdded: string | null; dateBuilt: string | null };
  gitInfo: { headSha: string | null; baseSha: string | null; provider: string | null; headRepoName: string | null; baseRepoName: string | null; headRef: string | null; baseRef: string | null; prNumber: number | null } | null;
  errorCode: string | null;
  errorMessage: string | null;
  downloadSize: number | null;
  installSize: number | null;
  analysisDuration: number | null;
  analysisVersion: string | null;
  baseBuildId: string | null;
  baseAppInfo: { appId: string | null; name: string | null; version: string | null; buildNumber: number | null; artifactType: string | null; dateAdded: string | null; dateBuilt: string | null } | null;
  insights: { [key: string]: unknown | undefined } | null;
  appComponents: ({ componentType: string; name: string; appId: string; path: string; downloadSize: number; installSize: number })[] | null;
  comparisons: ({ metricsArtifactType: string; identifier: string | null; state: string; errorCode: string | null; errorMessage: string | null; sizeMetricDiff: { metricsArtifactType: string; identifier: string | null; headInstallSize: number; headDownloadSize: number; baseInstallSize: number; baseDownloadSize: number } | null; diffItems: ({ sizeDiff: number; headSize: number | null; baseSize: number | null; path: string; itemType: string | null; type: string; diffItems: (unknown)[] | null })[] | null; insightDiffItems: ({ insightType: string; status: string; totalSavingsChange: number; fileDiffs: ({ sizeDiff: number; headSize: number | null; baseSize: number | null; path: string; itemType: string | null; type: string; diffItems: (unknown)[] | null })[]; groupDiffs: ({ sizeDiff: number; headSize: number | null; baseSize: number | null; path: string; itemType: string | null; type: string; diffItems: (unknown)[] | null })[] })[] | null })[] | null;
};

export type SnapshotCreateResponse = {
  artifactId: string;
  snapshotMetricsId: string;
  imageCount: number;
  snapshotUrl: string;
};

export type SnapshotDetailsResponse = {
  head_artifact_id?: string;
  base_artifact_id?: string | null;
  project_id?: string;
  comparison_type?: string;
  state?: string;
  vcs_info?: { head_sha?: string | null; base_sha?: string | null; provider?: string | null; head_repo_name?: string | null; base_repo_name?: string | null; head_ref?: string | null; base_ref?: string | null; pr_number?: number | null };
  app_id?: string | null;
  is_selective?: boolean;
  images?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number })[];
  image_count?: number;
  added?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number })[];
  added_count?: number;
  removed?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number })[];
  removed_count?: number;
  renamed?: ({ base_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; head_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; diff_image_key?: string | null; diff?: number | null })[];
  renamed_count?: number;
  changed?: ({ base_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; head_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; diff_image_key?: string | null; diff?: number | null })[];
  changed_count?: number;
  unchanged?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number })[];
  unchanged_count?: number;
  errored?: ({ base_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; head_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; diff_image_key?: string | null; diff?: number | null })[];
  errored_count?: number;
  skipped?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number })[];
  skipped_count?: number;
  diff_threshold?: number | null;
  comparison_state?: string | null;
  approval_status?: string | null;
  comparison_error_message?: string | null;
  approvers?: ({ id?: string | null; name?: string | null; email?: string | null; username?: string | null; avatar_url?: string | null; approved_at?: string | null; source?: "sentry" | "github" })[];
};

export type SnapshotImageDetailResponse = {
  image_file_name?: string;
  comparison_status?: string | null;
  head_image?: { content_hash?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number; diff_threshold?: number | null; description?: string | null; tags?: { [key: string]: string | undefined } | null; image_url?: string } | null;
  base_image?: { content_hash?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number; diff_threshold?: number | null; description?: string | null; tags?: { [key: string]: string | undefined } | null; image_url?: string } | null;
  diff_image_url?: string | null;
  diff_percentage?: number | null;
  previous_image_file_name?: string | null;
};

export type Source = {
  /** The type of the source.  * `http` - SymbolServer (HTTP) * `gcs` - Google Cloud Storage * `s3` - Amazon S3 */
  type: "http" | "gcs" | "s3";
  /** The human-readable name of the source. */
  name: string;
  /** The internal ID of the source. Must be distinct from all other source IDs and cannot start with '`sentry:`'. If this is not provided, a new UUID will be generated. */
  id?: string;
  /** Layout settings for the source. This is required for HTTP, GCS, and S3 sources.  **`type`** ***(string)*** - The layout of the folder structure. The options are: - `native` - Platform-Specific (SymStore / GDB / LLVM) - `symstore` - Microsoft SymStore - `symstore_index2` - Microsoft SymStore (with index2.txt) - `ssqp` - Microsoft SSQP - `unified` - Unified Symbol Server Layout - `debuginfod` - debuginfod  **`casing`** ***(string)*** - The layout of the folder structure. The options are: - `default` - Default (mixed case) - `uppercase` - Uppercase - `lowercase` - Lowercase  ```json {     "layout": {         "type": "native"         "casing": "default"     } } ``` */
  layout?: { type: "native" | "symstore" | "symstore_index2" | "ssqp" | "unified" | "debuginfod" | "slashsymbols"; casing: "lowercase" | "uppercase" | "default" };
  /** Filter settings for the source. This is optional for all sources.  **`filetypes`** ***(list)*** - A list of file types that can be found on this source. If this is left empty, all file types will be enabled. The options are: - `pe` - Windows executable files - `pdb` - Windows debug files - `portablepdb` - .NET portable debug files - `mach_code` - MacOS executable files - `mach_debug` - MacOS debug files - `elf_code` - ELF executable files - `elf_debug` - ELF debug files - `wasm_code` - WASM executable files - `wasm_debug` - WASM debug files - `breakpad` - Breakpad symbol files - `sourcebundle` - Source code bundles - `uuidmap` - Apple UUID mapping files - `bcsymbolmap` - Apple bitcode symbol maps - `il2cpp` - Unity IL2CPP mapping files - `proguard` - ProGuard mapping files  **`path_patterns`** ***(list)*** - A list of glob patterns to check against the debug and code file paths of debug files. Only files that match one of these patterns will be requested from the source. If this is left empty, no path-based filtering takes place.  **`requires_checksum`** ***(boolean)*** - Whether this source requires a debug checksum to be sent with each request. Defaults to `false`.  ```json {     "filters": {         "filetypes": ["pe", "pdb", "portablepdb"],         "path_patterns": ["*ffmpeg*"]     } } ``` */
  filters?: { filetypes?: ("pe" | "pdb" | "portablepdb" | "mach_debug" | "mach_code" | "elf_debug" | "elf_code" | "wasm_debug" | "wasm_code" | "breakpad" | "sourcebundle" | "uuidmap" | "bcsymbolmap" | "il2cpp" | "proguard" | "dartsymbolmap")[]; path_patterns?: (string)[]; requires_checksum?: boolean };
  /** The source's URL. Optional for HTTP sources, invalid for all others. */
  url?: string;
  /** The user name for accessing the source. Optional for HTTP sources, invalid for all others. */
  username?: string;
  /** The password for accessing the source. Optional for HTTP sources, invalid for all others. */
  password?: string;
  /** The GCS or S3 bucket where the source resides. Required for GCS and S3 source, invalid for HTTP sources. */
  bucket?: string;
  /** The source's [S3 region](https://docs.aws.amazon.com/general/latest/gr/s3.html). Required for S3 sources, invalid for all others.  * `us-east-2` - US East (Ohio) * `us-east-1` - US East (N. Virginia) * `us-west-1` - US West (N. California) * `us-west-2` - US West (Oregon) * `ap-east-1` - Asia Pacific (Hong Kong) * `ap-south-1` - Asia Pacific (Mumbai) * `ap-northeast-2` - Asia Pacific (Seoul) * `ap-southeast-1` - Asia Pacific (Singapore) * `ap-southeast-2` - Asia Pacific (Sydney) * `ap-northeast-1` - Asia Pacific (Tokyo) * `ca-central-1` - Canada (Central) * `cn-north-1` - China (Beijing) * `cn-northwest-1` - China (Ningxia) * `eu-central-1` - EU (Frankfurt) * `eu-west-1` - EU (Ireland) * `eu-west-2` - EU (London) * `eu-west-3` - EU (Paris) * `eu-north-1` - EU (Stockholm) * `sa-east-1` - South America (São Paulo) * `us-gov-east-1` - AWS GovCloud (US-East) * `us-gov-west-1` - AWS GovCloud (US) */
  region?: "us-east-2" | "us-east-1" | "us-west-1" | "us-west-2" | "ap-east-1" | "ap-south-1" | "ap-northeast-2" | "ap-southeast-1" | "ap-southeast-2" | "ap-northeast-1" | "ca-central-1" | "cn-north-1" | "cn-northwest-1" | "eu-central-1" | "eu-west-1" | "eu-west-2" | "eu-west-3" | "eu-north-1" | "sa-east-1" | "us-gov-east-1" | "us-gov-west-1";
  /** The [AWS Access Key](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html#access-keys-and-secret-access-keys).Required for S3 sources, invalid for all others. */
  access_key?: string;
  /** The [AWS Secret Access Key](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html#access-keys-and-secret-access-keys).Required for S3 sources, invalid for all others. */
  secret_key?: string;
  /** The GCS or [S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-prefixes.html) prefix. Optional for GCS and S3 sourcse, invalid for HTTP. */
  prefix?: string;
  /** The GCS email address for authentication. Required for GCS sources, invalid for all others. */
  client_email?: string;
  /** The GCS private key. Required for GCS sources if not using impersonated tokens. Invalid for all others. */
  private_key?: string;
};

export type SourceMapDebug = {
  errors: ({ type: string; message: string; data: { [key: string]: unknown | undefined } | null })[];
};

export type StatusDetailsValidator = {
  /** If true, marks the issue as resolved in the next release. */
  inNextRelease: boolean;
  /** The version of the release that the issue should be resolved in.If set to `latest`, the latest release will be used. */
  inRelease: string;
  /** The commit data that the issue should use for resolution. */
  inCommit?: { commit: string; repository: string };
  /** Ignore the issue until for this many minutes. */
  ignoreDuration: number;
  /** Ignore the issue until it has occurred this many times in `ignoreWindow` minutes. */
  ignoreCount: number;
  /** Ignore the issue until it has occurred `ignoreCount` times in this many minutes. (Max: 1 week) */
  ignoreWindow: number;
  /** Ignore the issue until it has affected this many users in `ignoreUserWindow` minutes. */
  ignoreUserCount: number;
  /** Ignore the issue until it has affected `ignoreUserCount` users in this many minutes. (Max: 1 week) */
  ignoreUserWindow: number;
};

/** Serializer for a sync repository response */
export type SyncRepos = {
  isSyncing: boolean;
};

export type TagKeyDetailsDict = {
  uniqueValues?: number | null;
  totalValues?: number | null;
  topValues?: ({ query?: string | null; key: string; name: string; value: string | null; count: number | null; lastSeen: string | null; firstSeen: string | null })[] | null;
  key: string;
  name: string;
};

export type TagKeyValuesDict = ({ query?: string | null; key: string; name: string; value: string | null; count: number | null; lastSeen: string | null; firstSeen: string | null })[];

export type Team = {
  id: string;
  slug: string;
  name: string;
  dateCreated: string | null;
  isMember: boolean;
  teamRole: string | null;
  flags: { [key: string]: unknown | undefined };
  access: (string)[];
  hasAccess: boolean;
  isPending: boolean;
  memberCount: number;
  avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null };
  externalTeams?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[];
  organization?: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean };
  projects?: ({ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string })[];
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type TeamDetails = {
  /** Uniquely identifies a team. This is must be available. */
  slug: string;
};

export type TeamPost = {
  /** Uniquely identifies a team and is used for the interface. If not         provided, it is automatically generated from the name. */
  slug?: string | null;
  /** **`[DEPRECATED]`** The name for the team. If not provided, it is         automatically generated from the slug */
  name?: string | null;
};

export type TeamScim = {
  schemas: (string)[];
  id: string;
  displayName: string;
  meta: { resourceType: string };
  members?: ({ value: string; display: string })[];
};

/** Serializer for test results response including pagination metadata */
export type TestResult = {
  defaultBranch: string;
  results: ({ updatedAt: string; avgDuration: number; totalDuration: number; name: string; failureRate: number; flakeRate: number; totalFailCount: number; totalFlakyFailCount: number; totalSkipCount: number; totalPassCount: number; lastDuration: number })[];
  /** Serializer for pagination information */
  pageInfo: { endCursor: string | null; startCursor: string | null; hasPreviousPage: boolean; hasNextPage: boolean };
  totalCount: number;
};

/** Serializer for test results aggregates response */
export type TestResultAggregates = {
  totalDuration: number;
  totalDurationPercentChange: number;
  slowestTestsDuration: number;
  slowestTestsDurationPercentChange: number;
  totalSlowTests: number;
  totalSlowTestsPercentChange: number;
  totalFails: number;
  totalFailsPercentChange: number;
  totalSkips: number;
  totalSkipsPercentChange: number;
  flakeCount: number;
  flakeCountPercentChange: number;
  flakeRate: number;
  flakeRatePercentChange: number;
};

/** Serializer for individual test result nodes from GraphQL response */
export type TestResultNode = {
  updatedAt: string;
  avgDuration: number;
  totalDuration: number;
  name: string;
  failureRate: number;
  flakeRate: number;
  totalFailCount: number;
  totalFlakyFailCount: number;
  totalSkipCount: number;
  totalPassCount: number;
  lastDuration: number;
};

/** Serializer for test suites belonging to a repository's test results */
export type TestSuite = {
  testSuites: (string)[];
};

export type UpdateClientKey = {
  /** The name for the client key */
  name?: string;
  /** Activate or deactivate the client key. */
  isActive?: boolean;
  /** Applies a rate limit to cap the number of errors accepted during a given time window. To disable entirely set `rateLimit` to null. ```json {     "rateLimit": {         "window": 7200, // time in seconds         "count": 1000 // error cap     } } ``` */
  rateLimit?: { count?: number | null; window?: number | null };
  /** The Sentry Javascript SDK version to use. The currently supported options are:  * `latest` - Most recent version * `7.x` - Version 7 releases */
  browserSdkVersion?: "latest" | "7.x";
  /** Configures multiple options for the Javascript Loader Script. - `Performance Monitoring` - `Debug Bundles & Logging` - `Session Replay` - Note that the loader will load the ES6 bundle instead of the ES5 bundle. - `User Feedback` - Note that the loader will load the ES6 bundle instead of the ES5 bundle. - `Logs and Metrics` - Note that the loader will load the ES6 bundle instead of the ES5 bundle. Requires SDK >= 10.0.0. ```json {     "dynamicSdkLoaderOptions": {         "hasReplay": true,         "hasPerformance": true,         "hasDebug": true,         "hasFeedback": true,         "hasLogsAndMetrics": true     } } ``` */
  dynamicSdkLoaderOptions?: { hasReplay?: boolean; hasPerformance?: boolean; hasDebug?: boolean; hasFeedback?: boolean; hasLogsAndMetrics?: boolean };
};

export type UpdateOrgMemberRoles = {
  /** The organization role of the member. The options are:  * `billing` - Can manage payment and compliance details. * `member` - Can view and act on events, as well as view most other data within the organization. * `manager` - Has full management access to all teams and projects. Can also manage         the organization's membership. * `owner` - Has unrestricted access to the organization, its data, and its         settings. Can add, modify, and delete projects and members, as well as         make billing and plan changes. * `admin` - Can edit global integrations, manage projects, and add/remove teams.         They automatically assume the Team Admin role for teams they join.         Note: This role can no longer be assigned in Business and Enterprise plans. Use `TeamRoles` instead.          */
  orgRole?: "billing" | "member" | "manager" | "owner" | "admin";
  /**  Configures the team role of the member. The two roles are: - `contributor` - Can view and act on issues. Depending on organization settings, they can also add team members. - `admin` - Has full management access to their team's membership and projects. ```json {     "teamRoles": [         {             "teamSlug": "ancient-gabelers",             "role": "admin"         },         {             "teamSlug": "powerful-abolitionist",             "role": "contributor"         }     ] } ```  */
  teamRoles?: ({ [key: string]: unknown | undefined })[] | null;
};

/** Widget grid layout position and dimensions.  The dashboard uses a 6-column grid. Required keys: x, y, w, h, minH. Constraints: x (0-5), y (>= 0), w (1-6), h (>= 1), minH (>= 1), and x + w <= 6. */
export type WidgetLayout = {
  /** Column position (0-indexed). */
  x: number;
  /** Row position (0-indexed). */
  y: number;
  /** Width in grid columns (1-6). */
  w: number;
  /** Height in grid rows. */
  h: number;
  /** Minimum height in grid rows. */
  min_h: number;
};

export type Workflow = {
  id: string;
  name: string;
  organizationId: string;
  createdBy: string | null;
  dateCreated: string;
  dateUpdated: string;
  triggers: { id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] } | null;
  actionFilters: ({ id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] })[] | null;
  environment: string | null;
  config: { [key: string]: unknown | undefined };
  detectorIds: (string)[] | null;
  enabled: boolean;
  lastTriggered: string | null;
  owner: string | null;
};

/** Allows parameters to be defined in snake case, but passed as camel case.  Errors are output in camel case. */
export type WorkflowValidator = {
  /** The name of the alert */
  name: string;
  /** The ID of the existing alert */
  id?: string;
  /** Whether the alert is enabled or disabled */
  enabled?: boolean;
  /** The IDs of the monitors to connect this alert to. Use 'Fetch an Organization's Monitors' to find the IDs. */
  detector_ids?: (number)[];
  /**          Typically the frequency at which the alert will fire, in minutes.          - `0`: 0 minutes         - `5`: 5 minutes         - `10`: 10 minutes         - `30`: 30 minutes         - `60`: 1 hour         - `180`: 3 hours         - `720`: 12 hours         - `1440`: 24 hours          ```json             {                 "frequency":3600             }         ```          */
  config?: { [key: string]: unknown | undefined };
  /** The name of the environment for the alert to evaluate in */
  environment?: string | null;
  /** The conditions on which the alert will trigger. See available options below.         ```json             "triggers": {                 "organizationId": "1",                 "logicType": "any-short",                 "conditions": [                     {                         "type": "first_seen_event",                         "comparison": true,                         "conditionResult": true                     },                     {                         "type": "issue_resolved_trigger",                         "comparison": true,                         "conditionResult": true                     },                     {                         "type": "reappeared_event",                         "comparison": true,                         "conditionResult": true                     },                     {                         "type": "regression_event",                         "comparison": true,                         "conditionResult": true                     }                 ],                 "actions": []             }         ```          */
  triggers?: { id?: string; logic_type: "any" | "any-short" | "all" | "none"; conditions?: (unknown)[] };
  /** The filters to run before the action will fire and the action(s) to fire.          `logicType` can be one of `any-short`, `all`, or `none`.          Below is a basic example. See below for all other options.          ```json             "actionFilters": [                 {                     "logicType": "any",                     "conditions": [                         {                             "type": "level",                             "comparison": {                                 "level": 50,                                 "match": "eq"                             },                             "conditionResult": true                         }                     ],                     "actions": [                         {                             "id": "123",                             "type": "email",                             "integrationId": null,                             "data": {},                             "config": {                                 "targetType": "user",                                 "targetDisplay": null,                                 "targetIdentifier": "56789"                             },                             "status": "active"                         }                     ]                 }             ]         ```          ## Conditions          **Issue Age**         - `time`: One of `minute`, `hour`, `day`, or `week`.         - `value`: A positive integer.         - `comparisonType`: One of `older` or `newer`.         ```json             {                 "type": "age_comparison",                 "comparison": {                     "time": "minute",                     "value": 10,                     "comparisonType": "older"                 },                 "conditionResult": true             }          ```          **Issue Assignment**         - `targetType`: Who the issue is assigned to             - `Unassigned`: Unassigned             - `Member`: Assigned to a user             - `Team`: Assigned to a team         - `targetIdentifier`: The ID of the user or team from the `targetType`. Enter "" if `targetType` is `Unassigned`.         ```json             {                 "type": "assigned_to",                 "comparison": {                     "targetType": "Member",                     "targetIdentifier": 123456                 },                 "conditionResult": true             }         ```          **Issue Category**         - `value`: The issue category to filter to.             - `1`: Error issues             - `6`: Feedback issues             - `10`: Outage issues             - `11`: Metric issues             - `12`: DB Query issues             - `13`: HTTP Client issues             - `14`: Front end issues             - `15`: Mobile issues         ```json             {                 "type": "issue_category",                 "comparison": {                     "value": 1                 },                 "conditionResult": true             }         ```          **Issue Frequency**         - `value`: A positive integer representing how many times the issue has to happen before the alert will fire.         ```json             {                 "type": "issue_occurrences",                 "comparison": {                     "value": 10                 },                 "conditionResult": true             }         ```          **De-escalation**         ```json             {                 "type": "issue_priority_deescalating",                 "comparison": true,                 "conditionResult": true             }         ```          **Issue Priority**         - `comparison`: The priority the issue must be for the alert to fire.             - `75`: High priority             - `50`: Medium priority             - `25`: Low priority         ```json             {                 "type": "issue_priority_greater_or_equal",                 "comparison": 75,                 "conditionResult": true             }         ```          **Number of Users Affected**         - `value`: A positive integer representing the number of users that must be affected before the alert will fire.         - `filters`: A list of additional sub-filters to evaluate before the alert will fire.         - `interval`: The time period in which to evaluate the value. e.g. Number of users affected by an issue is more than `value` in `interval`.             - `1min`: 1 minute             - `5min`: 5 minutes             - `15min`: 15 minutes             - `1hr`: 1 hour             - `1d`: 1 day             - `1w`: 1 week             - `30d`: 30 days         ```json             {                 "type": "event_unique_user_frequency_count",                 "comparison": {                     "value": 100,                     "filters": [{"key": "foo", "match": "eq", "value": "bar"}],                     "interval": "1h"                 },                 "conditionResult": true             }         ```          **Number of Events**         - `value`: A positive integer representing the number of events in an issue that must come in before the alert will fire         - `interval`: The time period in which to evaluate the value. e.g. Number of events in an issue is more than `value` in `interval`.             - `1min`: 1 minute             - `5min`: 5 minutes             - `15min`: 15 minutes             - `1hr`: 1 hour             - `1d`: 1 day             - `1w`: 1 week             - `30d`: 30 days         ```json             {                 "type": "event_frequency_count",                 "comparison": {                     "value": 100,                     "interval": "1h"                 },                 "conditionResult": true             }         ```          **Percent of Events**         - `value`: A positive integer representing the number of events in an issue that must come in before the alert will fire         - `interval`: The time period in which to evaluate the value. e.g. Number of events in an issue is `comparisonInterval` percent higher `value` compared to `interval`.             - `1min`: 1 minute             - `5min`: 5 minutes             - `15min`: 15 minutes             - `1hr`: 1 hour             - `1d`: 1 day             - `1w`: 1 week             - `30d`: 30 days         - `comparisonInterval`: The time period to compare against. See `interval` for options.         ```json             {                 "type": "event_frequency_percent",                 "comparison": {                     "value": 100,                     "interval": "1h",                     "comparisonInterval": "1w"                 },                 "conditionResult": true             }          ```          **Percentage of Sessions Affected Count**         - `value`: A positive integer representing the number of events in an issue that must come in before the alert will fire         - `interval`: The time period in which to evaluate the value. e.g. Percentage of sessions affected by an issue is more than `value` in `interval`.             - `1min`: 1 minute             - `5min`: 5 minutes             - `15min`: 15 minutes             - `1hr`: 1 hour             - `1d`: 1 day             - `1w`: 1 week             - `30d`: 30 days         ```json             {                 "type": "percent_sessions_count",                 "comparison": {                     "value": 10,                     "interval": "1h"                 },                 "conditionResult": true             }         ```          **Percentage of Sessions Affected Percent**         - `value`: A positive integer representing the number of events in an issue that must come in before the alert will fire         - `interval`: The time period in which to evaluate the value. e.g. Percentage of sessions affected by an issue is `comparisonInterval` percent higher `value` compared to `interval`.             - `1min`: 1 minute             - `5min`: 5 minutes             - `15min`: 15 minutes             - `1hr`: 1 hour             - `1d`: 1 day             - `1w`: 1 week             - `30d`: 30 days         - `comparisonInterval`: The time period to compare against. See `interval` for options.         ```json             {                 "type": "percent_sessions_percent",                 "comparison": {                     "value": 10,                     "interval": "1h"                 },                 "conditionResult": true             }         ```          **Event Attribute**         The event's `attribute` value `match` `value`          - `attribute`: The event attribute to match on. Valid values are: `message`, `platform`, `environment`, `type`, `error.handled`, `error.unhandled`, `error.main_thread`, `exception.type`, `exception.value`, `user.id`, `user.email`, `user.username`, `user.ip_address`, `http.method`, `http.url`, `http.status_code`, `sdk.name`, `stacktrace.code`, `stacktrace.module`, `stacktrace.filename`, `stacktrace.abs_path`, `stacktrace.package`, `unreal.crash_type`, `app.in_foreground`.         - `match`: The comparison operator             - `co`: Contains             - `nc`: Does not contain             - `eq`: Equals             - `ne`: Does not equal             - `sw`: Starts with             - `ew`: Ends with             - `is`: Is set             - `ns`: Is not set         - `value`: A string. Not required when match is `is` or `ns`.          ```json             {                 "type": "event_attribute",                 "comparison": {                     "match": "co",                     "value": "bar",                     "attribute": "message"                 },                 "conditionResult": true             }         ```          **Tagged Event**         The event's tags `key` match `value`         - `key`: The tag value         - `match`: The comparison operator             - `co`: Contains             - `nc`: Does not contain             - `eq`: Equals             - `ne`: Does not equal             - `sw`: Starts with             - `ew`: Ends with             - `is`: Is set             - `ns`: Is not set         - `value`: A string. Not required when match is `is` or `ns`.          ```json             {                 "type": "tagged_event",                 "comparison": {                     "key": "level",                     "match": "eq",                     "value": "error"                 },                 "conditionResult": true             }         ```          **Latest Release**         The event is from the latest release          ```json             {                 "type": "latest_release",                 "comparison": true,                 "conditionResult": true             }         ```          **Release Age**         ```json             {                 "type": "latest_adopted_release",                 "comparison": {                     "environment": "12345",                     "ageComparison": "older",                     "releaseAgeType": "oldest"                 },                 "conditionResult": true             }         ```          **Event Level**         The event's level is `match` `level`         - `match`: The comparison operator             - `eq`: Equal             - `gte`: Greater than or equal             - `lte`: Less than or equal         - `level`: The event level             - `50`: Fatal             - `40`: Error             - `30`: Warning             - `20`: Info             - `10`: Debug             - `0`: Sample          ```json             {                 "type": "level",                 "comparison": {                     "level": 50,                     "match": "eq"                 },                 "conditionResult": true             }         ```          ## Actions         A list of actions that take place when all required conditions and filters for the alert are met. See below for a list of possible actions.           **Notify on Preferred Channel**         - `data`: A dictionary with the fallthrough type option when choosing to notify Suggested Assignees. Leave empty if notifying a user or team.             - `fallthroughType`                 - `ActiveMembers`                 - `AllMembers`                 - `NoOne`         - `config`: A dictionary with the configuration options for notification.             - `targetType`: The type of recipient to notify                 - `user`: User                 - `team`: Team                 - `issue_owners`: Suggested Assignees             - `targetDisplay`: null             - `targetIdentifier`: The id of the user or team to notify. Leave null for Suggested Assignees.          ```json             {                 "type":"email",                 "integrationId":null,                 "data":{},                 "config":{                     "targetType":"user",                     "targetDisplay":null,                     "targetIdentifier":"232692"                 },                 "status":"active"             },             {                 "type":"email",                 "integrationId":null,                 "data":{                     "fallthroughType":"ActiveMembers"                 },                 "config":{                     "targetType":"issue_owners",                     "targetDisplay":null,                     "targetIdentifier":""}                 ,                 "status":"active"             }         ```         **Notify on Slack**         - `targetDisplay`: The name of the channel to notify in.         `integrationId`: The stringified ID of the integration.          ```json             {                 "type":"slack",                 "config":{                     "targetType":"specific",                     "targetIdentifier":"",                     "targetDisplay":"notify-errors"                 },                 "integrationId":"1",                 "data":{},                 "status":"active"             }         ```          **Notify on PagerDuty**         - `targetDisplay`: The name of the service to create the ticket in.         - `integrationId`: The stringified ID of the integration.         - `data["priority"]`: The severity level for the notification.          ```json             {                 "type":"pagerduty",                 "config":{                     "targetType":"specific",                     "targetIdentifier":"123456",                     "targetDisplay":"Error Service"                     },                 "integrationId":"2345",                 "data":{                     "priority":"default"                 },                 "status":"active"             }         ```          **Notify on Discord**         - `targetDisplay`: The name of the service to create the ticket in.         - `integrationId`: The stringified ID of the integration.         - `data["tags"]`: Comma separated list of tags to add to the notification.          ```json             {                 "type":"discord",                 "config":{                     "targetType":"specific",                     "targetIdentifier":"12345",                     "targetDisplay":"",                     },                 "integrationId":"1234",                 "data":{                     "tags":"transaction,environment"                 },                 "status":"active"             }         ```          **Notify on MSTeams**         - `targetIdentifier` - The integration ID associated with the Microsoft Teams team.         - `targetDisplay` - The name of the channel to send the notification to.         - `integrationId`: The stringified ID of the integration.         ```json             {                 "type":"msteams",                 "config":{                     "targetType":"specific",                     "targetIdentifier":"19:a4b3kghaghgkjah357y6847@thread.skype",                     "targetDisplay":"notify-errors"                 },                 "integrationId":"1",                 "data":{},                 "status":"active"             }         ```          **Notify on OpsGenie**         - `targetDisplay`: The name of the Opsgenie team.         - `targetIdentifier`: The ID of the Opsgenie team to send the notification to.         - `integrationId`: The stringified ID of the integration.         - `data["priority"]`: The priority level for the notification.          ```json             {                 "type":"opsgenie",                 "config":{                     "targetType":"specific",                     "targetIdentifier":"123456-Error-Service",                     "targetDisplay":"Error Service"                     },                 "integrationId":"2345",                 "data":{                     "priority":"P3"                 },                 "status":"active"             }         ```          **Notify on Azure DevOps**         - `integrationId`: The stringified ID of the integration.         - `data` - A list of any fields you want to include in the ticket as objects.          ```json             {                 "type":"vsts",                 "config":{                     "targetType":"specific",                     "targetIdentifier":",                     "targetDisplay":""                     },                 "integrationId":"2345",                 "data":{...},                 "status":"active"             }         ```          **Create a Jira ticket**         - `integrationId`: The stringified ID of the integration.         - `data` - A list of any fields you want to include in the ticket as objects.          ```json             {                 "type":"jira",                 "config":{                     "targetType":"specific",                     "targetIdentifier":",                     "targetDisplay":""                     },                 "integrationId":"2345",                 "data":{...},                 "status":"active"             }         ```          **Create a Jira Server ticket**         - `integrationId`: The stringified ID of the integration.         - `data` - A list of any fields you want to include in the ticket as objects.          ```json             {                 "type":"jira_server",                 "config":{                     "targetType":"specific",                     "targetIdentifier":",                     "targetDisplay":""                     },                 "integrationId":"2345",                 "data":{...},                 "status":"active"             }         ```          **Create a GitHub issue**         - `integrationId`: The stringified ID of the integration.         - `data` - A list of any fields you want to include in the ticket as objects.          ```json             {                 "type":"github",                 "config":{                     "targetType":"specific",                     "targetIdentifier":",                     "targetDisplay":""                     },                 "integrationId":"2345",                 "data":{                   "additional_fields": {                       "assignee": "",                       "integration": "2345",                       "labels": [],                       "repo": "example-repo",                   },                   "dynamic_form_fields": [                       {                         "choices": [["YourOrg/example-repo", "example-repo"]],                         "default": "YourOrg/example-repo",                         "label": "GitHub Repository",                         "name": "repo",                         "required": true                         "type": "select",                         "updatesForm": true,                         "url": "/extensions/github/search/example-repo/1234567/",                       },                   ],                 },                 "status":"active"             }         ```          */
  action_filters?: ({ [key: string]: unknown | undefined })[];
  /**              The ID user or team who owns the monitor or alert prefaced by the string 'user' or 'team'.              **User**             ```json                 "user:123456"             ```              **Team**             ```json                 "team:456789"             ```          */
  owner?: string | null;
};

export type LegacyBrowserFilter = {
  /** Toggle the browser-extensions, localhost, filtered-transaction, or web-crawlers filter on or off. */
  active?: boolean;
  /**  Specifies which legacy browser filters should be active. Anything excluded from the list will be disabled. The options are: - `ie` - Internet Explorer Version 11 and lower - `edge` - Edge Version 110 and lower - `safari` - Safari Version 15 and lower - `firefox` - Firefox Version 110 and lower - `chrome` - Chrome Version 110 and lower - `opera` - Opera Version 99 and lower - `android` - Android Version 3 and lower - `opera_mini` - Opera Mini Version 34 and lower  Deprecated options: - `ie_pre_9` - Internet Explorer Version 8 and lower - `ie9` - Internet Explorer Version 9 - `ie10` - Internet Explorer Version 10 - `ie11` - Internet Explorer Version 11 - `safari_pre_6` - Safari Version 5 and lower - `opera_pre_15` - Opera Version 14 and lower - `opera_mini_pre_8` - Opera Mini Version 8 and lower - `android_pre_4` - Android Version 3 and lower - `edge_pre_79` - Edge Version 18 and lower (non Chromium based)  */
  subfilters?: ("ie" | "edge" | "safari" | "firefox" | "chrome" | "opera" | "android" | "opera_mini" | "ie_pre_9" | "ie9" | "ie10" | "ie11" | "opera_pre_15" | "android_pre_4" | "safari_pre_6" | "opera_mini_pre_8" | "edge_pre_79")[];
};

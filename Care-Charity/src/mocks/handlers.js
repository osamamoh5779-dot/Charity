import { http, HttpResponse, delay } from "msw";

 
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

const USERS = {
  Admin: [
    { name: "Elena Vance", tone: "teal" },
    { name: "Kareem Nabil", tone: "neutral" },
  ],
  Volunteer: [
    { name: "Mona Salem", tone: "teal" },
    { name: "Ahmed Mostafa", tone: "neutral" },
  ],
  Donor: [
    { name: "Sara Hassan", tone: "primary" },
    { name: "Omar Fathy", tone: "primary" },
  ],
  System: [{ name: "System", tone: "system", system: true, sub: "Automated" }],
};

const ACTIONS = [
  { label: "Approved donation", variant: "teal", type: "donations", by: "Admin", target: ["donation", "Donation", "5,000 EGP · Vodafone Cash"], change: ["status", "pending", "approved"], route: "/donations/review" },
  { label: "Made donation", variant: "info", type: "donations", by: "Donor", target: ["donation", "Donation", "1,200 EGP · Card"], change: ["status", undefined, "pending"], route: "/donate" },
  { label: "Marked installment paid", variant: "teal", type: "donations", by: "Volunteer", target: ["installment", "Installment", "1,200 EGP"], change: ["status", "pending", "paid"], route: "/installments" },
  { label: "Submitted new case", variant: "info", type: "cases", by: "Volunteer", target: ["case", "Case assistance", "Kidney Dialysis"], change: ["assistance_type", undefined, "recurring"], route: "/cases/new" },
  { label: "Assigned volunteer", variant: "purple", type: "cases", by: "Admin", target: ["case", "Case", "Cardiac Surgery"], change: ["volunteer", "none", "Mona Salem"], route: "/cases" },
  { label: "Approved volunteer application", variant: "teal", type: "volunteers", by: "Admin", target: ["user", "User", "Volunteer applicant"], change: ["status", "pending", "approved"], route: "/volunteers/submissions" },
  { label: "Created fund transfer", variant: "teal", type: "system", by: "System", target: ["transfer", "Fund transfer", "2,500 EGP"], change: ["status", "pending", "completed"], route: "/transfers" },
  { label: "Deactivated user", variant: "danger", type: "system", by: "Admin", target: ["user", "User", "Omar Hassan"], change: ["active", "1", "0"], route: "/users" },
];

const N = 320;
let t = Date.now() - 5 * 60_000;
const LOGS = Array.from({ length: N }, (_, i) => {
  const a = pick(ACTIONS);
  const user = { ...pick(USERS[a.by]), role: a.by };
  const [field, from, to] = a.change;
  const status = rnd() < 0.08 ? "failed" : rnd() < 0.15 ? "pending" : "success";
  const log = {
    id: `LOG-${1000 + N - i}`,
    created_at: new Date(t).toISOString(),
    type: a.type,
    user,
    action: { label: a.label, variant: a.variant },
    target: { type: a.target[0], title: `${a.target[1]} #${Math.floor(rnd() * 900) + 100}`, sub: a.target[2] },
    changes: [{ field, from, to }],
    status,
    route: a.route,
    device: {
      kind: rnd() > 0.7 ? "phone" : "desktop",
      platform: pick(["Windows", "macOS", "Android", "iOS"]),
      browser: pick(["Chrome", "Safari", "Firefox"]),
      ip: `197.${Math.floor(rnd() * 255)}.${Math.floor(rnd() * 255)}.${Math.floor(rnd() * 255)}`,
    },
  };
  t -= (20 + rnd() * 200) * 60_000;
  return log;
});

 
const RANGE_MS = { "24h": 864e5, "7d": 7 * 864e5, "30d": 30 * 864e5 };

function filterLogs(p, { ignoreTab = false } = {}) {
  const term = (p.q ?? "").trim().toLowerCase();
  const since = Date.now() - (RANGE_MS[p.range] ?? RANGE_MS["30d"]);
  return LOGS.filter(
    (l) =>
      new Date(l.created_at).getTime() >= since &&  
      (ignoreTab || !p.tab || l.type === p.tab) &&
      (!p.action || l.action.label === p.action) &&
      (!p.role || l.user.role === p.role) &&
      (!p.status || l.status === p.status) &&
      (!term ||
        [l.id, l.user.name, l.action.label, l.target.title, l.target.sub]
          .join(" ")
          .toLowerCase()
          .includes(term)),
  );
}

const SORTERS = {
  created_at: (l) => l.created_at,
  user: (l) => l.user.name.toLowerCase(),
  action: (l) => l.action.label,
  status: (l) => l.status,
};

function sortLogs(rows, sort = "-created_at") {
  const desc = sort.startsWith("-");
  const get = SORTERS[sort.replace(/^-/, "")] ?? SORTERS.created_at;
  return [...rows].sort((a, b) => {
    const x = get(a), y = get(b);
    const c = x < y ? -1 : x > y ? 1 : 0;
    return (desc ? -c : c) || a.id.localeCompare(b.id);
  });
}

const params = (request) => Object.fromEntries(new URL(request.url).searchParams);

export const handlers = [
  http.get("/api/activity-logs", async ({ request }) => {
    const p = params(request);
    await delay(400);

    if (p.q === "error") {
      return HttpResponse.json({ message: "Simulated failure" }, { status: 500 });  
    }

    const page = Math.max(1, Number(p.page) || 1);
    const size = Number(p.page_size) || 10;

    const rows = sortLogs(filterLogs(p), p.sort);

     
    const counts = { all: 0, donations: 0, cases: 0, volunteers: 0, system: 0 };
    for (const l of filterLogs(p, { ignoreTab: true })) {
      counts.all++;
      counts[l.type]++;
    }

    return HttpResponse.json({
      data: rows.slice((page - 1) * size, page * size),
      meta: { total: rows.length, page, page_size: size, last_page: Math.max(1, Math.ceil(rows.length / size)), counts },
    });
  }),
 
  http.get("/api/activity-logs/export", async ({ request }) => {
    const p = params(request);
    await delay(500);
    return HttpResponse.json({ data: sortLogs(filterLogs(p), p.sort).slice(0, 5000) });
  }),
];

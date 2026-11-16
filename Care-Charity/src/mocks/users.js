import { http, HttpResponse, delay } from "msw";

/* ---------- داتا وهمية: 342 مستخدم (14 أدمن + 324 متطوع + 4 متبرعين) ---------- */
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const NOW = Date.now();
const ago = (ms) => new Date(NOW - ms).toISOString();

let seed = 42;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const int = (min, max) => min + Math.floor(rnd() * (max - min + 1));
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

const digits = (n) => Array.from({ length: n }, () => int(0, 9)).join("");

const ELENA_PHOTO = "https://lh3.googleusercontent.com/aida-public/AB6AXuA7Poi7Dxdrro2KtY3WJ2H7bCZo5ZN-c1UoJYOAVLgdD4nqwqRAqmxiummDSQ5ws0WqzyH2GfAXGS-xhItZybNTh6WcsBXlaooKYMUMfJR0QzYWvjT2_29x3w2UvZujFDtehEpAwHQhb1IAHsPptTMJTaPNJFeQIB34sCtux_o4q2BKpE8611R41J-lZZst93HiJ7II9y2JSGiemSYCukcp81aCQgBiPstl4qLYgrVE";
const SARAH_PHOTO = "https://lh3.googleusercontent.com/aida-public/AB6AXuD7EA9STBzLdKPuSw2ANTCl7ChhHBpN-Tiblt5yPWczJfxFJE7ANSYFeb2QEMGE_JgxZ7BheVNbvDiWphA4qQ3yO0WzwliYUqlpvVfLRVUXapOqWEQ7WRVjEY16oBhd-FA7eh3TGAZN-vmZ_lrZwt0tdqNV9bwjlean6EGASmqccH3VbTBFH-Hsy-mpcFVUqkjQ9WdnLuPcUU_fzKxITbw9TZoKhQNHPySTDnAcgCEn";

 
const BUILT_IN = [
  "cases.view", "cases.create", "cases.edit", "cases.delete",
  "donations.view", "donations.approve",
  "volunteers.view", "volunteers.create", "volunteers.edit", "volunteers.approve",
  "installments.view", "installments.edit", "installments.approve",
  "fund_transfers.view", "fund_transfers.create", "fund_transfers.approve",
  "impact.view", "impact.create", "impact.edit", "impact.delete",
  "reports.view", "reports.export",
  "ai_assistant.view", "audit_log.view",
  "users_roles.manage", "users_roles.delete_user", "settings.manage",
];

const CRUD = ["view", "create", "edit", "delete"];
const CUSTOM_MODULES = [];

const allKeys = () => [...BUILT_IN, ...CUSTOM_MODULES.flatMap((mod) => CRUD.map((a) => `${mod.key}.${a}`))];
const unknownKeys = (keys = []) => keys.filter((k) => !allKeys().includes(k));

let roleSeq = 4;
const ROLES = [
  { id: 1, key: "super_admin", is_system: true, name: "Super Admin", description: "Full access to all modules, billing, operational logs, and security governance", permissions: [] },
  {
    id: 2, key: "admin", name: "Admin", description: "Staff operations and case management",
    permissions: [
      "cases.view", "cases.create", "cases.edit",
      "donations.view", "donations.approve",
      "volunteers.view", "volunteers.create", "volunteers.edit", "volunteers.approve",
      "installments.view", "installments.edit", "installments.approve",
      "fund_transfers.view", "fund_transfers.create",
      "impact.view", "impact.create", "impact.edit", "impact.delete",
      "reports.view", "reports.export",
      "ai_assistant.view", "audit_log.view",
    ],
  },
  { id: 3, key: "volunteer", name: "Volunteer", description: "Field contacts who submit cases and assist local families", permissions: ["cases.view", "cases.create"] },
  { id: 4, key: "donor", name: "Donor", description: "Donor portal access only, view receipts and impact updates", permissions: ["donations.view", "impact.view"] },
];
const roleRef = (key) => {
  const r = ROLES.find((x) => x.key === key);
  return { id: r.id, key: r.key, name: r.name };
};

 
const FIRST = ["Omar", "Youssef", "Mahmoud", "Hassan", "Khaled", "Mostafa", "Tamer", "Walid", "Hany", "Sherif", "Mona", "Nour", "Salma", "Heba", "Dalia", "Rana", "Yasmin", "Laila", "Aya", "Mariam", "Farida", "Nada", "Amira", "Reem"];
const LAST = ["Hassan", "Fathy", "Salem", "Adel", "Gamal", "Saad", "Ibrahim", "Khalil", "Mansour", "Zaki", "Shawky", "Fouad", "Anwar", "Sabry", "Lotfy", "Naguib", "Rashad", "Barakat"];
const DOMAIN = { admin: "wecare.org", volunteer: "field.org", donor: "donors.org" };
const usedEmails = new Set(["elena.v@wecare-ngo.org", "k.nabil@wecare.org", "sarah.elsayed@wecare.org", "a.mostafa@field.org", "tarek.m@donors.org"]);

const phone = () => `+20 1${pick([0, 1, 2, 5])}${int(0, 9)} ${digits(3)} ${digits(4)}`;

let idSeq = 0;
const make = (o) => ({ id: ++idSeq, whatsapp: true, is_hq: false, avatar_url: null, is_active: true, ...o });

const USERS = [
  make({ name: "Elena Vance", email: "elena.v@wecare-ngo.org", phone: "+20 102 345 6789", type: "admin", is_hq: true, avatar_url: ELENA_PHOTO, roles: [roleRef("super_admin")], last_active_at: ago(2 * MIN) }),
  make({ name: "Kareem Nabil", email: "k.nabil@wecare.org", phone: "+20 114 920 4481", type: "admin", roles: [roleRef("admin")], last_active_at: ago(14 * MIN) }),
  make({ name: "Dr. Sarah El-Sayed", email: "sarah.elsayed@wecare.org", phone: "+20 120 771 9090", type: "volunteer", avatar_url: SARAH_PHOTO, roles: [roleRef("volunteer")], last_active_at: ago(2 * HOUR) }),
  make({ name: "Ahmed Mostafa", email: "a.mostafa@field.org", phone: "+20 100 554 1120", type: "volunteer", roles: [roleRef("volunteer")], last_active_at: ago(30 * HOUR) }),
  make({ name: "Tarek Mahmoud", email: "tarek.m@donors.org", phone: "+20 115 889 0041", type: "donor", roles: [roleRef("donor")], last_active_at: ago(3 * DAY) }),
];

function generate(type, role, count) {
  for (let i = 0; i < count; i++) {
    const first = pick(FIRST);
    const last = pick(LAST);
    let email = `${first[0]}.${last}@${DOMAIN[type]}`.toLowerCase();
    for (let n = 2; usedEmails.has(email); n++) email = `${first[0]}.${last}${n}@${DOMAIN[type]}`.toLowerCase();
    usedEmails.add(email);
    USERS.push(
      make({
        name: `${first} ${last}`,
        email,
        phone: phone(),
        whatsapp: rnd() > 0.15,
        type,
        is_active: type !== "donor" || USERS.length % 2 === 0,  
        roles: [roleRef(role)],
        last_active_at: ago(4 * DAY + rnd() * 110 * DAY),  
      }),
    );
  }
}
generate("admin", "super_admin", 1);  
generate("admin", "admin", 11);  
generate("volunteer", "volunteer", 322);  
generate("donor", "donor", 3);  

 
const view = (u) => ({ ...u });
const rolesView = (r) => ({
  ...r,
  permissions: r.is_system ? allKeys() : r.permissions,
  users_count: USERS.filter((u) => u.roles.some((x) => x.id === r.id)).length,
});

function filterUsers(p) {
  const term = (p.q ?? "").trim().toLowerCase();
  return USERS.filter(
    (u) =>
      (!p.type || u.type === p.type) &&
      (!p.role || u.roles.some((r) => r.key === p.role)) &&
      (!p.status || (p.status === "active") === u.is_active) &&
      (!term || [u.name, u.email, u.phone].join(" ").toLowerCase().includes(term)),
  );
}

const SORTERS = {
  name: (u) => u.name.toLowerCase(),
  type: (u) => u.type,
  last_active: (u) => u.last_active_at,
  status: (u) => (u.is_active ? 1 : 0),
};

function sortUsers(rows, sort = "-last_active") {
  const desc = sort.startsWith("-");
  const get = SORTERS[sort.replace(/^-/, "")] ?? SORTERS.last_active;
  return [...rows].sort((a, b) => {
    const x = get(a), y = get(b);
    const c = x < y ? -1 : x > y ? 1 : 0;
    return (desc ? -c : c) || a.id - b.id;
  });
}

const params = (request) => Object.fromEntries(new URL(request.url).searchParams);

 
async function readBody(request) {
  if (request.headers.get("content-type")?.includes("multipart/form-data")) {
    const form = await request.formData();
    const body = {};
    for (const [k, v] of form.entries()) {
      if (k.endsWith("[]")) (body[k.slice(0, -2)] ??= []).push(v);
      else body[k] = v;
    }
    if (body.avatar instanceof Blob) body.avatar_url = URL.createObjectURL(body.avatar);
    delete body.avatar;
    return body;
  }
  return request.json();
}

const invalid = (message) => HttpResponse.json({ message }, { status: 422 });
const rolesFor = (ids = []) => ROLES.filter((r) => ids.map(Number).includes(r.id)).map((r) => roleRef(r.key));

function applyUserFields(user, b) {
  if (b.name != null) user.name = b.name;
  if (b.email != null) user.email = b.email;
  if (b.phone != null) user.phone = b.phone;
  if (b.type != null) user.type = b.type;
  if (b.role_ids != null) user.roles = rolesFor(b.role_ids);
  if (b.is_active != null) user.is_active = b.is_active === true || b.is_active === "true";
  if (b.avatar_url) user.avatar_url = b.avatar_url;
  if (b.remove_avatar === true || b.remove_avatar === "true") user.avatar_url = null;
}

const emailTaken = (email, exceptId) =>
  USERS.some((u) => u.email.toLowerCase() === String(email).toLowerCase() && u.id !== exceptId);

export const userHandlers = [
  http.get("/api/users", async ({ request }) => {
    const p = params(request);
    await delay(400);

    if (p.q === "error") {
      return HttpResponse.json({ message: "Simulated failure" }, { status: 500 });  
    }

    const page = Math.max(1, Number(p.page) || 1);
    const size = Number(p.page_size) || 5;
    const rows = sortUsers(filterUsers(p), p.sort);

    return HttpResponse.json({
      data: rows.slice((page - 1) * size, page * size).map(view),
      meta: { total: rows.length, page, page_size: size, last_page: Math.max(1, Math.ceil(rows.length / size)) },
    });
  }),

  
  http.get("/api/users/stats", async () => {
    await delay(300);
    return HttpResponse.json({
      data: {
        total: USERS.length,
        new_this_month: 12,
        active_admins: USERS.filter((u) => u.type === "admin" && u.is_active).length,
        active_volunteers: USERS.filter((u) => u.type === "volunteer" && u.is_active).length,
      },
    });
  }),

   
  http.get("/api/users/export", async ({ request }) => {
    const p = params(request);
    await delay(500);
    return HttpResponse.json({ data: sortUsers(filterUsers(p), p.sort).map(view) });
  }),

  http.post("/api/users", async ({ request }) => {
    const b = await readBody(request);
    await delay(500);
    if (emailTaken(b.email)) return invalid("This email is already in use.");
    const user = make({ last_active_at: null });
    applyUserFields(user, b);
    USERS.push(user);
    return HttpResponse.json({ data: view(user) }, { status: 201 });
  }),

  http.patch("/api/users/:id/status", async ({ request, params: { id } }) => {
    const { is_active } = await request.json();
    await delay(350);
    const user = USERS.find((u) => u.id === Number(id));
    if (!user) return HttpResponse.json({ message: "User not found" }, { status: 404 });
    user.is_active = is_active;
    return HttpResponse.json({ data: view(user) });
  }),

  http.patch("/api/users/:id", async ({ request, params: { id } }) => {
    const b = await readBody(request);
    await delay(500);
    const user = USERS.find((u) => u.id === Number(id));
    if (!user) return HttpResponse.json({ message: "User not found" }, { status: 404 });
    if (b.email && emailTaken(b.email, user.id)) return invalid("This email is already in use.");
    applyUserFields(user, b);
    return HttpResponse.json({ data: view(user) });
  }),

  http.post("/api/users/:id/reset-password", async ({ params: { id } }) => {
    await delay(600);
    if (!USERS.some((u) => u.id === Number(id))) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }
    return HttpResponse.json({ message: "Reset link sent" });
  }),

   
  http.get("/api/roles", async () => {
    await delay(300);
    return HttpResponse.json({ data: ROLES.map(rolesView) });
  }),

  http.post("/api/roles", async ({ request }) => {
    const b = await request.json();
    await delay(500);
    if (ROLES.some((r) => r.key === b.key)) return invalid("This role slug is already used.");
    if (unknownKeys(b.permissions).length) return invalid("Unknown permission.");
    const role = { id: ++roleSeq, key: b.key, name: b.name, description: b.description || "No description yet.", permissions: b.permissions ?? [] };
    ROLES.push(role);
    return HttpResponse.json({ data: rolesView(role) }, { status: 201 });
  }),

  http.patch("/api/roles/:id", async ({ request, params: { id } }) => {
    const b = await request.json();
    await delay(400);
    const role = ROLES.find((r) => r.id === Number(id));
    if (!role) return HttpResponse.json({ message: "Role not found" }, { status: 404 });
    if (role.is_system) return HttpResponse.json({ message: "System roles can't be edited." }, { status: 403 });
    Object.assign(role, { name: b.name, description: b.description || role.description });
    return HttpResponse.json({ data: rolesView(role) });
  }),

  http.put("/api/roles/:id/permissions", async ({ request, params: { id } }) => {
    const { permissions } = await request.json();
    await delay(500);
    const role = ROLES.find((r) => r.id === Number(id));
    if (!role) return HttpResponse.json({ message: "Role not found" }, { status: 404 });
    if (role.is_system) return HttpResponse.json({ message: "System role permissions can't be edited." }, { status: 403 });
    if (unknownKeys(permissions).length) return invalid("Unknown permission.");
    role.permissions = permissions;
    return HttpResponse.json({ data: rolesView(role) });
  }),

   
  http.get("/api/modules", async () => {
    await delay(200);
    return HttpResponse.json({ data: CUSTOM_MODULES });
  }),

  http.post("/api/modules", async ({ request }) => {
    const b = await request.json();
    await delay(400);
    const builtInModules = new Set(BUILT_IN.map((k) => k.split(".")[0]));
    if (builtInModules.has(b.key) || CUSTOM_MODULES.some((m) => m.key === b.key)) return invalid("This module already exists.");
    CUSTOM_MODULES.push({ key: b.key, name: b.name, description: b.description || "No description yet." });
    return HttpResponse.json({ data: CUSTOM_MODULES.at(-1) }, { status: 201 });
  }),

  http.delete("/api/modules/:key", async ({ params: { key } }) => {
    await delay(300);
    const i = CUSTOM_MODULES.findIndex((m) => m.key === key);
    if (i === -1) return HttpResponse.json({ message: "Module not found" }, { status: 404 });
    CUSTOM_MODULES.splice(i, 1);
    ROLES.forEach((r) => (r.permissions = r.permissions.filter((k) => !k.startsWith(`${key}.`))));
    return new HttpResponse(null, { status: 204 });
  }),
];

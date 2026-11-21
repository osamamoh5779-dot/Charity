import { useMemo, useState } from "react";
import {
  LuUsers,
  LuSearch,
  LuDownload,
  LuBan,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";

// Initial Users
const initialUsers = [
  {
    id: 1,
    name: "Elena Vance",
    email: "elena.v@wecare-ngo.org",
    type: "Admin",
    role: "Super Admin",
    active: true,
    last: "2 mins ago",
  },
  {
    id: 2,
    name: "Kareem Nabil",
    email: "k.nabil@wecare.org",
    type: "Admin",
    role: "Admin",
    active: true,
    last: "14 mins ago",
  },
  {
    id: 3,
    name: "Sarah El-Sayed",
    email: "sarah@wecare.org",
    type: "Volunteer",
    role: "Volunteer",
    active: true,
    last: "2h ago",
  },
  {
    id: 4,
    name: "Ahmed Mostafa",
    email: "ahmed@field.org",
    type: "Volunteer",
    role: "Volunteer",
    active: false,
    last: "Yesterday",
  },
  {
    id: 5,
    name: "Tarek Mahmoud",
    email: "tarek@donors.org",
    type: "Donor",
    role: "Donor",
    active: true,
    last: "3 days ago",
  },
];

// Generate 337 Extra Users
const extraUsers = Array.from({ length: 337 }, (_, i) => {
  const type = i < 12 ? "Admin" : i < 334 ? "Volunteer" : "Donor";

  return {
    id: i + 6,
    name: `User ${i + 6}`,
    email: `user${i + 6}@wecare.org`,
    type,
    role: type === "Admin" ? "Admin" : type,
    active: true,
    last: "Recently",
  };
});

const allInitialUsers = [...initialUsers, ...extraUsers];

export default function UsersPage() {
  const [users, setUsers] = useState(allInitialUsers);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  // Add User Modal
  const [showModal, setShowModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    type: "Volunteer",
  });

  // Filter Users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = `${user.name} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType = type === "All" || user.type === type;

      const matchesStatus =
        status === "All" || (status === "Active" ? user.active : !user.active);

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [users, search, type, status]);

  // Pagination
  const pageSize = 5;

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / pageSize));

  const displayedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // Statistics
  const activeUsers = users.filter((u) => u.active).length;

  const admins = users.filter((u) => u.type === "Admin" && u.active).length;

  const volunteers = users.filter(
    (u) => u.type === "Volunteer" && u.active,
  ).length;

  // Toggle User Status
  function toggleStatus(id) {
    setUsers((oldUsers) =>
      oldUsers.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  }

  // Add New User
  function handleAddUser(e) {
    e.preventDefault();

    const user = {
      id: Date.now(),
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      type: newUser.type,
      role: newUser.type,
      active: true,
      last: "Just now",
    };

    setUsers((oldUsers) => [user, ...oldUsers]);

    setNewUser({
      name: "",
      email: "",
      type: "Volunteer",
    });

    setPage(1);
    setSearch("");
    setType("All");
    setStatus("All");
    setShowModal(false);
  }

  // Export Users
  function exportUsers() {
    const rows = [
      ["Name", "Email", "Type", "Role", "Status"],
      ...filteredUsers.map((u) => [
        u.name,
        u.email,
        u.type,
        u.role,
        u.active ? "Active" : "Inactive",
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="p-6 text-ink-strong">
      {/* Page Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-xs text-ink-muted">
            System <span className="px-2">›</span> Users
          </p>

          <h1 className="text-2xl font-bold text-ink">Users</h1>

          <p className="mt-1 text-sm text-ink-muted">
            Manage system members and user accounts
          </p>
        </div>

        {/* Header Buttons */}
        <div className="flex gap-3">
          <button
            onClick={exportUsers}
            className="flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm"
          >
            <LuDownload size={16} />
            Export
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Users",
            value: users.length,
            Icon: LuUsers,
          },
          {
            label: "Active Users",
            value: activeUsers,
            Icon: LuUsers,
          },
          {
            label: "Administrators",
            value: admins,
            Icon: LuUsers,
          },
          {
            label: "Volunteers",
            value: volunteers,
            Icon: LuUsers,
          },
        ].map(({ label, value, Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex justify-between text-sm text-ink-secondary">
              {label}
              <Icon size={19} className="text-primary" />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-ink">{value}</h2>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {/* Table Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <h2 className="font-bold text-ink">All Users</h2>

            <p className="mt-1 text-xs text-ink-muted">
              View and manage user accounts
            </p>
          </div>

          <span className="rounded-full bg-card-hover px-3 py-1 text-xs">
            {filteredUsers.length} Users
          </span>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-3 px-5 pb-4">
          {/* Search */}
          <div className="flex h-10 min-w-52 flex-1 items-center gap-2 rounded-lg border border-border px-3">
            <LuSearch size={17} />

            <input
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Type Filter */}
          <select
            className="h-10 rounded-lg border border-border bg-card px-3 text-sm"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Types</option>
            <option value="Admin">Admin</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Donor">Donor</option>
          </select>

          {/* Status Filter */}
          <select
            className="h-10 rounded-lg border border-border bg-card px-3 text-sm"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-card-hover text-xs text-ink-muted">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Type</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Active</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {displayedUsers.map((user) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="p-4">
                    <b className="block text-ink-strong">{user.name}</b>

                    <small className="text-ink-muted">{user.email}</small>
                  </td>

                  <td className="p-4">{user.type}</td>

                  <td className="p-4">{user.role}</td>

                  <td className="p-4">
                    <span
                      className={
                        user.active ? "text-success" : "text-ink-muted"
                      }
                    >
                      ● {user.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4 text-ink-muted">{user.last}</td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      title="Change status"
                      className="rounded-md border border-border p-2 hover:text-primary"
                    >
                      {user.active ? <LuBan size={16} /> : <span>✓</span>}
                    </button>
                  </td>
                </tr>
              ))}

              {displayedUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-ink-muted">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border p-4 text-xs text-ink-muted">
          <span>
            Showing {filteredUsers.length ? (page - 1) * pageSize + 1 : 0} to{" "}
            {Math.min(page * pageSize, filteredUsers.length)} of{" "}
            {filteredUsers.length}
          </span>

          <div className="flex items-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded border border-border p-1 disabled:opacity-30"
            >
              <LuChevronLeft size={17} />
            </button>
            {page} / {pageCount}
            <button
              disabled={page === pageCount}
              onClick={() => setPage((p) => p + 1)}
              className="rounded border border-border p-1 disabled:opacity-30"
            >
              <LuChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6">
            {/* Modal Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-ink">Add New User</h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-xl text-ink-muted"
              >
                ×
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddUser} className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm text-ink-muted">
                  Full Name
                </label>

                <input
                  required
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      name: e.target.value,
                    })
                  }
                  className="h-10 w-full rounded-lg border border-border bg-transparent px-3"
                  placeholder="Enter full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm text-ink-muted">
                  Email
                </label>

                <input
                  required
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      email: e.target.value,
                    })
                  }
                  className="h-10 w-full rounded-lg border border-border bg-transparent px-3"
                  placeholder="Enter email"
                />
              </div>

              {/* User Type */}
              <div>
                <label className="mb-2 block text-sm text-ink-muted">
                  User Type
                </label>

                <select
                  value={newUser.type}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      type: e.target.value,
                    })
                  }
                  className="h-10 w-full rounded-lg border border-border bg-card px-3"
                >
                  <option value="Admin">Admin</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Donor">Donor</option>
                </select>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-border px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 font-semibold text-white"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

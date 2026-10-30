
import { useState } from "react";

import {
  FaUserPlus,
  FaHandHoldingHeart,
  FaHeart,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

import {
  BsShieldLock,
  BsShieldCheck,
} from "react-icons/bs";

const roles = [
  {
    id: "super-admin",
    name: "Super Admin",
    users: "2 users",
    description: "Full access to all modules, billing and security",
    icon: BsShieldLock,
  },
  {
    id: "admin",
    name: "Admin",
    users: "12 users",
    description: "Staff operations, donations review, and case management",
    icon: BsShieldCheck,
    default: true,
  },
  {
    id: "volunteer",
    name: "Volunteer",
    users: "324 users",
    description: "Field submissions and mobile app access",
    icon: FaHandHoldingHeart,
  },
  {
    id: "donor",
    name: "Donor",
    users: "4 users",
    description: "Donor portal access and donation receipt history",
    icon: FaHeart,
  },
];

export default function AddUserModal({ onClose, onAddUser }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "admin",
    sendInvitation: true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      ...formData,
      countryCode: "+20",
    };

    onAddUser?.(userData);

    if (!onAddUser) {
      console.log("New User:", userData);
    }

    onClose?.();
  };

  const inputClass =
    "w-full h-[46px] rounded-xl border border-[#566174] bg-[#080e1a] px-4 text-[15px] text-white placeholder:text-[#6d7686] outline-none transition focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/10";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020817]/80 p-3 backdrop-blur-[5px] sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="flex max-h-[95vh] w-full max-w-[560px] flex-col overflow-hidden rounded-[26px] border border-[#1b273b] bg-[#11192b] shadow-2xl shadow-black/50"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1d293c] px-6 py-5 sm:px-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#174052] bg-[#0d2031] text-[#2dd4bf]">
              <FaUserPlus size={21} />
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-white">
                Add New User
              </h2>
              <p className="mt-1 text-sm text-[#c0c9d8]">
                Invite a team member or assign an account role
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#d5dce8] transition hover:bg-[#263247] hover:text-white"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-6 sm:px-7"
        >
          {/* Full Name */}
          <div className="mb-5">
            <label className="mb-2 block text-[15px] font-medium text-[#e3e9f2]">
              Full Name *
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Dr. Omar Farooq"
              className={`${inputClass} ${
                errors.fullName ? "border-red-500" : ""
              }`}
            />

            {errors.fullName && (
              <p className="mt-1 text-xs text-red-400">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-[15px] font-medium text-[#e3e9f2]">
              Email Address *
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="omar.farooq@wecare.org"
              className={`${inputClass} ${
                errors.email ? "border-red-500" : ""
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="mb-2 block text-[15px] font-medium text-[#e3e9f2]">
              Phone Number / WhatsApp *
            </label>

            <div className="flex gap-2">
              <div className="flex h-[46px] shrink-0 items-center gap-2 rounded-xl bg-[#080e1a] px-3 text-sm font-semibold text-white">
                <span className="text-xl">🇪🇬</span>
                +20
              </div>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="010 1234 5678"
                className={`${inputClass} ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
            </div>

            {errors.phone && (
              <p className="mt-1 text-xs text-red-400">
                {errors.phone}
              </p>
            )}

            <p className="mt-2 flex items-center gap-1.5 text-sm text-[#d4dbe6]">
              <FaInfoCircle size={14} />
              Required for field volunteers and case submitters
            </p>
          </div>

          {/* Assign Role */}
          <div className="mt-7">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-[15px] font-medium text-[#e3e9f2]">
                Assign Role *
              </h3>

              <span className="text-sm text-[#d1d8e5]">
                Select one access clearance
              </span>
            </div>

            <div className="space-y-2.5">
              {roles.map((role) => {
                const Icon = role.icon;
                const selected = formData.role === role.id;

                return (
                  <label
                    key={role.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition-all sm:p-3.5 ${
                      selected
                        ? "border-[#23364c] bg-[#172338]"
                        : "border-transparent bg-[#080e1a] hover:border-[#34445c]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.id}
                      checked={selected}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[15px] font-semibold text-[#e8edf6]">
                          {role.name}
                        </span>

                        <span className="text-sm text-[#e1e7f1]">
                          {role.users}
                        </span>

                        {role.default && (
                          <span className="rounded bg-[#273449] px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#dce5f2]">
                            DEFAULT
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm leading-5 text-[#d1d9e6]">
                        {role.description}
                      </p>
                    </div>

                    <Icon
                      size={19}
                      className="mt-0.5 shrink-0 text-[#e0e8f4]"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Invitation */}
          <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#080e1a] p-3.5 transition hover:bg-[#0b1424]">
            <input
              type="checkbox"
              name="sendInvitation"
              checked={formData.sendInvitation}
              onChange={handleChange}
              className="mt-1 h-[18px] w-[18px] accent-blue-600"
            />

            <div>
              <p className="text-[15px] font-medium text-[#e8edf6]">
                Send Invitation Email
              </p>

              <p className="mt-1 text-sm text-[#d1d9e6]">
                Send an invitation with password setup link
              </p>
            </div>
          </label>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#202c40] pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-3 text-sm font-medium text-[#9ba6b8] transition hover:bg-[#263247] hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#27cbbb] px-5 py-3 text-sm font-bold text-[#062b31] shadow-lg shadow-teal-500/20 transition hover:bg-[#36ddcb] active:scale-95"
            >
              <FaUserPlus size={16} />
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

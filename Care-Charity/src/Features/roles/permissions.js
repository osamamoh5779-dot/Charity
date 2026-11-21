import { Layers } from "lucide-react";
import { ACTIONS, MODULE_META, getModuleIcon } from "./constants";

const humanize = (s) =>
  s.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

const ARABIC = /[\u0600-\u06FF]/;

const localized = (text, key, language) =>
  language === "en" && ARABIC.test(text ?? "")
    ? humanize(key ?? text)
    : (text ?? humanize(key ?? ""));

const toPermission = (p) => ({
  id: p.id,
  key: p.name,
  action: p.display_name,
  label: ACTIONS[p.display_name]?.label ?? humanize(p.display_name),
  description: ACTIONS[p.display_name]?.description ?? "",
});

export function buildCatalog(
  { resources = [], custom = [] } = {},
  language = "en",
) {
  const modules = resources.map((r) => ({
    key: r.module,
    label: localized(r.module_name, r.module, language),
    description: MODULE_META[r.module]?.description ?? "",
    icon: getModuleIcon(r.module, r.module_name),
    permissions: r.permissions.map(toPermission),
  }));

  if (custom.length) {
    modules.push({
      key: "other",
      label: "Other",
      description: "Standalone screens",
      icon: Layers,
      permissions: custom.map((c) => ({
        id: c.id,
        key: c.name,
        action: "custom",
        label: localized(c.label, c.name, language),
        description: "",
      })),
    });
  }
  return modules;
}

export const idsByKey = (modules) =>
  Object.fromEntries(
    modules.flatMap((m) => m.permissions.map((p) => [p.key, p.id])),
  );

export const countPermissions = (modules) =>
  modules.reduce((n, m) => n + m.permissions.length, 0);

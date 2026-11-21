import { NotDashboardUserError } from "../api";

const firstMessage = (value) => (Array.isArray(value) ? value[0] : value);

export function describeLoginError(error, messages) {
  if (error instanceof NotDashboardUserError) return { message: messages.noAccess, fields: {} };

  const status = error?.response?.status;
  const data = error?.response?.data;

  if (!status) return { message: messages.network, fields: {} };

  if (status === 422) {
    const fields = {};
    const errors = data?.errors ?? {};
    if (errors.email) fields.identifier = String(firstMessage(errors.email));
    if (errors.password) fields.password = String(firstMessage(errors.password));
    return { message: Object.keys(fields).length ? null : messages.generic, fields };
  }

  if (status === 401) return { message: messages.invalid, fields: {} };
  if (status === 403) return { message: messages.noAccess, fields: {} };
  if (status === 429) return { message: messages.tooMany, fields: {} };
  if (status === 503) return { message: messages.maintenance, fields: {} };
  if (status >= 500) return { message: messages.server, fields: {} };

  return { message: messages.generic, fields: {} };
}

export function getCooldownSeconds(error) {
  const header = Number(error?.response?.headers?.["retry-after"]);
  const seconds = Number.isFinite(header) && header > 0 ? header : 30;
  return Math.min(Math.max(Math.round(seconds), 5), 300);
}

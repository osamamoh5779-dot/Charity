import { LIMITS } from "../constants/auth";

export function validateLogin({ identifier, password }, messages) {
  const errors = {};

  if (!identifier.trim()) errors.identifier = messages.identifierRequired;

  if (!password) errors.password = messages.passwordRequired;
  else if (password.length < LIMITS.passwordMin) errors.password = messages.passwordMin;

  return errors;
}

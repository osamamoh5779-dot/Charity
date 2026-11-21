const bus = new EventTarget();

export const emitSessionExpired = () => bus.dispatchEvent(new Event("session-expired"));

export function onSessionExpired(callback) {
  bus.addEventListener("session-expired", callback);
  return () => bus.removeEventListener("session-expired", callback);
}

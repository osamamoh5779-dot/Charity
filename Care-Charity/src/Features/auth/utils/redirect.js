export function getSafeRedirect(from) {
  const path =
    typeof from === "string"
      ? from
      : from?.pathname
        ? `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
        : "/";

  const isInternal = path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/\\");
  return isInternal && !path.startsWith("/login") ? path : "/";
}

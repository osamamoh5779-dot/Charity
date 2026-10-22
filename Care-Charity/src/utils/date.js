const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" });
const dayFmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" });
const sameDay = (a, b) => a.toDateString() === b.toDateString();

export const formatTime = (d) => timeFmt.format(d);

export function formatDay(d) {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  return sameDay(d, now) ? "Today" : sameDay(d, yesterday) ? "Yesterday" : dayFmt.format(d);
}

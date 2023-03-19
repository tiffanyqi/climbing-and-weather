export function getTimeString(timestamp: number) {
  const time = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    timeStyle: "short"
  }).format(time);
}

export function getDateString(timestamp: number) {
  const time = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(time);
}

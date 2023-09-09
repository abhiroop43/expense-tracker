export function getFormattedDate(date) {
  dateObj = new Date(date);
  return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
}

export function getIsoDateString(date) {
  return date.toISOString();
}

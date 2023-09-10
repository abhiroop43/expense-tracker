export function getFormattedDate(date) {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
}

export function getIsoDateString(date) {
  return date.toISOString();
}

export function getDateMinusDays(date, days) {
  const dateObj = new Date(date);
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() - days);
}

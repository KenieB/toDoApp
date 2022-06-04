const dateFormat = /\d\d\d\d-\d\d-\d\d/;
/**
 * Formats a Date object as YYYY-MM-DD.
 *
 * This function is *not* exported because the UI should generally avoid working directly with Date instance.
 * You may export this function if you need it.
 *
 * @param date
 *  an instance of a date object
 * @returns {string}
 *  the specified Date formatted as YYYY-MM-DD
 */
function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

/**
 * Format a date string in ISO-8601 format (which is what is returned from PostgreSQL) as YYYY-MM-DD.
 * @param dateString
 *  ISO-8601 date string
 * @returns {*}
 *  the specified date string formatted as YYYY-MM-DD
 */
function formatAsDate(dateString) {
  return dateString.match(dateFormat)[0];
}

const monthText = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
/**
 *  Format single list item due-date
 */
function formatDueDate(listItem) {
  const itmDueDateAsDate = new Date(listItem["due-date"]);
  listItem["due-date"] = {
    month: `${itmDueDateAsDate.getMonth()}`,
    day: `${itmDueDateAsDate.getDate()}`,
    year: `${itmDueDateAsDate.getFullYear()}`,
    month_text: `${monthText[itmDueDateAsDate.getMonth()]}`,
  };
  return listItem;
}

/**
 * Formats the due-date property of a list item.
 * @param items
 *  a single list item, or an array of list items.
 * @returns {[item]|item}
 *  the specified item(s) with the due-date property formatted as YYYY-MM-DD.
 */
export default function formatAllDueDates(items) {
  return Array.isArray(items) ? items.map(formatDueDate) : formatDueDate(items);
}

/**
 * Function to format numbers based on the i18n api
 * @param {number} num number to format
 * @param {number} fractionDigits number of fixed fraction digits
 * @return {string} formatted string
 */
export const formatNumber = (num, fractionDigits = 0) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(Number(num));

/**
 * Function to format date and returns formatted string with number of years passed
 * @param {Date} date date to format
 * @return {string} formatted string
 */
export const getYearsAgo = (date) => {
  const yearCount = date.getFullYear() - new Date().getFullYear();
  return yearCount < 0
    ? new Intl.RelativeTimeFormat('en').format(yearCount, 'year')
    : 'less than a year ago';
};

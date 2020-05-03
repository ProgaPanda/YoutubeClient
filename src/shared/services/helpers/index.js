import relativeDate from 'relative-date';

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
 * Function to format date and returns the relative wording for the date
 * @param {Date} date date to format
 * @return {string} formatted string
 */
export const getRelativeDate = (date) => relativeDate(date);

/**
 * Function to get relative date x hours from today
 * @param {number} hours
 * @return {Date} generated date
 */
export const getDateXHoursAgo = (hours) => new Date(Date.now() - hours * 60 * 60 * 1000);

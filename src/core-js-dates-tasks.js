/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  const start = new Date(date);
  return start.getTime();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }
  return `${hour}:${minute}:${second}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const week = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const data = new Date(date);
  const day = data.getDay();
  return week[`${day}`];
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  let newData;
  const getDay = date.getDay();
  if (getDay === 5) {
    newData = new Date(date.getTime() + 86400000 * 7);
  }
  if (getDay > 5) {
    newData = new Date(date.getTime() + 86400000 * 6);
  }
  if (getDay < 5) {
    newData = new Date(date.getTime() + 86400000 * (5 - getDay));
  }
  return newData;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const data1 = new Date(year, month);
  const data2 = new Date(year, month - 1);
  const res = data2.getTime() - data1.getTime();
  return -1 * (res / 86400000);
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const data1 = new Date(dateStart);
  const data2 = new Date(dateEnd);
  const res = data2.getTime() - data1.getTime();
  return res / 86400000 + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  let result = false;
  if (
    Date.parse(date) >= Date.parse(period.start) &&
    Date.parse(period.end) >= Date.parse(date)
  ) {
    result = true;
  }

  return result;
}
/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const data = new Date(date);
  const year = data.getFullYear();
  const month = data.getMonth() + 1;
  const day = parseInt(data.toJSON().slice(8, 10), 10);
  let hour = parseInt(data.toJSON().slice(11, 13), 10);
  const minute = data.getMinutes();
  const second = data.getSeconds();
  let amOrPM;
  if (hour < 12) {
    amOrPM = 'AM';
  } else if (hour === 12) {
    amOrPM = 'PM';
    hour = 12;
  } else {
    amOrPM = 'PM';
    hour -= 12;
  }
  return `${month}/${day}/${year}, ${hour}:${`${minute}`.padStart(2, '0')}:${`${second}`.padStart(2, '0')} ${amOrPM}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const data = new Date();
  data.setFullYear(year);
  data.setMonth(month);
  data.setDate(0);
  let result = 0;
  const count = data.getDate();

  for (let i = 0; i < count; i += 1) {
    data.setDate(i + 1);
    if (data.getDay() === 6 || data.getDay() === 0) {
      result += 1;
    }
  }
  return result;
}

/**
 * Returns the week number of the year for a given date.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const now = new Date(date);
  const start = new Date(date.getFullYear(), 0, 1);

  const firstWeek = 7 - (start.getDay() || 7) + 1;
  const day = Math.ceil((now - start) / (24 * 3600 * 1000)) + 1;
  const result = Math.ceil((day - firstWeek) / 7) + 1;
  return result;
}
/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  let current = date;
  let result;
  for (let i = 0; i < 1000; i += 1) {
    current = new Date(current.getTime() + 86400000);
    if (current.getDay() === 5 && current.getDate() === 13) {
      result = current;
      break;
    }
  }
  return result;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  let result = '';
  if (date.getMonth() < 3) {
    result = '1';
  }
  if (date.getMonth() < 6 && date.getMonth() > 2) {
    result = '2';
  }
  if (date.getMonth() < 9 && date.getMonth() > 5) {
    result = '3';
  }
  if (date.getMonth() < 12 && date.getMonth() > 8) {
    result = '4';
  }
  return result;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const result = [];

  const start = Date.parse(period.start.split('-').reverse().join('-'));
  const end = Date.parse(period.end.split('-').reverse().join('-'));

  let wEnd = 0;
  let wDay = 0;

  for (let i = start; i <= end; i += 86400000) {
    const now = new Date(i);

    if (countWorkDays > wDay) {
      result.push(
        `${now.getDate().toString().padStart(2, 0)}-${(now.getMonth() + 1)
          .toString()
          .padStart(2, 0)}-${now.getFullYear()}`
      );
      wDay += 1;
      if (countWorkDays === wDay) {
        wEnd = 0;
      }
    } else if (countOffDays > wEnd) {
      wEnd += 1;
      if (countOffDays === wEnd) {
        wDay = 0;
      }
    }
  }

  return result;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};

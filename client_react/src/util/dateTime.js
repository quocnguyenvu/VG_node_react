import moment from 'moment';

const format = {
  default: 'DD/MM/YYYY',
  internationalDateTime: 'DD/MM/YYYY HH:mm',
};

/**
 * Example format: 11/12/2019 19:00
 */
export const dateTime = (date) => {
  return moment(date).format(format.default);
};

/**
 * Example format: 11/12/2019 19:00
 */
export const internationalDateTime = (date) => {
  return moment(date).format(format.internationalDateTime);
};

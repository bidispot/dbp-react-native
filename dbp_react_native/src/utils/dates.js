import moment from 'moment';

const parseDateToMillis = (date) => {
  return (date != null ? new Date(date).getTime() : null);
};

const convertToUTCStartOfDay = (date) => {
  return (date != null ? moment(date).startOf('day').utc().valueOf() : null);
};

const convertToUTCEndOfDay = (date) => {
  return date != null ? moment(date).endOf('day').utc().valueOf() : null;
};

const convertDateFromMillis = (date) => {
  return (date != null ? new Date(date).toISOString() : null);
};

const formatDate = (date, format) => {
  if (date == null || date === undefined || date === '' || format == null 
    || format === undefined || format === '') {
    return '';
  }
  return moment(date).format(format);
};

export default {
  parseDateToMillis,
  convertToUTCStartOfDay,
  convertToUTCEndOfDay,
  convertDateFromMillis,
  formatDate
};

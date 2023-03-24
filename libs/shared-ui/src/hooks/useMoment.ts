
import moment from 'moment';
moment.locale('es');

export const useMoment = () => {

  const formatDate = (date: string) => {
    const result = moment(date).format('MMM D YYYY, h:mm a');
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const customFormatDate = (date: string, format: string) => {
    const result = moment(date).format(format);
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const fromNow = (date: string) => {
    return moment(date).fromNow();
  };

  return {
    formatDate,
    fromNow,
    customFormatDate,
    dateNow: moment(),
    moment: moment
  };
};

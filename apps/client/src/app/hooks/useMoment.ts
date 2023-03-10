
import moment from 'moment';
moment.locale('es');

export const useMoment = () => {

  const formatDate = (date: string) => {
    return moment(date).format('MMM D YYYY, h:mm a')
  };

  return {
    formatDate,
  };
};

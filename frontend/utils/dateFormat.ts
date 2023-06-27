import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const dateFormatter = (date: Date) => {
  const dateObject = new Date(date);
  const dateFormated = format(dateObject, 'dd MMMM yyyy', {
    locale: fr
  });
  return dateFormated;
};

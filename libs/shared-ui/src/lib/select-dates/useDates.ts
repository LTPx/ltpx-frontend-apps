import { useState } from 'react';
import { DateItem } from './select-dates';

export const useDates = (meeting: DateItem[]) => {
  const [dates, setDates] = useState(meeting);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [currentDate, setCurrentDate] = useState<any>();

  const currentDates = new Date();
  const today = currentDates.toISOString().split('T')[0] + 'T06:30';

  function addDates() {
    setDates([...dates, { date: today}]);
  }

  function updateDates(date: any) {
    return dates.map((d: any, i: number | undefined) => (i === selectedIndex ? date : d));
  }

  function processDates(date: any) {
    // const result = selectedIndex !== undefined ? updateDates(date) : addDates(date);
    // setDates(result);
    // setCurrentDate(undefined);
  }

  function removeDates(index: number) {
    const result = dates.map((date, i) => {
      date._destroy = i === index ? true : !!date._destroy;
      return date;
    });
    setDates(result);
  }


  return {
    addDates,
    updateDates,
    removeDates,
    selectedIndex,
    setSelectedIndex,
    setCurrentDate,
    currentDate,
    processDates,
    setDates,
    dates
  };
}

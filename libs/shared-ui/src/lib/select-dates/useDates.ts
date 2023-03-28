import { useState } from 'react';

export const useDates = (meeting: any) => {
  const [dates, setDates] = useState(meeting);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [currentDate, setCurrentDate] = useState<any>();
  
  function addDates(date: any) {
    return dates.concat([date]);
  }

  function updateDates(date: any) {
    return dates.map((d: any, i: number | undefined) => (i === selectedIndex ? date : d));
  }

  function processDates(date: any) {
    const result = selectedIndex !== undefined ? updateDates(date) : addDates(date);
    setDates(result);
    setCurrentDate(undefined);
  }
  function removeDates(index: number) {
    const result = dates.map((date: { _destroy: boolean; }, i: number) => {
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
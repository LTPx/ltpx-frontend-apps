import moment from 'moment';
import { useState } from 'react';
import { useMoment } from '../../hooks/useMoment';
import Icon from '../icon/icon';
import Input from '../input/input';
import styles from './select-dates.module.scss';
import { useDates } from './useDates';

/* eslint-disable-next-line */
export interface SelectDatesProps {
  name?: string;
  min?: string;
  onChange?: (dates: string[]) => void;
  meetingDates?: any[];
}

const currentDate = new Date();

export function SelectDates(props: SelectDatesProps) {
  const { name, min, onChange, meetingDates } = props;
  const today = currentDate.toISOString().split('T')[0] + 'T06:30';

  const {
    addDates,
    updateDates,
    selectedIndex,
    setSelectedIndex,
    setCurrentDate,
    processDates,
    removeDates,
    setDates,
    dates
  } = useDates(meetingDates || today);

  // const addNewDate = () => {
  //   setDates([...dates, today]);
  //   onChange && onChange(dates);
  // };
  // const removeForm = (index: number) => {
  //   const copyDates = [...dates];
  //   copyDates.splice(index, 1);
  //   setDates(copyDates);
  //   onChange && onChange(copyDates);
  // };

  // function removeDates(index: number) {
  //   const result = dates.map((date, i) => {
  //     date._destroy = i === index ? true : !!date._destroy;
  //     return date;
  //   });
  //   setDates(result);
  // }

  // const handleDateChange = (data: any, index: number) => {
  //   const copyDates = [...dates];
  //   copyDates[index] = data.currentTarget.value;
  //   setDates(copyDates);
  //   onChange && onChange(copyDates);
  // };

  return (
    <div className={styles['container']}>
      {/* {dates &&
        dates.map((date, index) => (
          <div className={styles['date-item']} key={index}>
            <Input
              type="datetime-local"
              name={name}
              value={moment(date).format('YYYY-MM-DDTHH:mm')}
              min={dates[index - 1] || today}
              onChange={(e: any) => {
                handleDateChange(e, index);
              }}
            />
            <Icon icon="close" size={18} onClick={() => removeDates(index)} />
          </div>
        ))}
      <h4 className={styles['add-date']} onClick={addNewDate}>
        {' '}
        + Nueva Fecha
      </h4> */}
    </div>
  );
}

export default SelectDates;

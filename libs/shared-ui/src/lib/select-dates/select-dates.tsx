import { useState } from 'react';
import Icon from '../icon/icon';
import Input from '../input/input';
import styles from './select-dates.module.scss';

/* eslint-disable-next-line */
export interface SelectDatesProps {
  name?: string;
  min?: string;
  onChange?: (dates: string[]) => void;
}

const currentDate = new Date();

export function SelectDates(props: SelectDatesProps) {
  const { name, min, onChange } = props;
  const today = currentDate.toISOString().split('T')[0] + 'T06:30';
  const [dates, setDates] = useState([today]);
  // 2018-06-07T00:00
  console.log('today: ', today);

  const addNewDate = () => {
    setDates([...dates, today]);
    onChange && onChange(dates);
  }

  const removeForm = (index: number) => {
    const copyDates = [...dates];
    copyDates.splice(index, 1);
    setDates(copyDates);
    onChange && onChange(dates);
  }

  const handleDateChange = (data: any, index: number) => {
    const copyDates = [...dates];
    copyDates[index] = data.currentTarget.value;
    setDates(copyDates);
    onChange && onChange(dates);
    console.log(copyDates);
  }

  return (
    <div className={styles['container']}>
      { dates.map((date, index)=>(
        <div className={styles['date-item']} key={index}>
          <Input
            type="datetime-local"
            name={name}
            value={date}
            min={dates[index-1] || today}
            onChange={(e:any)=>{handleDateChange(e, index)}}
          />
          <Icon icon='close' size={18} onClick={() => removeForm(index)}/>
        </div>
      ))}
      <h4 className={styles['add-date']} onClick={addNewDate}> + Nueva Fecha</h4>
    </div>
  );
}

export default SelectDates;

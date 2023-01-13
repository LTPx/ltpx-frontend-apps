import { useState } from 'react';
import Select from '../select/select';
import styles from './time-picker.module.scss';

const hours = [
  {text:'01', value: '1'},
  {text:'02', value: '2'},
  {text:'03', value: '3'},
  {text:'04', value: '4'},
  {text:'05', value: '5'},
  {text:'06', value: '6'},
  {text:'07', value: '7'},
  {text:'08', value: '8'},
  {text:'09', value: '9'},
  {text:'10', value: '10'},
  {text:'11', value: '11'},
  {text:'12', value: '12'},
];
const minutes = [
  {text: '00', value: '00'},
  {text: '15', value: '15'},
  {text: '30', value: '30'},
  {text: '45', value: '45'},
];
const meridian = [ {text: 'AM', value: 'AM'}, {text: 'PM', value: 'PM'} ];

/* eslint-disable-next-line */
export enum TypesTime {
  hour = 'hour',
  minutes = 'minutes',
  meridian = 'meridian',
}

export interface TimeSelected {
  hour: string;
  minutes: string;
  meridian: string;
}

export interface TimePickerProps {
  onChange?: (time: TimeSelected) => void
}

export function TimePicker(props: TimePickerProps) {
  const { onChange } =props;

  const handleChange = (op: any, key: TypesTime) => {
    const timeSelected = {
      hour: hours[7].value,
      minutes: minutes[0].value,
      meridian: meridian[0].value,
    };
    timeSelected[key] = op.value;
    onChange && onChange(timeSelected);
  }

  return (
    <div className={styles['container']}>
      <Select
        className={styles['select']}
        options={hours}
        selected= {hours[7]}
        onChange={(op)=>{handleChange(op, TypesTime.hour)}}/>
      <Select
        className={styles['select']}
        options={minutes}
        selected= {minutes[0]}
        onChange={(op)=>{handleChange(op, TypesTime.minutes)}}/>
      <Select
        className={styles['select']}
        options={meridian}
        selected= {meridian[0]}
        onChange={(op)=>{handleChange(op, TypesTime.meridian)}}/>
    </div>
  );
}

export default TimePicker;

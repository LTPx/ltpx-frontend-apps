import { useState } from 'react';
import SelectDates from '../select-dates/select-dates';
import Select from '../select/select';
import styles from './classroom-form.module.scss';

export interface Classroom {
  students: {
    min: number;
    max: number;
  },
  meetings: {
   durationMin: number,
   dates: string[]
  }
}
/* eslint-disable-next-line */
export interface ClassroomFormProps {
  onChange?: (data: Classroom) => void
}

export function ClassroomForm(props: ClassroomFormProps) {
  const { onChange } = props;

  const [formData, setFormData] = useState<Classroom>(
    {
      students: {
        min: 1,
        max: 5
      },
      meetings: {
        durationMin: 0,
        dates: []
      }
    }
  );

  const hours = [
    { value: '0', text: '0' },
    { value: '60', text: '1' },
    { value: '120', text: '2' },
    { value: '180', text: '3' },
    { value: '240', text: '4' },
  ];

  const minutes = [
    { value: '00', text: '00' },
    { value: '15', text: '15' },
    { value: '30', text: '30' },
    { value: '45', text: '45' },
  ];

  const numbers = [
    { value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '3', text: '3' },
    { value: '4', text: '4' },
    { value: '5', text: '5' },
    { value: '6', text: '6' },
    { value: '7', text: '7' },
    { value: '8', text: '8' },
    { value: '9', text: '9' },
    { value: '10', text: '10' },
  ];

  const handleDates = (dates: string[]) => {
    setFormData(prevState => ({
      ...prevState,
      meetings: {
        ...prevState.meetings,
        dates: dates
      }
    }));
    onChange && onChange(formData);
  }

  const updateMin = (e:any) => {
    setFormData(prevState => ({
      ...prevState,
      students: {
        ...prevState.students,
        min: parseInt(e.value)
      }
    }));
    onChange && onChange(formData);
  }

  const updateMax = (e:any) => {
    setFormData(prevState => ({
      ...prevState,
      students: {
        ...prevState.students,
        max: parseInt(e.value)
      }
    }));
    onChange && onChange(formData);
    console.log('form: ', formData);
  }

  let h = 0;
  let min = 0;

  const handleDuration = (e:any, key: string) => {
    const minutes = parseInt(e.value);
    if (key === 'hours') {
      h = h + minutes;
    } else {
      min = min + minutes;
    }
    // console.log('hours: ', h, ' minutes: ', min);
    setFormData(prevState => ({
      ...prevState,
      meetings: {
        ...prevState.meetings,
        durationMin: h + min
      }
    }));
    onChange && onChange(formData);
    // console.log(formData);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['field-form']}>
        <label>Tamaño de la clase</label>
        <div className={styles['range']}>
          De <Select options={numbers} onChange={(e)=>{updateMin(e)}}/> a
          <Select options={numbers} onChange={(e)=>{updateMax(e)}}/> Estudiantes
        </div>
      </div>
      <div className={styles['field-form']}>
        <label>Duracion de la clases</label>
        <div className={styles['range']}>
          Cada clase durara  <Select options={hours} onChange={(e)=>{handleDuration(e, 'hours')}}/>  hora(s), con
          <Select options={minutes} onChange={(e)=>{handleDuration(e, 'minutes')}}/> minutos
        </div>
      </div>
      <div className={styles['field-form']}>
        <label>Las clases seran en estas fechas</label>
        <SelectDates onChange={(dates)=>{handleDates(dates)}}/>
      </div>
    </div>
  );
}

export default ClassroomForm;

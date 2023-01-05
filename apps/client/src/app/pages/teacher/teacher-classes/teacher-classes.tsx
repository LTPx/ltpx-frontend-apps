import { Icon, Select } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './teacher-classes.module.scss';

export enum ClassesSchedule {
  one = 'one-time',
  multi = 'multi-day',
  ongoing = 'ongoing',
  flexible = 'flexible',
}

const classesScheduleOptions = [
  {
    value: ClassesSchedule.one,
    text: 'Una sola vez'
  },
  {
    value: ClassesSchedule.multi,
    text: 'Varios dias a la semana'
  },
  {
    value: ClassesSchedule.ongoing,
    text: 'Varios dias a la semana no obligatorio a asistir'
  },
  {
    value: ClassesSchedule.flexible,
    text: 'Se acuerda con el estudiante los horarios'
  }
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

const days = [
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '4', text: '4' },
  { value: '5', text: '5' },
  { value: '6', text: '6' },
  { value: '7', text: '7' }
];

const hours = [
  { value: '0', text: '0' },
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '4', text: '4' },
];

const minutes = [
  { value: '00', text: '00' },
  { value: '05', text: '05' },
  { value: '10', text: '10' },
  { value: '15', text: '15' },
  { value: '20', text: '20' },
  { value: '25', text: '25' },
  { value: '30', text: '30' },
  { value: '35', text: '35' },
  { value: '40', text: '40' },
  { value: '50', text: '50' },
  { value: '55', text: '55' },
];

const daysWeek = [
  { name: 'Lunes', hour: '10am', date: 'Monday 9', selected: false},
  { name: 'Martes', hour: '10am', date: 'Monday 10', selected: false},
  { name: 'Miercoles', hour: '10am', date: 'Monday 11', selected: false},
  { name: 'Jueves', hour: '10am', date: 'Monday 12', selected: false},
  { name: 'Viernes', hour: '10am', date: 'Monday 12', selected: false},
  { name: 'Sabado', hour: '10am', date: 'Monday 13', selected: false},
  { name: 'Domingo', hour: '10am', date: 'Monday 14', selected: false},
];

interface DayConfig {
  name: string;
  hour: string;
  date: string;
  selected: boolean;
}
/* eslint-disable-next-line */
export interface TeacherClassesProps {
  onChange: () => void;
}

export function TeacherClasses(props: TeacherClassesProps) {
  const [daysConfig, setDaysConfig] = useState(daysWeek);
  const [daysSelected, setDaysSelected] = useState<DayConfig[]>([]);

  const selectDay = (index: number) => {
    let days = [...daysConfig];
    days[index].selected = !days[index].selected;
    const myDays = filterSelectedDays();
    setDaysSelected(myDays);
    setDaysConfig(days);
  }

  const filterSelectedDays = () => {
    return daysConfig.filter((day)=> day.selected);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>Sesiones</h2>
        <h4 className='muted'>Configura y agenda clases con tus estudiantes</h4>
      </div>
      <div className={styles['content-form']}>
        <Select options={classesScheduleOptions}  label='Tipo de clase'/>
        <div className={styles['field-form']}>
          <label>Tamaño de la clase</label>
          <div className={styles['range']}>
            De
            <div className="min">
              <Select options={numbers}/>
             </div>
             a
             <div className="max">
              <Select options={numbers}/>
             </div>
             Estudiantes
          </div>
        </div>
        <div className={styles['field-form']}>
          <label>Duracion de la clases</label>
          <div className={styles['range']}>
            Cada clase durara
             <div className="min">
              <Select options={hours}/>
             </div>
             hora(s), con
             <div className="max">
              <Select options={minutes}/>
             </div>
             minutos
          </div>
          <div className={styles['range']}>
            Nos reuniremos
            <div className="min">
              <Select options={days}/>
            </div>
             dia(s) a la semana, por
             <div className="max">
              <Select options={numbers}/>
             </div>
             semanas
          </div>
          <div className={styles['days']}>
            { daysConfig.map((day, index)=>(
              <div className={`${styles['day']} ${day.selected ? styles['selected'] : ''}`}
                key={index}
                onClick={()=>{selectDay(index)}}
              >
                <Icon icon={`${day.selected ? 'checkbox' : 'un-checkbox'}`} size={15}/>
                {day.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherClasses;

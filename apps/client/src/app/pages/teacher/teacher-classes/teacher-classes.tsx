import { Select } from '@ltpx-frontend-apps/shared-ui';
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
  { value: '6', text: '6' }
];

const minutes = [
  { value: '1', text: '00' },
  { value: '2', text: '05' },
  { value: '3', text: '10' },
  { value: '4', text: '15' },
  { value: '5', text: '20' },
  { value: '6', text: '25' },
  { value: '7', text: '30' },
  { value: '8', text: '35' },
  { value: '9', text: '40' },
];
/* eslint-disable-next-line */
export interface TeacherClassesProps {

}

export function TeacherClasses(props: TeacherClassesProps) {
  const minStudents = 1;
  const maxStudents = 15;
  const minAge = 6;
  const maxAge = 12;
  const durationClassMinutes = 60;
  const daysClassPerWeek = 3;
  const timesPerWeek = 2;

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>Clases</h2>
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
            Nos reuniremos
            <div className="min">
              <Select options={numbers}/>
             </div>
             dia(s) a la semana, por
             <div className="max">
              <Select options={numbers}/>
             </div>
             semanas
          </div>
          <div className={styles['range']}>
            Cada clase durara
             <div className="max">
              <Select options={numbers}/>
             </div>
             hora(s), con
             <div className="max">
              <Select options={minutes}/>
             </div>
             minutos
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherClasses;

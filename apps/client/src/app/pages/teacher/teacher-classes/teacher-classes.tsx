import { BannerNotification, BannerType, Classroom, ClassroomForm, DayTimePicker, Icon, Input, Select, SelectDates, TimePicker } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './teacher-classes.module.scss';

export enum TeacherClassType {
  none = 'none',
  mandatory = 'mandatory',
  flexible = 'flexible',
  customize = 'customize',
}

const classesTypeOptions = [
  {
    value: TeacherClassType.none,
    text: 'Este curso no requiere de clases'
  },
  {
    value: TeacherClassType.mandatory,
    text: 'Este curso necesita clases y que los estudiantes asistan'
  },
  {
    value: TeacherClassType.flexible,
    text: 'Este curso necesita clases pero no es necesario que los estudiantes asista ah todas las clases'
  },
  {
    value: TeacherClassType.customize,
    text: 'Se acuerda con el estudiante las clases y horarios'
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
  const [selectedTypeClass, setSelectedTypeClass] = useState<string>(TeacherClassType.mandatory);

  // const [daysConfig, setDaysConfig] = useState(daysWeek);
  // const [daysSelected, setDaysSelected] = useState<DayConfig[]>([]);

  // const selectDay = (index: number) => {
  //   let days = [...daysConfig];
  //   days[index].selected = !days[index].selected;
  //   const myDays = filterSelectedDays();
  //   setDaysSelected(myDays);
  //   setDaysConfig(days);
  // }

  const handleClasses = (data: Classroom) => {
    console.log(data);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>Sesiones</h2>
        <h4 className='muted'>Configura y agenda clases con tus estudiantes</h4>
      </div>
      <div className={styles['content-form']}>
        <Select
          label='Condiciones de aprobacion'
          options={classesTypeOptions}
          onChange={(option)=>{setSelectedTypeClass(option.value.toString())}}
        />
        <div className={styles['render-content']}>
          { selectedTypeClass === TeacherClassType.none && (
            <BannerNotification type={BannerType.info}>
              <p>No se requiere de clases para que los estudiante apruebe este curso</p>
            </BannerNotification>
          )}
          { selectedTypeClass === TeacherClassType.customize && (
            <BannerNotification type={BannerType.info}>
              <p>Este curso require de clases que se acordaran con los estudiante</p>
            </BannerNotification>
          )}
          { selectedTypeClass === TeacherClassType.mandatory && (
            <>
              <ClassroomForm onChange={(data)=>{handleClasses(data)}}/>
            </>
          )}
        </div>










        {/* <div className={styles['field-form']}>
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
          <div className={styles['days-config']}>
            <label>Se reuniran los dias</label>
            <div className={styles['days']}>
              { daysConfig.map((day, index)=>(
                <DayTimePicker name={day.name} key={index}/>
              ))}
            </div>
          </div>
          <div className={styles['days-config']}>
            <label>A partir de la fecha</label>
             <Input type="date" name="party" min="2023-01-04"/>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default TeacherClasses;


// [{
//   condition: 'no mandatory',
//   min: 3,
//   max: 5,
//   weeks: 2,
//   timeMin: 45,
//   meetings: [
//     { date: 'Monday 9', hour: '9am'},
//     { date: 'Wednesday 11', hour: '9am'},
//     { date: 'Friday 13', hour: '9am'},
//     { date: 'Monday 16', hour: '9am'},
//     { date: 'Wednesday 17', hour: '9am'},
//     { date: 'Friday 18', hour: '9am'},
//   ]
// }]

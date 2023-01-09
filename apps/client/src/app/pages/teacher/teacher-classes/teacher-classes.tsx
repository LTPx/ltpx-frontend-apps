import { TeacherClassType } from '@ltpx-frontend-apps/api';
import { BannerNotification, BannerType, Classroom, ClassroomForm, DayTimePicker, Icon, Input, Modal, OptionSelect, Select, SelectDates, TimePicker } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './teacher-classes.module.scss';


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
    text: 'Se acuerda con el estudiante'
  }
];

/* eslint-disable-next-line */
export interface TeacherClassesProps {
  onChange?: () => void;
}

export function TeacherClasses(props: TeacherClassesProps) {
  const { onChange } = props;
  const data = {
    condition: TeacherClassType.none,
    min: 3,
    max: 5,
    weeks: 2,
    call_time_min: 45,
    meetings: []
  };

  const [ dataForm, setDataForm] = useState(data);
  const [selectedTypeClass, setSelectedTypeClass] = useState<string>(TeacherClassType.mandatory);

  const handleClasses = (data: Classroom) => {
    console.log(data);
  }

  const handleCondition = (option: OptionSelect) => {
    setSelectedTypeClass(option.value.toString());
  }

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>Sesiones</h2>
        <h4 className='muted'>Configura y agenda clases con tus estudiantes</h4>
      </div>
      <div className={styles['content-form']}>
        <Select
          label='Condiciones de aprobación'
          options={classesTypeOptions}
          onChange={(option)=>{handleCondition(option)}}
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
            <h1>Open</h1>
          )}
        </div>
      </div>
      <Modal>
        <div className={styles['content-form']}>
          <Select
            label='Condiciones de aprobación'
            options={classesTypeOptions}
            onChange={(option)=>{handleCondition(option)}}
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
        </div>
      </Modal>
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

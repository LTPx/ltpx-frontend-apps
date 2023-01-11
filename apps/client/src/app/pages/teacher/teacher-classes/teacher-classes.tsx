import { TeacherClassType } from '@ltpx-frontend-apps/api';
import {
  BannerNotification,
  BannerType,
  Classroom,
  ClassroomForm,
  DayTimePicker,
  GroupSelectOptionCard,
  Icon,
  Input,
  Modal,
  OptionSelect,
  Select,
  SelectDates,
  SelectOptionCardProps,
  TimePicker,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './teacher-classes.module.scss';

// title: string;
// text: string;
// icon: string;
// selected?: boolean;
const classesTypeOptions = [
  {
    value: TeacherClassType.mandatory,
    title: 'CLASES OBLIGATORIAS',
    text: 'Este curso necesita clases y que los estudiantes asistan a todas las clases',
    icon: 'user',
  },
  {
    value: TeacherClassType.flexible,
    title: 'CLASES FLEXIBLES',
    text: 'Este curso necesita clases pero no es necesario que los estudiantes asista ah todas las clases',
    icon: 'sliders',
  },
  {
    value: TeacherClassType.customize,
    title: 'CLASES PERSONALIZADAS',
    text: 'Se acuerda con el estudiante hora y días en las que se dictaran las clases',
    icon: 'mate',
  },
  {
    value: TeacherClassType.none,
    title: 'NO SE REQUIERE CLASES',
    text: 'No se requiere de clases para que los estudiante apruebe este curso',
    icon: 'forbidden',
  },
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
    meetings: [],
  };

  const [dataForm, setDataForm] = useState(data);
  const [selectedTypeClass, setSelectedTypeClass] = useState<string>(
    TeacherClassType.mandatory
  );

  const handleClasses = (data: Classroom) => {
    console.log(data);
  };

  const handleCondition = (option: OptionSelect) => {
    setSelectedTypeClass(option.value.toString());
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>Sesiones</h2>
        <h4 className="muted">Configura y agenda clases con tus estudiantes</h4>
      </div>
      <GroupSelectOptionCard
        className={styles['classes-options']}
        options={classesTypeOptions}
        onChange={() => {}}
      />
      <Modal open={false}>
        <div className={styles['content-form']}>
          <ClassroomForm
            onChange={(data) => {
              handleClasses(data);
            }}
          />
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

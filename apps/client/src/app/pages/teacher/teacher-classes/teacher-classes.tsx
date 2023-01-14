import { TeacherClassType } from '@ltpx-frontend-apps/api';
import {
  BannerNotification,
  BannerType,
  Button,
  ClassroomForm,
  ColorsButton,
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
const classesOptions = [
  {
    value: TeacherClassType.mandatory,
    title: 'CLASES OBLIGATORIAS',
    text: 'Este curso requiere que los estudiantes asistan a todas las clases',
    icon: 'user',
  },
  {
    value: TeacherClassType.flexible,
    title: 'CLASES FLEXIBLES',
    text: 'Este curso no requiere que los estudiantes asistan a todas las clases',
    icon: 'sliders',
  },
  {
    value: TeacherClassType.customize,
    title: 'CLASES PERSONALIZADAS',
    text: 'En este curso se acuerda con el estudiante hora y días en las que se dictaran las clases',
    icon: 'mate',
  },
  {
    value: TeacherClassType.none,
    title: 'NO SE REQUIERE CLASES',
    text: 'Este curso no requiere de clases para que los estudiante apruebe este curso',
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

  const [classroom, setClassroom] = useState(data);
  const [openModal, setOpenModal] = useState(false);

  const selectedOptionClass = (option: any) => {
    console.log(option);
    if (option === TeacherClassType.mandatory || option === TeacherClassType.flexible) {
      setOpenModal(true);
    }
  };

  const handleClassroom = (classroom: any) => {
    setClassroom(classroom);
  };

  const formatDatetime = (date: string) => {
    return date.split('T').join(' a las ');
  }

  const toHoursAndMinutes = (totalMinutes: number)  => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  }

  const ClassroomSummary = () => (
    <div className={styles['classroom-summary']}>
      <h3>Resumen de las clases</h3>
      <h4>Este curso tendrá un rango de: {classroom.min} a {classroom.max} de estudiantes</h4>
      <h4>Cada clase durara: {toHoursAndMinutes(classroom.call_time_min)}</h4>
      <h4>Las clases se dictaran los días: </h4>
      { classroom.meetings.map((date)=>(
        <li>{formatDatetime(date)}</li>
      ))}
    </div>
  );

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>Sesiones</h2>
        <h4 className="muted">Configura y agenda clases con tus estudiantes</h4>
      </div>
      <GroupSelectOptionCard
        className={styles['classes-options']}
        options={classesOptions}
        onChange={(option) => { selectedOptionClass(option) }}
      />
      { classroom && (
        <ClassroomSummary/>
      )}
      <Modal open={openModal}>
        <div className={styles['content-form']}>
          <h2>Crear Clases</h2>
          <ClassroomForm
            onSubmit={(data) => {
              handleClassroom(data);
            }}
          >
            <Button
              title="Cancelar"
              color={ColorsButton.white}
              onClick={() => { setOpenModal(false) }}
            />
          </ClassroomForm>
        </div>
      </Modal>
    </div>
  );
}

export default TeacherClasses;

import { Classroom, TeacherClassType } from '@ltpx-frontend-apps/api';
import {
  Button,
  ClassroomForm,
  ClassroomView,
  ColorsButton,
  GroupSelectOptionCard,
  Modal,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './teacher-classes.module.scss';

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
  onChange?: (classroom: Classroom) => void;
}

export function TeacherClasses(props: TeacherClassesProps) {
  const { onChange } = props;
  const data = {
    min: 3,
    max: 5,
    weeks: 2,
    call_time_min: 45,
    meetings: [],
  };

  const [selectedTypeClass, setSelectedTypeClass] = useState(
    TeacherClassType.none
  );
  const [classroom, setClassroom] = useState(data);
  const [openModal, setOpenModal] = useState(false);

  const selectedOptionClass = (option: any) => {
    if (
      option === TeacherClassType.mandatory ||
      option === TeacherClassType.flexible
    ) {
      setOpenModal(true);
    }
    setSelectedTypeClass(option);
  };

  const handleClassroom = (classroom: any) => {
    setClassroom(classroom);
    const data = { ...classroom, ...{ condition: selectedTypeClass } };
    onChange && onChange(data);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>Sesiones</h2>
        <h4 className="muted">Configura y agenda clases con tus estudiantes</h4>
      </div>
      <GroupSelectOptionCard
        className={styles['classes-options']}
        options={classesOptions}
        onChange={(option) => {
          selectedOptionClass(option);
        }}
      />
      {classroom && (
        <ClassroomView
          classroom={classroom}
          className={styles['classroom-summary']}
        />
      )}
      <Modal open={openModal}>
        <div className={styles['content-form']}>
          <h2>Crear Clases</h2>
          <ClassroomForm
            onSubmit={(data) => {
              handleClassroom(data);
              setOpenModal(false);
            }}
          >
            <Button
              title="Cancelar"
              color={ColorsButton.white}
              onClick={() => {
                setOpenModal(false);
              }}
            />
          </ClassroomForm>
        </div>
      </Modal>
    </div>
  );
}

export default TeacherClasses;

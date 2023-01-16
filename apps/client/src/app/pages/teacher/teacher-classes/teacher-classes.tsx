import { Classroom } from '@ltpx-frontend-apps/api';
import {
  Button,
  ClassroomView,
  CourseClasses,
  Icon,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './teacher-classes.module.scss';

/* eslint-disable-next-line */
export interface TeacherClassesProps {
  onChange?: (classroom: Classroom) => void;
}

export function TeacherClasses(props: TeacherClassesProps) {
  const { onChange } = props;
  // const data = {
  //   condition: '',
  //   min: 3,
  //   max: 5,
  //   call_time_min: 45,
  //   meetings: [],
  // };

  const [classroom, setClassroom] = useState();
  const [openModal, setOpenModal] = useState(false);

  // const handleClassroom = (classroom: any) => {
  //   setClassroom(classroom);
  //   const data = { ...classroom, ...{ condition: selectedTypeClass } };
  //   onChange && onChange(data);
  // };

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>Sesiones</h2>
        <h4 className="muted">
          Establece horarios y fechas para reunirte con tus estudiantes
        </h4>
      </div>
      <div className={styles['information']}>
        <Icon icon="cog" size={50} />
        <h4 className="muted">
          Elige la opción que mejor se acople para este curso
        </h4>
        <Button
          title="Configurar Ahora"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>
      <CourseClasses
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        onSave={(classroom) => {
          console.log(classroom);
          // setClassroom(classroom);
        }}
      />
      {classroom && (
        <ClassroomView
          classroom={classroom}
          className={styles['classroom-summary']}
        />
      )}
    </div>
  );
}

export default TeacherClasses;

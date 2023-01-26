import { Classroom, CLASSROOMS } from '@ltpx-frontend-apps/api';
import {
  ClassroomView,
  CourseClasses,
  InformationCard,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './teacher-classes.module.scss';

/* eslint-disable-next-line */
export interface TeacherClassesProps {
  onSubmit?: (classroom: Classroom) => void;
  initialClassroom?: Classroom;
}

export function TeacherClasses(props: TeacherClassesProps) {
  const { onSubmit, initialClassroom } = props;
  const [classroom, setClassroom] = useState<Classroom | null>(initialClassroom || null);
  const [openModal, setOpenModal] = useState(false);

  const handleClassroom = (classroom: any) => {
    console.log(classroom);
    setClassroom(classroom);
    onSubmit && onSubmit(classroom);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>Sesiones</h2>
        <h4 className="muted">
          Establece horarios y fechas para reunirte con tus estudiantes
        </h4>
      </div>
      {!classroom && (
        <SetupCard
          icon={'cog'}
          text={'Elige la opción que mejor se acople para este curso'}
          titleButton={'Configurar Ahora'}
          onClick={() => {
            setOpenModal(true);
          }}
        />
      )}
      <CourseClasses
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        onSave={(classroom) => {
          handleClassroom(classroom);
        }}
      />
      {classroom && (
        <div className={styles['classroom-preview']}>
          <InformationCard
            title={CLASSROOMS[classroom.condition].title}
            text={CLASSROOMS[classroom.condition].text}
            icon={CLASSROOMS[classroom.condition].icon}
            selected={true}
          />
          {classroom.meetings.length > 0 && (
            <ClassroomView
              classroom={classroom}
              className={styles['classroom-summary']}
            />
          )}
          <div
            className={styles['edit-btn']}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <h4>Editar clases</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherClasses;

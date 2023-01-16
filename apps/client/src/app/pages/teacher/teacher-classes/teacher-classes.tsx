import { Classroom, CLASSROOMS, TeacherClassType } from '@ltpx-frontend-apps/api';
import {
  Button,
  ClassroomView,
  CourseClasses,
  Icon,
  InformationCard,
  SelectOptionCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './teacher-classes.module.scss';

/* eslint-disable-next-line */
export interface TeacherClassesProps {
  onSubmit?: (classroom: Classroom) => void;
}

export function TeacherClasses(props: TeacherClassesProps) {
  const { onSubmit } = props;
  const [classroom, setClassroom] = useState<Classroom>();
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
      { !classroom && (
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
      { classroom &&  (
        <div className={styles['classroom-preview']}>
          <InformationCard
            title={CLASSROOMS[classroom.condition].title}
            text={CLASSROOMS[classroom.condition].text}
            icon={CLASSROOMS[classroom.condition].icon}
            selected={true}
          />
          { classroom.meetings.length > 0 && (
            <ClassroomView
              classroom={classroom}
              className={styles['classroom-summary']}
            />
          )}
          <div className={styles['edit-btn']} onClick={()=>{setOpenModal(true)}}>
            <h4>Editar clases</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherClasses;

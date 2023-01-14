import { Classroom, TeacherClassType } from '@ltpx-frontend-apps/api';
import {
  Button,
  ClassroomForm,
  ClassroomView,
  ColorsButton,
  CourseClasses,
  Drawer,
  GroupSelectOptionCard,
  Icon,
  Modal,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './teacher-classes.module.scss';
import { Dialog } from 'evergreen-ui';

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
      />
      {/* <Dialog
        isShown={openModal}
        title="Dialog title"
        onCloseComplete={() => setOpenModal(false)}
        confirmLabel="Guardar"
        width={'120vh'}
      >
        <div className={styles['modal-classroom']}>
          <GroupSelectOptionCard
            className={styles['classes']}
            options={classesOptions}
            onChange={(option) => {
              selectedOptionClass(option);
            }}
          />
          <div className={styles['content']}>
            <ClassroomForm
              onSubmit={(data) => {
                handleClassroom(data);
                setOpenModal(false);
              }}
            ></ClassroomForm>
          </div>
        </div>
      </Dialog> */}

      {classroom && (
        <ClassroomView
          classroom={classroom}
          className={styles['classroom-summary']}
        />
      )}
      {/* <Drawer open={openModal} onClose={()=>{setOpenModal(false)}}>
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
      </Drawer> */}
    </div>
  );
}

export default TeacherClasses;

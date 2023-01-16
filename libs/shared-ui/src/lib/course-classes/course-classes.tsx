import { Classroom, TeacherClassType } from '@ltpx-frontend-apps/api';
import { useState } from 'react';
import Button, { ColorsButton } from '../button/button';
import ClassroomForm from '../classroom-form/classroom-form';
import Drawer from '../drawer/drawer';
import GroupSelectOptionCard from '../group-select-option-card/group-select-option-card';
import styles from './course-classes.module.scss';

const classesOptions = [
  {
    value: 'classes',
    title: 'CLASES POR VIDEOCÁMARA',
    text: 'Este curso incluirá clases para los estudiantes',
    icon: 'person-video',
  },
  {
    value: TeacherClassType.customize,
    title: 'CLASES PERSONALIZADAS',
    text: 'Este curso se acuerda con el estudiante hora y días en las que se dictaran las clases',
    icon: 'sliders',
  },
  {
    value: TeacherClassType.none,
    title: 'NO SE REQUIERE CLASES',
    text: 'Este curso no requiere de clases para que los estudiante apruebe este curso',
    icon: 'forbidden',
  },
];

/* eslint-disable-next-line */
export interface CourseClassesProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: (classroom: Classroom) => void;
}

export function CourseClasses(props: CourseClassesProps) {
  const { open, onClose, onSave } = props;
  const [ selectedTypeClass, setSelectedTypeClass ] = useState(TeacherClassType.none);
  const [openClassroom, setOpenClassroom] = useState(false);

  const handleSelectedOption = (option: any) => {
    if (
      option === 'classes'
    ) {
      setOpenClassroom(true);
    }
    setSelectedTypeClass(option);
  };

  return (
    <div className={styles['container']}>
      <Drawer
        open={open}
        onClose={() => {
          onClose && onClose();
        }}
      >
        <div className={styles['content']}>
          <div className="d">
            <h2>Selecciona una opción </h2>
            <GroupSelectOptionCard
              className={styles['options']}
              options={classesOptions}
              onChange={(option) => {
                handleSelectedOption(option);
              }}
            />
          </div>
          <div className={styles['footer']}>
            <Button
              color={ColorsButton.white}
              onClick={() => {
                onClose && onClose();
              }}
              title="Cancelar"
            />
            <Button
              onClick={() => {
                onSave && onSave({
                  condition: selectedTypeClass,
                  max: 0,
                  min: 0,
                  call_time_min: 0,
                  meetings: []
                });
                onClose && onClose();
              }}
              title="Guardar"
              disabled={!selectedTypeClass}
            />
          </div>
        </div>
      </Drawer>
      <Drawer open={openClassroom}>
        <div className={styles['content']}>
          <h2>Crear Clase</h2>
          <ClassroomForm
            className={styles['classroom']}
            onSubmit={(data) => {
              onSave && onSave({...data, ...{ condition: selectedTypeClass }});
              setOpenClassroom(false);
              onClose && onClose();
            }}
          >
            <Button
              color={ColorsButton.white}
              onClick={() => {
                setOpenClassroom(false);
              }}
              title="Cancelar"
            />
          </ClassroomForm>
        </div>
      </Drawer>
    </div>
  );
}

export default CourseClasses;

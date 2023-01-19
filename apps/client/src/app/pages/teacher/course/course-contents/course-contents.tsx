import { ContentCourse } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  CourseContentForm,
  PanelAccordion,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './course-contents.module.scss';

/* eslint-disable-next-line */
export interface FormContent {
  title: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CourseContentsProps {}

export function CourseContents(props: CourseContentsProps) {
  const [openModal, setOpenModal] = useState(false);
  const [contentCourse, setContentCourse] = useState<ContentCourse[]>([]);

  return (
    <div className={styles['contents']}>
      <div className={styles['header-text']}>
        <h2>Contenidos</h2>
        <h4 className="muted">
          Agrega los contenidos que se impartirán en el desarrollo del curso
        </h4>
      </div>
      {contentCourse.length <1 && (
        <SetupCard
          onClick={() => {
            setOpenModal(true);
          }}
          icon={'caret-down'}
          text={'Añadir Contenido'}
          titleButton={'Configurar Ahora'}
        />
      )}
      <CourseContentForm
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        onSubmit={(data) => {
          setOpenModal(false);
          setContentCourse(contentCourse.concat([data]));
        }}
      />
      {contentCourse.length >= 1 && (
        <>
          {contentCourse.map((element, key) => (
            <PanelAccordion title={element.title} text={element.description} />
          ))}
          <Button
            title="+ Agregar otra sección"
            onClick={() => {
              setOpenModal(true);
            }}
            color={ColorsButton.primary}
          />
        </>
      )}
    </div>
  );
}

export default CourseContents;

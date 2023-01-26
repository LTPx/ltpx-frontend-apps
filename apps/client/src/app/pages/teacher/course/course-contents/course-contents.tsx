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
export interface CourseContentsProps {
  contents?: ContentCourse[];
  onSubmit?: (content: ContentCourse) => void;
}

export function CourseContents(props: CourseContentsProps) {
  const { contents, onSubmit } = props;
  const [ openModal, setOpenModal] = useState(false);
  const [ contentsCourse, setContentsCourse] = useState<ContentCourse[]>(contents || []);

  return (
    <div className={styles['contents']}>
      <div className={styles['header-text']}>
        <h2>Contenidos</h2>
        <h4 className="muted">
          Puedes agregar contenidos que sirvan de apoyo para tus estudiantes
        </h4>
      </div>
      {contentsCourse.length <1 && (
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
        onClose={() => setOpenModal(false)}
        onSubmit={(content) => {
          console.log(content)
          setOpenModal(false);
          setContentsCourse(contentsCourse.concat([content]));
          onSubmit && onSubmit(content);
        }}
      />
      {contentsCourse.length >= 1 && (
        <>
          {contentsCourse.map((element, key) => (
            <PanelAccordion title={element.title} text={element.description} key={key} />
          ))}
          <Button
            title="+ Agregar otra contenido"
            onClick={() => {
              setOpenModal(true);
            }}
            color={ColorsButton.accent}
          />
        </>
      )}
    </div>
  );
}

export default CourseContents;

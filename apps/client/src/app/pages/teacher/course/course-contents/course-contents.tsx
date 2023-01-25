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
  onSubmit?: (contents: ContentCourse[]) => void;
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
          Agrega los contenidos que se impartirán en el desarrollo del curso
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
        onSubmit={(data) => {
          console.log(data)
          setOpenModal(false);
          setContentsCourse(contentsCourse.concat([data]));
        }}
      />
      {contentsCourse.length >= 1 && (
        <>
          {contentsCourse.map((element, key) => (
            <PanelAccordion title={element.title} text={element.description} key={key} />
          ))}
          <Button
            title="+ Agregar otra sección"
            onClick={() => {
              setOpenModal(true);
            }}
            color={ColorsButton.accent}
          />
        </>
      )}
      <div className={styles['footer']}>
        <Button
          title='Cancelar'
          color={ColorsButton.white}
        />
        <Button
          title='Actualizar contenidos'
          color={ColorsButton.secondary}
          onClick={()=>{
            onSubmit && onSubmit(contentsCourse);
          }}
        />
      </div>
    </div>
  );
}

export default CourseContents;

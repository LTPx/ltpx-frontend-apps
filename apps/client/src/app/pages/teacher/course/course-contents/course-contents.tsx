import { ContentCourse } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  CourseContentForm,
  PanelAccordion,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import {
  useCourse
} from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import styles from './course-contents.module.scss';

/* eslint-disable-next-line */
export interface FormContent {
  title: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CourseContentsProps {
  onSubmit?: (content: ContentCourse) => void;
}

export function CourseContents(props: CourseContentsProps) {
  const { onSubmit } = props;
  const [ openModal, setOpenModal] = useState(false);
  const { contents } = useCourse();

  return (
    <div className={styles['contents']}>
      <div className={styles['header-text']}>
        <h2>Contenidos</h2>
        <h4 className="muted">
          Puedes agregar contenidos que sirvan de apoyo para tus estudiantes
        </h4>
      </div>
      {contents.length <1 && (
        <SetupCard
          onClick={() => {
            setOpenModal(true);
          }}
          icon={'copy'}
          text={'Los contenidos son recursos de textos para tus estudiantes'}
          titleButton={'Agregar Ahora'}
        />
      )}
      <CourseContentForm
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(content) => {
          console.log(content)
          setOpenModal(false);
          onSubmit && onSubmit(content);
        }}
      />
      {contents.length >= 1 && (
        <>
          {contents.map((element, key) => (
            <PanelAccordion title={element.title} text={element.description} key={key} />
          ))}
          <Button
            title="+ Agregar otro contenido"
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

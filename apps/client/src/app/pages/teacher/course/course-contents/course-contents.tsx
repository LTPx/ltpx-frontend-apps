import { ContentCourse } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  CourseContent,
  CourseContentForm,
  Icon,
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
  const [ contentEdit, setContentEdit] = useState<CourseContent>();
  const { course, removeContent } = useCourse();
  const { contents } = course;

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
      {contents.length >= 1 && (
        <>
          {contents.map((content, index) => (
            <PanelAccordion title={content.title} text={content.description} key={index}>
              <pre>{content.description}</pre>
              <div className={styles['actions']}>
                <div
                  className={styles['action']}
                  onClick={() => {
                    setContentEdit(content);
                    setOpenModal(true);
                  }}
                >
                  <Icon icon="pencil" size={15} />
                </div>
                <div
                  className={styles['action']}
                  onClick={() => {
                    removeContent(index)
                  }}
                >
                  <Icon icon="trash" size={15} />
                </div>
              </div>
            </PanelAccordion>
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
      { openModal && (
        <CourseContentForm
          content={contentEdit}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setContentEdit(undefined);
          }}
          onSubmit={(content) => {
            setOpenModal(false);
            onSubmit && onSubmit(content);
          }}
        />
      )}
    </div>
  );
}

export default CourseContents;

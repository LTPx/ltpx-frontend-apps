import { ContentCourse } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  CourseContent,
  CourseContentForm,
  PanelAccordion,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import {
  useCourse
} from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import { ResponseRequest } from '../../teacher-edit-course/teacher-edit-course';
import styles from './course-contents.module.scss';

/* eslint-disable-next-line */
export interface FormContent {
  title: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CourseContentsProps {
  onSubmit?: (content: ResponseRequest) => void;
}

export function CourseContents(props: CourseContentsProps) {
  const { onSubmit } = props;
  const [ openModal, setOpenModal] = useState(false);
  const [ contentEdit, setContentEdit] = useState<CourseContent>();
  const [ indexContentEdit, setIndexContentEdit] = useState<number>();
  const { course, addNewContent, updateContent, removeContent } = useCourse();
  const { contents } = course;

  const actionsContent = [
    {
      icon: 'pencil',
      onClick: (data: any)=>{
        const { content, index } = data;
        setContentEdit(content);
        setIndexContentEdit(index);
        setOpenModal(true);
      }
    },
    {
      icon: 'trash',
      onClick: async(content: any)=>{
        try {
          const { index } = content;
          const { data } = await removeContent(index);
          onSubmit &&
          onSubmit({
            success: true,
            data: data,
          });
        } catch (error) {
          onSubmit &&
          onSubmit({
            success: false,
            error: error,
          });
        }
      }
    }
  ];

  const saveContent = async (content: ContentCourse) => {
    try {
      const { data } = indexContentEdit !== undefined
        ? await updateContent(content, indexContentEdit)
        : await addNewContent(content);
      onSubmit &&
        onSubmit({
          success: true,
          data: data,
        });
      setOpenModal(false);
    } catch (error: any) {
      onSubmit &&
        onSubmit({
          success: false,
          error: error,
        });
    }
  }

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
            <PanelAccordion
              title={content.title}
              text={content.description}
              key={index}
              data={{content, index}}
              actions={actionsContent}
            >
              <pre>{content.description}</pre>
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
            setIndexContentEdit(undefined);
          }}
          onSubmit={(content) => saveContent(content)}
        />
      )}
    </div>
  );
}

export default CourseContents;

import { ContentCourse } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  CourseContent,
  CourseContentForm,
  DialogConfirm,
  PanelAccordion,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse } from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [contentEdit, setContentEdit] = useState<CourseContent>();
  const [indexContentEdit, setIndexContentEdit] = useState<number>();
  const { course, addNewContent, updateContent, removeContent } = useCourse();
  const { contents } = course;
  const { t } = useTranslation();

  const actionsContent = [
    {
      icon: 'pencil',
      onClick: (data: any) => {
        const { content, index } = data;
        setContentEdit(content);
        setIndexContentEdit(index);
        setOpenModal(true);
      },
    },
    {
      icon: 'trash',
      onClick: (data: any) => {
        const { index } = data;
        setOpenConfirm(true);
        setIndexContentEdit(index);
      },
    },
  ];

  const saveContent = async (content: ContentCourse) => {
    try {
      const { data } =
        indexContentEdit !== undefined
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
  };

  return (
    <div className={styles['contents']}>
      <div className={styles['header-text']}>
        <h2>{t('courseContents.title')}</h2>
        <h4 className="muted">{t('courseContents.subtitle')}</h4>
      </div>
      {contents.length < 1 && (
        <SetupCard
          onClick={() => {
            setOpenModal(true);
          }}
          icon={'copy'}
          text={'Los contenidos son recursos de textos para tus estudiantes'}
          titleButton={t('buttons.addNow') || ''}
        />
      )}
      {contents.length >= 1 && (
        <>
          {contents.map((content, index) => (
            <PanelAccordion
              title={content.title}
              text={content.description}
              key={index}
              data={{ content, index }}
              actions={actionsContent}
            >
              <pre className={styles['text-content']}>
                {content.description}
              </pre>
            </PanelAccordion>
          ))}
          <div className={styles['button-content']}>
            <Button
              title={t('buttons.addContent')}
              onClick={() => {
                setOpenModal(true);
              }}
              color={ColorsButton.secondary}
              outline={true}
            />
          </div>
        </>
      )}
      {openModal && (
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
      <DialogConfirm
        open={openConfirm}
        title={'Estas seguro que deseas eliminar?'}
        subtitle="Recuerde que una ves eliminado no podrá volver a recuperar la información"
        confirm={async () => {
          try {
            if (indexContentEdit) {
              // const { index } = contents[indexContentEdit];
              const { data } = await removeContent(indexContentEdit);
              onSubmit &&
                onSubmit({
                  success: true,
                  data: data,
                });
              setOpenConfirm(false);
            }
          } catch (error) {
            onSubmit &&
              onSubmit({
                success: false,
                error: error,
              });
          }
        }}
        onClose={() => setOpenConfirm(false)}
      />
    </div>
  );
}

export default CourseContents;

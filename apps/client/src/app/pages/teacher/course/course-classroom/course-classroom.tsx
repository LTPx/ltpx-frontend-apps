import { CLASSROOMS } from '@ltpx-frontend-apps/api';
import {
  ClassroomView,
  CourseClasses,
  InformationCard,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse } from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResponseRequest } from '../../teacher-edit-course/teacher-edit-course';
import styles from './course-classroom.module.scss';

/* eslint-disable-next-line */
export interface CourseClassroomProps {
  onSubmit?: (data: ResponseRequest) => void;
}

export function CourseClassroom(props: CourseClassroomProps) {
  const { onSubmit } = props;
  const [openModal, setOpenModal] = useState(false);
  const { course, addUpdateClassroom } = useCourse();
  const { classroom  } = course;
  const { t } = useTranslation();

  const handleClassroom = async(classroom: any) => {
    try {
      const { data } = await addUpdateClassroom(classroom);
      onSubmit && onSubmit({
        success: true,
        data: data
      });

    } catch (error) {
      onSubmit && onSubmit({
        success: false,
        error: error
      });
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>{t('courseClassroom.title')}</h2>
        <h4 className="muted">
        {t('courseClassroom.subtitle')}
        </h4>
      </div>
      {!classroom && (
        <SetupCard
          icon={'cog'}
          text={t('courseClassroom.text')}
          titleButton={t('buttons.config') || ''}
          onClick={() => {
            setOpenModal(true);
          }}
        />
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
      {classroom && (
        <div className={styles['classroom-preview']}>
          <InformationCard
            title={CLASSROOMS[classroom.condition].title}
            text={CLASSROOMS[classroom.condition].text}
            icon={CLASSROOMS[classroom.condition].icon}
            selected={true}
          />
          {classroom.meetings.length > 0 && (
            <ClassroomView
              classroom={classroom}
              className={styles['classroom-summary']}
            />
          )}
          <div
            className={styles['edit-btn']}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <h4>Editar clases</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseClassroom;

import {
  Classroom,
  CLASSROOMS,
  FormatResponse,
  SessionParams,
  TeacherClassType,
} from '@ltpx-frontend-apps/api';
import {
  ClassroomView,
  CourseClasses,
  CourseDateCard,
  InformationCard,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse, useUser } from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './course-classroom.module.scss';

/* eslint-disable-next-line */
export interface CourseClassroomProps {
  onSubmit?: (data: FormatResponse) => void;
}

export function CourseClassroom(props: CourseClassroomProps) {
  const { onSubmit } = props;
  const [openModal, setOpenModal] = useState(false);
  const { course, _addCourseSession } = useCourse();
  const { session } = course;
  const { t } = useTranslation();

  const handleClassroom = async (params: SessionParams) => {
    const { success, data, error } = await _addCourseSession(params);
    onSubmit &&
      onSubmit({
        success,
        data,
        error,
      });
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>{t('courseClassroom.title')}</h2>
        <h4 className="muted">{t('courseClassroom.subtitle')}</h4>
      </div>
      {session === undefined && (
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
          console.log('classroom: ', classroom);
          handleClassroom(classroom);
        }}
      />
      {session?.meetings && session?.meetings.length > 0 && (
        <div className={styles['classes-container']}>
          <div className={styles['classes-preview']}>
            {session.meetings.map((meeting, index) => (
              <CourseDateCard
                className={styles['course-class']}
                key={index}
                title={'Reunion ' + (index + 1)}
                description={
                  'Fecha: ' + meeting.month + ' - ' + meeting.day_number
                }
                time={'Hora: ' + meeting.end_time}
              />
            ))}
          </div>
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

import {
  FormatResponse,
  SessionParams,
} from '@ltpx-frontend-apps/api';
import {
  CourseClasses,
  CourseDateCard,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse } from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './course-classroom.module.scss';

export interface CourseClassroomProps {
  onSubmit?: (data: FormatResponse) => void;
}

export function CourseClassroom(props: CourseClassroomProps) {
  const { onSubmit } = props;
  const [openModal, setOpenModal] = useState(false);
  const { course, _addCourseSession, _editCourseSession } = useCourse();
  const { session } = course;
  const { t } = useTranslation();

  const handleClassroom = async (params: SessionParams) => {
    if (session && session.id) {
      const paramsEdit = { ...params, ...{public: true, id: session.id} }
      const { success, data, error } = await _editCourseSession(paramsEdit);
      onSubmit &&
      onSubmit({
        success,
        data,
        error,
      });
    } else {
      const { success, data, error } = await _addCourseSession(params);
      onSubmit &&
      onSubmit({
        success,
        data,
        error,
      });
    }
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
        session={session}
      />
      {session?.meetings.length > 0 && (
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
      {session?.meetings.length === 0 && (
        <div>
          <h4>
            Este curso no requiere de clases para que los estudiantes aprueben
            este curso
          </h4>
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

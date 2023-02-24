import {
  Classroom,
  CLASSROOMS,
  TeacherClassType,
} from '@ltpx-frontend-apps/api';
import {
  ClassroomView,
  CourseClasses,
  InformationCard,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse, useUser } from '@ltpx-frontend-apps/store';
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
  const { course, _addCourseSession } = useCourse();
  const { user } = useUser();
  const { classroom } = course;
  const { t } = useTranslation();

  const handleClassroom = async (classroom: Classroom) => {
    const { success, data, error } = await _addCourseSession({
      max_participants: classroom.max,
      call_time_min: classroom.call_time_min,
      private_sessions: classroom.condition === TeacherClassType.customize,
      meetings_attributes: classroom.meetings.map((date)=>{
        return { start_date: date, host_user_id: user.id }
      }),
    });
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
          console.log('classroom: ', classroom);
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

import { CourseStatus } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  ColorsTag,
  Icon,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
  Tabs,
  Tag,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import {
  useCourse,
  useCourseUtil,
  useTeacher,
} from '@ltpx-frontend-apps/store';
import {
  CourseAchievements,
  CourseClassroom,
  CourseContents,
  CourseGeneralInformation,
  CourseQuizzes,
} from '../course';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './teacher-edit-course.module.scss';
import { useTranslation } from 'react-i18next';

export type ResponseRequest = {
  success: boolean;
  data?: any;
  error?: any;
};

export function TeacherEditCourse() {
  const [indexSelectedView, setIndexSelectedView] = useState(0);
  const [notification, setNotification] = useState({
    show: false,
    kind: SnackbarType.success,
    text: '',
  });
  const { getCourse, course, cleanCourse } = useCourse();
  const { _sendCourseToReview } = useTeacher();
  const { translateStatus } = useCourseUtil();
  const { t } = useTranslation();

  const linksEditCourse = [
    { selected: true, text: t('teacherEditCourse.linksEditCourse.details') },
    { selected: false, text: t('teacherEditCourse.linksEditCourse.contents') },
    { selected: false, text: t('teacherEditCourse.linksEditCourse.quiz') },
    {
      selected: false,
      text: t('teacherEditCourse.linksEditCourse.achievement'),
    },
    { selected: false, text: t('teacherEditCourse.linksEditCourse.sessions') },
  ];

  const params = useParams();
  const { courseId } = params;
  const id = parseInt(courseId || '');

  const fetchData = useCallback(async () => {
    const resp = await getCourse(id);
    console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const showAndConfigNotification = async (response: ResponseRequest) => {
    const { success, data, error } = response;
    if (success) {
      setNotification((prevState) => ({
        ...prevState,
        show: true,
        text: 'Tus cambios han sido guardados',
      }));
    } else {
      setNotification((prevState) => ({
        ...prevState,
        show: true,
        text: 'Ha ocurrido un error',
        kind: SnackbarType.error,
      }));
    }
  };

  const handleSendToReview = async () => {
    const { success } = await _sendCourseToReview(course.id);
    if (success) {
      setNotification((prevState) => ({
        ...prevState,
        show: true,
        text: 'Tu curso ha sido enviado a revision',
      }));
    } else {
      setNotification((prevState) => ({
        ...prevState,
        show: true,
        text: 'Ha ocurrido un error',
        kind: SnackbarType.error,
      }));
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['title-content']}>
          <div className={styles['details']}>
            <h1>{course.title}</h1>
          </div>
          <div className={styles['details']}>
            <Tag
              text={translateStatus(course.status)}
              color={
                course.status === CourseStatus.publish
                  ? ColorsTag.green
                  : ColorsTag.gray
              }
              icon={course.status === CourseStatus.publish ? 'globe' : 'edit'}
            />
            <div className={styles['details']}>
              <Icon icon="calendar-days" size={18} />
              <h5>Creado: {course.created_at}</h5>
            </div>
          </div>
        </div>
        <div className={styles['actions']}>
          <Button
            title={t('buttons.sendReview')}
            color={ColorsButton.secondary}
            type={TypeButton.submit}
            outline={true}
            icon='rocket'
            onClick={() => {
              handleSendToReview();
            }}
            disabled={course.status !== CourseStatus.draft}
          />
          <Button
            title={t('buttons.saveDraft')}
            color={ColorsButton.primary}
            link={'/teacher/courses/all'}
            onClick={() => {
              cleanCourse()
            }}
          />
        </div>
      </div>
      {course.id && (
        <div className={`${styles['container']} card`}>
          <div className={styles['content']}>
            <Tabs
              tabs={linksEditCourse}
              onClickTab={(index) => {
                setIndexSelectedView(index);
              }}
            />
            <div className={styles['section-content']}>
              {indexSelectedView === 0 && (
                <CourseGeneralInformation
                  {...course}
                  cover={course.cover_url}
                  onSubmit={(data) => {
                    showAndConfigNotification(data);
                  }}
                />
              )}
              {indexSelectedView === 1 && (
                <CourseContents
                  onSubmit={(data) => {
                    showAndConfigNotification(data);
                  }}
                />
              )}
              {indexSelectedView === 2 && (
                <CourseQuizzes
                  onSubmit={(data) => {
                    showAndConfigNotification(data);
                  }}
                />
              )}
              {indexSelectedView === 3 && (
                <CourseAchievements
                  onSubmit={(data) => {
                    showAndConfigNotification(data);
                  }}
                />
              )}
              {indexSelectedView === 4 && (
                <CourseClassroom
                  onSubmit={(data) => {
                    showAndConfigNotification(data);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {notification.show && (
        <Snackbar
          position={SnackbarPosition.centerBottom}
          open={notification.show}
          title={notification.text}
          kind={notification.kind}
          onClose={() => {
            setNotification((prevState) => ({
              ...prevState,
              show: false,
            }));
          }}
        />
      )}
    </div>
  );
}

export default TeacherEditCourse;

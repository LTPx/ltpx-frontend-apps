import { CourseStatus } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  Icon,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
  Tabs,
  Tag,
  TypeButton,
  useMoment,
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
  CourseTasks,
} from '../course';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './teacher-edit-course.module.scss';
import { useTranslation } from 'react-i18next';
import { useEditCourse } from './useEditCourse';

export type ResponseRequest = {
  success: boolean;
  data?: any;
  error?: any;
};

export function TeacherEditCourse() {
  const { tabs, notification, setNotification, statusColors, statusIcons } =
    useEditCourse();
  const [indexSelectedView, setIndexSelectedView] = useState(0);
  const { getCourse, course, cleanCourse } = useCourse();
  const { _sendCourseToReview } = useTeacher();
  const { translateStatus } = useCourseUtil();
  const { formatDate } = useMoment();
  const { t } = useTranslation();
  const { courseId } = useParams();
  const id = parseInt(courseId || '');
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const resp = await getCourse(id);
    console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const showAndConfigNotification = async (response: ResponseRequest) => {
    const { success, error } = response;
    if (success) {
      setNotification((prevState) => ({
        ...prevState,
        show: true,
        text: 'Tus cambios han sido guardados',
        kind: SnackbarType.success,
      }));
    } else {
      setNotification((prevState) => ({
        ...prevState,
        show: true,
        text: error || 'Ha ocurrido un error',
        kind: SnackbarType.error,
      }));
    }
  };

  const handleSendToReview = async () => {
    const { success, error } = await _sendCourseToReview(course.id);
    if (success) {
      setNotification((prevState) => ({
        ...prevState,
        show: true,
        text: 'Tu curso ha sido enviado a revision',
      }));
      navigate('/teacher/courses');
    } else {
      setNotification((prevState) => ({
        ...prevState,
        show: true,
        text: error,
        kind: SnackbarType.error,
      }));
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['title-content']}>
          <div className={styles['details']}>
            <h1 className={styles['course-title']}>{course.title}</h1>
          </div>
          <div className={styles['details']}>
            <Tag
              text={translateStatus(course.status)}
              color={statusColors[course.status]}
              icon={statusIcons[course.status]}
            />
            <div className={styles['details']}>
              <Icon icon="calendar-days" size={18} />
              <h5>Ultima Edición: {formatDate(course.updated_at)}</h5>
            </div>
          </div>
        </div>
        <div className={styles['actions']}>
          <Button
            title={t('buttons.sendReview')}
            color={ColorsButton.secondary}
            type={TypeButton.submit}
            outline={true}
            icon="rocket"
            onClick={handleSendToReview}
            disabled={course.status !== CourseStatus.draft}
          />
          <Button
            title={t('buttons.saveDraft')}
            color={ColorsButton.primary}
            link={'/teacher/courses/all'}
            onClick={cleanCourse}
          />
        </div>
      </div>
      {course.id && (
        <div className={styles['content']}>
          <Tabs tabs={tabs} onClickTab={setIndexSelectedView} />
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
              <CourseTasks
                onSubmit={(data) => {
                  showAndConfigNotification(data);
                }}
              />
            )}
            {indexSelectedView === 4 && (
              <CourseAchievements
                onSubmit={(data) => {
                  showAndConfigNotification(data);
                }}
              />
            )}
            {indexSelectedView === 5 && (
              <CourseClassroom
                onSubmit={(data) => {
                  showAndConfigNotification(data);
                }}
              />
            )}
          </div>
        </div>
      )}
      {notification.show && (
        <Snackbar
          position={SnackbarPosition.centerBottom}
          open={notification.show}
          title={notification.text}
          kind={notification.kind}
          duration={1500}
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

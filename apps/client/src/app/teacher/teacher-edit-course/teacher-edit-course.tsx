import styles from './teacher-edit-course.module.scss';
import {
  CourseStatus,
  FormatResponse,
  TeacherCourse,
} from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  Icon,
  Tabs,
  Tag,
  TypeButton,
  useMoment,
} from '@ltpx-frontend-apps/shared-ui';
import {
  useCourse,
  useCourseUtil,
  useSite,
  useTeacher,
  useUtil,
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
import { useTranslation } from 'react-i18next';
import { useEditCourse } from './useEditCourse';

export function TeacherEditCourse() {
  const { tabs, statusColors, statusIcons } = useEditCourse();
  const [indexSelectedView, setIndexSelectedView] = useState(0);
  const [course, setCourse] = useState<TeacherCourse>();
  const { getCourse, cleanCourse } = useCourse();
  const { _sendCourseToReview } = useTeacher();
  const { translateStatus } = useCourseUtil();
  const { setMessageToast } = useUtil();
  const { formatDate } = useMoment();
  const { t } = useTranslation();
  const { courseId } = useParams();
  const id = parseInt(courseId || '');
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const { success, data, error } = await getCourse(id);
    if (success) {
      setCourse(data);
    } else {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const showAndConfigNotification = async (response: FormatResponse) => {
    const { success, error } = response;
    if (success) {
      setMessageToast('success', 'Tus cambios han sido guardados');
    } else {
      setMessageToast('error', `${error || 'Ha ocurrido un error'}`);
    }
  };

  const handleSendToReview = async () => {
    if (course?.id) {
      const { success, error } = await _sendCourseToReview(course.id);
      if (success) {
        setMessageToast('success', 'Tu curso ha sido enviado a revision');
        navigate('/teacher/courses');
      } else {
        setMessageToast('error', error);
      }
    }
  };

  return (
    <div className={styles['container']}>
      {course?.id && (
        <>
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
                className={styles['btn-actions']}
                title={t('buttons.sendReview')}
                color={ColorsButton.secondary}
                type={TypeButton.submit}
                outline={true}
                icon="rocket"
                onClick={handleSendToReview}
                disabled={course.status === CourseStatus.review}
              />
              <Button
                className={styles['btn-actions']}
                title={t('buttons.saveDraft')}
                color={ColorsButton.primary}
                link={'/teacher/courses/all'}
                onClick={cleanCourse}
              />
            </div>
          </div>
          {course.status === CourseStatus.rejected && (
            <div className={styles['comment-admin']}>
              <h4 className={styles['changes-title']}>
                Cambios sugeridos por Openmind:
              </h4>
              {course.admin_comments && (
                <div>
                  {course.admin_comments.map((element, index) => (
                    <div className={styles['comment']} key={index}>
                      <h4>{element.comment}</h4>
                      <h5 className={styles['date-comment']}>
                        Fecha de comentario: {formatDate(element.created_at)}
                      </h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
      {course?.id && (
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
    </div>
  );
}

export default TeacherEditCourse;

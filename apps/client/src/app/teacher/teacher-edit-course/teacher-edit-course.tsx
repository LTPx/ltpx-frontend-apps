import styles from './teacher-edit-course.module.scss';
import {
  CourseStatus,
  FormatResponse,
  TeacherCourse,
} from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  DialogConfirm,
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
  const [touch, setIsTouch] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  // const handleConfirmation = () => {
  //   const result = window.confirm(
  //     '¿Estás seguro de que deseas realizar esta acción, tienes cambios sin guardar?'
  //   );
  //   if (result) {
  //     navigate('/teacher/courses');
  //     // Seleccionó "Aceptar"
  //     // Realizar la acción deseada
  //   } else {
  //     // Seleccionó "Cancelar" o cerró la ventana
  //     // No realizar ninguna acción
  //   }
  // };

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
      // window.location.reload();
    } else {
      setMessageToast('error', `${error || 'Ha ocurrido un error'}`);
    }
  };

  // const unsavedChanges = () => {
  //   if (touch) {
  //     handleConfirmation();
  //   }
  // };

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

  // const handleDataFromChild = (data: boolean) => {
  //   // Realiza acciones con los datos recibidos del componente hijo
  //   setIsTouch(data);
  // };

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
                onClick={() => setOpenMessage(true)}
                disabled={course.status === CourseStatus.review}
              />
              <Button
                className={styles['btn-actions']}
                title={t('buttons.saveDraft')}
                color={ColorsButton.primary}
                // link={!touch ? '/teacher/courses/all' : ''}
                // onClick={!touch ? cleanCourse : unsavedChanges}
                link="/teacher/courses/all"
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
          <Tabs
            tabs={tabs}
            onClickTab={setIndexSelectedView}
            // isDisabled={touch}
            // onConfirm={handleConfirmation}
          />
          <div className={styles['section-content']}>
            {indexSelectedView === 0 && (
              <CourseGeneralInformation
                {...course}
                cover={course.cover_url}
                onSubmit={(data) => {
                  showAndConfigNotification(data);
                  // setIsTouch(false);
                }}
                // sendDataToParent={handleDataFromChild}
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
      <DialogConfirm
        open={openMessage}
        title={'¿Estas seguro que quieres enviar tu curso a revisión?'}
        confirm={() => {
          handleSendToReview();
          setOpenMessage(false);
        }}
        onClose={() => setOpenMessage(false)}
      />
    </div>
  );
}

export default TeacherEditCourse;

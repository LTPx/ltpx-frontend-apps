import {
  CourseApiParams,
  CourseStatus,
  TeacherCourse,
} from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  ColorsTag,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
  Tabs,
  Tag,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import {
  CourseAchievements,
  CourseClassroom,
  CourseContents,
  CourseGeneralInformation,
  CourseQuizzes,
} from '../course';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourse, useTeacher } from '../../../store';
import styles from './teacher-edit-course.module.scss';

const linksEditCourse = [
  { selected: true, text: 'Detalles' },
  { selected: false, text: 'Contenidos' },
  { selected: false, text: 'Tests' },
  { selected: false, text: 'Logros' },
  { selected: false, text: 'Sesiones' },
];

export function TeacherEditCourse() {
  const [showNotification, setShowNotification] = useState(false);
  const [indexSelectedView, setIndexSelectedView] = useState(0);
  const { editCourse } = useTeacher();
  const { translateStatus, getCourse, addNewContent, loadedCourse, course } = useCourse();

  const params = useParams();
  const { courseId } = params;
  const id = parseInt(courseId || '');

  const fetchData = useCallback(async () => {
    const resp = await getCourse(id);
    console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveChanges = async (formData: CourseApiParams) => {
    if (course) {
      const data = { ...formData, ...{ id: course.id } };
      delete data.cover_url;
      console.log('formData edit: ', data);
      const result = await editCourse(data);
      if (result.success) {
        console.log('success');
        setShowNotification(true);
      } else {
        console.log(result.data);
      }
    }
  };

  return (
    <div className={styles['container']}>
      {loadedCourse && (
        <div className={styles['container']}>
          <div className={styles['header']}>
            <div className={styles['title']}>
              <h3>{course.title}</h3>
              <Tag
                text={translateStatus(course.status)}
                color={
                  course.status === CourseStatus.publish
                    ? ColorsTag.green
                    : ColorsTag.gray
                }
                icon={course.status === CourseStatus.publish ? 'globe' : 'edit'}
              />
            </div>
            <div className={styles['actions']}>
              <h5 className="muted">Creado: Diciembre 21 2022</h5>
              <Button
                title="Guardar Borrador"
                color={ColorsButton.accent}
                link={'/teacher/courses/all'}
              />
              <Button
                title="Enviar a revision"
                color={ColorsButton.primary}
                type={TypeButton.submit}
                onClick={() => {
                  console.log('send to review');
                }}
              />
            </div>
          </div>
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
                  onSubmit={(data) => {
                    saveChanges(data);
                  }}
                />
              )}
              {indexSelectedView === 1 && (
                <CourseContents
                  contents={course.contents}
                  onSubmit={(content) => {
                    addNewContent(content);
                    setShowNotification(true);
                  }}
                />
              )}
              {indexSelectedView === 2 && (
                <CourseQuizzes
                  courseId={course.id}
                  initialQuizzes={course.quizzes || []}
                />
              )}
              {indexSelectedView === 3 && (
                <CourseAchievements
                  quizzes={course.quizzes || []}
                  courseId={course.id}
                  initialAchievements={course.achievements || []}
                />
              )}
              {indexSelectedView === 4 && (
                <CourseClassroom
                  initialClassroom={course.classroom}
                  onSubmit={(classroom) => {
                    saveChanges({
                      title: course.title,
                      classroom: classroom,
                    });
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <Snackbar
        position={SnackbarPosition.centerBottom}
        open={showNotification}
        title={'Cambios guardados'}
        typeSnackbar={SnackbarType.success}
        date={''}
      />
    </div>
  );
}

export default TeacherEditCourse;

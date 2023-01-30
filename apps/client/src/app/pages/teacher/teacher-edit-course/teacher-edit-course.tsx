import {
  CourseApiParams,
  CourseStatus,
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
import { useCourse, useCourseUtil } from '@ltpx-frontend-apps/store';
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

const linksEditCourse = [
  { selected: true, text: 'Detalles' },
  { selected: false, text: 'Contenidos' },
  { selected: false, text: 'Tests' },
  { selected: false, text: 'Logros' },
  { selected: false, text: 'Sesiones' },
];

export function TeacherEditCourse() {
  const [ showNotification, setShowNotification ] = useState(false);
  const [ indexSelectedView, setIndexSelectedView ] = useState(0);
  const { getCourse, updateCourse, loadedCourse, course } = useCourse();
  const { translateStatus } = useCourseUtil();

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
    console.log(formData);
    const { success, data } = await updateCourse(formData);
    if (success) {
      setShowNotification(true);
    } else {
      setShowNotification(true);
      console.log(data);
    }
  };

  return (
    <div className={styles['container']}>
      {course.id && (
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
                  cover={course.cover_url}
                  onSubmit={(data) => {
                    saveChanges(data);
                  }}
                />
              )}
              {indexSelectedView === 1 && (
                <CourseContents
                  onSubmit={() => {
                    setShowNotification(true);
                  }}
                />
              )}
              {indexSelectedView === 2 && (
                <CourseQuizzes />
              )}
              {indexSelectedView === 3 && (
                <CourseAchievements />
              )}
              {indexSelectedView === 4 && (
                <CourseClassroom />
              )}
            </div>
          </div>
        </div>
      )}
      {showNotification && (
        <Snackbar
          position={SnackbarPosition.centerBottom}
          open={showNotification}
          title={'Cambios guardados'}
          kind={SnackbarType.success}
          onClose={()=>{
            setShowNotification(false);
          }}
        />
      )}
    </div>
  );
}

export default TeacherEditCourse;

import { CourseApiParams, CourseLanguage, CourseLevel, getTeacherCourse, TeacherCourse } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, Select, Snackbar, SnackbarPosition, SnackbarType, Tabs, TypeButton } from '@ltpx-frontend-apps/shared-ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './teacher-edit-course.module.scss';
import CourseGeneralInformation from '../course/course-general-information/course-general-information';
import TeacherClasses from '../teacher-classes/teacher-classes';
import Quiz from '../quiz/quiz';
import Achievement from '../achievement/achievement';
import CourseContents from '../course/course-contents/course-contents';
import { useTeacher } from '../../../store';

const linksEditCourse = [
  { selected: true, text: 'Detalles' },
  { selected: false, text: 'Contenidos' },
  { selected: false, text: 'Test' },
  { selected: false, text: 'Logros' },
  { selected: false, text: 'Sesiones' },
];

/* eslint-disable-next-line */
export interface TeacherEditCourseProps {}

export function TeacherEditCourse(props: TeacherEditCourseProps) {
  const [ showNotification, setShowNotification ] = useState(false);
  const [ course, setCourse ] = useState<TeacherCourse>();
  const [ indexSelectedView, setIndexSelectedView ] = useState(0);
  const params = useParams();
  const { editCourse } = useTeacher();

  const { courseId } = params;

  useEffect(() => {
    let mounted = true;
    try {
      if (courseId) {
        getTeacherCourse(courseId).then((course) => {
          if (mounted) {
            setCourse(course);
            console.log('course: ', course);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      mounted = false;
    };
  }, []);

  const saveChanges = async(formData: CourseApiParams) => {
    console.log('formData: ', formData);
    if (course) {
      const data = {...formData, ...{ id: course.id }}
      const result = await editCourse(data);
      if (result.saved) {
        console.log('saved');
        setShowNotification(true);
      } else {
        console.log(result.data);
      }
    }
  }

  return (
    <div className={styles['container']}>
      { course && (
        <div className={styles['container']}>
          <div className={styles['header']}>
            <h3>{course.title}</h3>
            <div className={styles['actions']}>
              <h5 className="muted">Creado: Diciembre 21 2022</h5>
              <Button
                title="Cancelar"
                color={ColorsButton.white}
              />
              <Button
                title="Enviar a revision"
                color={ColorsButton.primary}
                type={TypeButton.submit}
                onClick={()=>{
                  console.log('send to review')
                }}
              />
            </div>
          </div>
          <div className={styles['content']}>
            <Tabs tabs={linksEditCourse} onClickTab={(index)=>{
              setIndexSelectedView(index);
            }}/>
            <div className={styles['course-section-content']}>
              <section className={`${styles['section']} ${indexSelectedView === 0 ? styles['selected'] : ''}`}>
                <CourseGeneralInformation
                  id={course.id}
                  title={course.title}
                  cover={course.cover_url}
                  description={course.description}
                  category={course.category}
                  language={course.language}
                  level={course.level}
                  learn_goals={course.learn_goals}
                  requirements={course.requirements}
                />
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 1 ? styles['selected'] : ''}`}>
                <CourseContents contents={course.contents} onSubmit={(contents)=>{
                  console.log(contents);
                  saveChanges({
                    title: course.title,
                    contents
                  });
                }}/>
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 2 ? styles['selected'] : ''}`}>
                <Quiz />
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 3 ? styles['selected'] : ''}`}>
                <Achievement />
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 4 ? styles['selected'] : ''}`}>
                <TeacherClasses
                  onSubmit={(data) => {
                    // handleClasses(data);
                  }}
                />
              </section>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        position={SnackbarPosition.top}
        open={showNotification}
        title={'Cambios guardados'}
        typeSnackbar={SnackbarType.success}
        date={''}
      />
    </div>
  );
}

export default TeacherEditCourse;

import { CourseApiParams, CourseStatus, getTeacherCourse, TeacherCourse } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, ColorsTag, Snackbar, SnackbarPosition, SnackbarType, Tabs, Tag, TypeButton } from '@ltpx-frontend-apps/shared-ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './teacher-edit-course.module.scss';
import CourseGeneralInformation from '../course/course-general-information/course-general-information';
import TeacherClasses from '../teacher-classes/teacher-classes';
import Quiz from '../quiz/quiz';
import Achievement from '../achievement/achievement';
import CourseContents from '../course/course-contents/course-contents';
import { useCourse, useTeacher } from '../../../store';

const linksEditCourse = [
  { selected: true, text: 'Detalles' },
  { selected: false, text: 'Contenidos' },
  { selected: false, text: 'Tests' },
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
  const { translateStatus } = useCourse();

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
    if (course) {
      const data = {...formData, ...{ id: course.id }}
      delete data.cover_url;
      console.log('formData edit: ', data);
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
            <div className={styles['title']}>
              <h3>{course.title}</h3>
              <Tag
                text={translateStatus(course.status)}
                color={
                  course.status === CourseStatus.publish ? ColorsTag.green : ColorsTag.gray
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
                  title={course.title}
                  cover={course.cover_url}
                  description={course.description}
                  category={course.category}
                  language={course.language}
                  level={course.level}
                  learn_goals={course.learn_goals}
                  requirements={course.requirements}
                  onSubmit={(data)=>{
                    saveChanges(data);
                  }}
                />
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 1 ? styles['selected'] : ''}`}>
                <CourseContents contents={course.contents} onSubmit={(content)=>{
                  const contents = course.contents || [];
                  saveChanges({
                    title: course.title,
                    contents: contents.concat([content])
                  });
                }}/>
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 2 ? styles['selected'] : ''}`}>
                <Quiz
                  courseId={course.id}
                  initialQuizzes={course.quizzes || []}
                />
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 3 ? styles['selected'] : ''}`}>
                <Achievement
                  quizzes={course.quizzes || [] }
                  courseId={course.id}
                  initialAchievements={course.achievements || []}
                />
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 4 ? styles['selected'] : ''}`}>
                <TeacherClasses
                  initialClassroom={course.classroom}
                  onSubmit={(classroom) => {
                    saveChanges({
                      title: course.title,
                      classroom: classroom
                    })
                  }}
                />
              </section>
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

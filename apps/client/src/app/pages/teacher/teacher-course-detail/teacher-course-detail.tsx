import { getTeacherCourse, ICourse } from '@ltpx-frontend-apps/api';
import { Tabs } from '@ltpx-frontend-apps/shared-ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './teacher-course-detail.module.scss';

const tabs = [
  { text: 'Contenidos' },
  { text: 'Estudiantes' },
  { text: 'Estadisticas' },
]
/* eslint-disable-next-line */
export interface TeacherCourseDetailProps {}

export function TeacherCourseDetail(props: TeacherCourseDetailProps) {
  const [course, setCourse] = useState<ICourse>();

  const params = useParams();
  console.log(params)
  useEffect(() => {
    let mounted = true;
    try {
      const { courseId } = params;
      if (courseId) {
        getTeacherCourse(courseId).then((course)=> {
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
    }
  }, [])

  // const course = buildRandomTeacherCourseDetail();
  // const { entity, contents } = course;

  // const buildContentsTabs = () => {
  //   return contents.map((content, index)=>(
  //     {
  //       text: `Seccion - ${index+1}`
  //     }
  //   ))
  // }
  return (
    <div className={styles['container']}>
      {course && (
        <>
          <div className={styles['cover']}>
            <img src={course.image}></img>
          </div>
          <h1>{course.title}</h1>
          <div className={styles['basic-info']}>
            <span className={`${styles['noted']} ${styles['status']}`}>{course.status}</span>
            <span className={`${styles['noted']}`}>{course.category}</span>
            <span className={`${styles['noted']}`}>{course.level}</span>
            <span className={`${styles['noted']}`}>{course.language}</span>
          </div>
          <div className={styles['about-course']}>
            <h2>Acerca del curso</h2>
            <p>{course.description}</p>
          </div>
          <div className={styles['course-details']}>
            <Tabs tabs={tabs}/>
            <div className={styles['tab-content']}>
              <div className={styles['course-contents']}>
                {/* <Tabs className={styles['tabs-contents']} tabs={buildContentsTabs()} vertical={true}/> */}
                <div className={styles['render-content']}>
                  {course.contents.map((content, index)=>(
                    <div key={index} className={styles['render-content']}>
                      <h1>{content.title}</h1>
                      <p>{content.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TeacherCourseDetail;

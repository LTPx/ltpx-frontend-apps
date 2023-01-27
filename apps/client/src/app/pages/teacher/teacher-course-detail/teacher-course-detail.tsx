import { getTeacherCourse, TeacherCourse } from '@ltpx-frontend-apps/api';
import {
  CourseContents,
  LearnersTable,
  Tabs,
} from '@ltpx-frontend-apps/shared-ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourse } from '../../../store';
import styles from './teacher-course-detail.module.scss';

const tabs = [
  { text: 'Contenidos' },
  { text: 'Estudiantes' },
  { text: 'Estadísticas' },
];

const users = [
  {
    image:
      'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    name: 'Kristian Watson',
    date: 'Dec 29, 2021',
    percentage: 20,
  },
  {
    image:
      'https://images.unsplash.com/photo-1642792743923-3fc2adcd1b84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    name: 'Jhonatan Doe',
    date: 'Dec 29, 2021',
    percentage: 40,
  },
  {
    image:
      'https://images.unsplash.com/flagged/photo-1574110906643-8311b0ce29d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    name: 'Jacob Jones',
    date: 'Dec 29, 2021',
    percentage: 60,
  },
  {
    image:
      'https://images.unsplash.com/photo-1602133187081-4874fdbd555c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    name: 'Teresa Web',
    date: 'Dec 29, 2021',
    percentage: 80,
  },
];
/* eslint-disable-next-line */
export interface TeacherCourseDetailProps {}

export function TeacherCourseDetail(props: TeacherCourseDetailProps) {
  const [course, setCourse] = useState<TeacherCourse>();
  const [selectedTab, setSelectedTab] = useState(0);
  const { translateCategory, translateLanguage, translateLevel, translateStatus } = useCourse();

  const handleClick = (index: number) => {
    setSelectedTab(index);
  };
  const params = useParams();

  useEffect(() => {
    let mounted = true;
    try {
      const { courseId } = params;
      if (courseId) {
        const id = parseInt(courseId);
        getTeacherCourse(id).then((course) => {
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

  return (
    <div className={styles['container']}>
      {course && (
        <>
          <div className={styles['cover']}>
            <img
              src={
                course.cover_url ||
                'https://designshack.net/wp-content/uploads/placeholder-image-368x246.png'
              }
            ></img>
          </div>
          <h1>{course.title}</h1>
          <div className={styles['basic-info']}>
            <span className={`${styles['noted']} ${styles['status']}`}>
              {translateStatus(course.status)}
            </span>
            <span className={`${styles['noted']}`}>
              {translateCategory(course.category)}
            </span>
            <span className={`${styles['noted']}`}>
              {translateLevel(course.level)}
            </span>
            <span className={`${styles['noted']}`}>
              {translateLanguage(course.language)}
            </span>
          </div>
          <div className={styles['about-course']}>
            <h2>Acerca del curso</h2>
            <p>{course.description}</p>
          </div>
          <div className={styles['course-details']}>
            <Tabs
              tabs={tabs}
              isNav={false}
              onClickTab={(option) => handleClick(option)}
            />
            {selectedTab === 0 && <CourseContents contents={course.contents || []} />}
            {selectedTab === 1 && <LearnersTable users={users} />}
            {selectedTab === 2 && <h1>Mostrar Estadísticas</h1>}
          </div>
        </>
      )}
    </div>
  );
}

export default TeacherCourseDetail;

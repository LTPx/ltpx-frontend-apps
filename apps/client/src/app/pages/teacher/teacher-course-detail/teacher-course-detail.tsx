import {
  CLASSROOMS,
  getTeacherCourse,
  TeacherCourse,
} from '@ltpx-frontend-apps/api';
import {
  AchievementsList,
  ClassroomView,
  CourseContents,
  InformationCard,
  OverviewCourse,
  QuizzesList,
  Tabs,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourseUtil } from '@ltpx-frontend-apps/store';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from './teacher-course-detail.module.scss';

const tabs = [
  { text: 'Detalles' },
  { text: 'Contenidos' },
  { text: 'Test' },
  { text: 'Logros' },
  { text: 'Sesiones' },
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
  const {
    translateCategory,
    translateLanguage,
    translateLevel,
    translateStatus,
  } = useCourseUtil();

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
    <div className={`${styles['container']} card`}>
      {course && (
        <>
          <div className={styles['head']}>
            <h1 className={styles['title']}>{course.title}</h1>
            <NavLink to={'/teacher/courses/all'}>
              <h4>Ir a cursos</h4>
            </NavLink>
          </div>
          <div className={styles['cover']}>
            <img
              alt="cover"
              src={
                course.cover_url ||
                'https://designshack.net/wp-content/uploads/placeholder-image-368x246.png'
              }
            ></img>
          </div>
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
          <Tabs
            tabs={tabs}
            isNav={false}
            onClickTab={(option) => handleClick(option)}
          />
          <div className={styles['course-content']}>
            {selectedTab === 0 && (
              <OverviewCourse
                description={course.description}
                goals={course.learn_goals?.split('\n') || []}
                requirements={course.requirements?.split('\n') || []}
              />
            )}
            {selectedTab === 1 && (
              <CourseContents contents={course.contents || []} />
            )}
            {selectedTab === 2 && (
              <QuizzesList quizzes={course.quizzes || []} />
            )}
            {selectedTab === 3 && (
              <AchievementsList achievements={course.achievements || []} />
            )}
            {selectedTab === 4 && course.classroom && (
              <>
                <InformationCard
                  title={CLASSROOMS[course.classroom.condition].title}
                  text={CLASSROOMS[course.classroom.condition].text}
                  icon={CLASSROOMS[course.classroom.condition].icon}
                  selected={true}
                />
                {course.classroom.meetings.length > 0 && (
                  <ClassroomView
                    classroom={course.classroom}
                    className={styles['classroom-summary']}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TeacherCourseDetail;

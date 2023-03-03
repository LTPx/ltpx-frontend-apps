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
  { text: 'Alumnos' },
];

export function TeacherCourseDetail() {
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
            {/* {selectedTab === 5 && course.classroom && (
              <h1>Studiantes</h1>
            )} */}
          </div>
        </>
      )}
    </div>
  );
}

export default TeacherCourseDetail;

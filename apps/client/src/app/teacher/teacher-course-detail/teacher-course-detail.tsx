import {
  getTeacherCourse,
  TeacherCourse,
} from '@ltpx-frontend-apps/api';
import {
  AchievementsList,
  CourseContents,
  CourseDateCard,
  OverviewCourse,
  QuizzesList,
  Tabs,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourseUtil, useTeacher } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from './teacher-course-detail.module.scss';

const tabs = [
  { text: 'Detalles' },
  { text: 'Contenidos' },
  { text: 'Tareas' },
  { text: 'Test' },
  { text: 'Logros' },
  { text: 'Sesiones' },
];

export function TeacherCourseDetail() {
  const [course, setCourse] = useState<TeacherCourse>();
  const [selectedTab, setSelectedTab] = useState(0);
  const { _getTeacherCourse } = useTeacher();
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

  const fetchDataCourse = useCallback(async () => {
    const { courseId } = params;
    if (courseId) {
      const id = parseInt(courseId);
      const { success, data, error } = await _getTeacherCourse(id);
      if (success) {
        setCourse(data);
      } else {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchDataCourse();
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
                '../../../../assets/images/placeholder-image-details.svg'
              }
            ></img>
          </div>
          <div className={styles['basic-info']}>
            <span className={`${styles['noted']} ${styles['status']}`}>
              {translateStatus(course.status)}
            </span>
            <span className={`${styles['noted']}`}>
              {translateCategory(course.category_slug)}
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
              <div className={styles['task']}>
                {course.tasks.map((task, index) => (
                  <div className={styles['task-content']} key={index}>
                    <h4 className={styles['title-task']}>{task.title}</h4>
                    <h4 className={styles['description-task']}>
                      {task.description}
                    </h4>
                    {task.file_url && (
                      <a href={task.file_url} target="blank_">
                        Archivo Adjunto
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            {selectedTab === 3 && (
              <QuizzesList quizzes={course.quizzes || []} />
            )}
            {selectedTab === 4 && (
              <AchievementsList achievements={course.achievements || []} />
            )}
            {selectedTab === 5 && course.classroom && (
              <div className={styles['sessions']}>
                {course.session.meetings.map((meeting, index) => (
                  <CourseDateCard
                    className={styles['course-class']}
                    key={index}
                    title={'Reunion ' + (index + 1)}
                    description={
                      'Fecha: ' + meeting.month + ' - ' + meeting.day_number
                    }
                    time={'Hora: ' + meeting.end_time}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TeacherCourseDetail;

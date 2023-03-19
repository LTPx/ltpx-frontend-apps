import {
  CourseContents,
  CourseDateCard,
  Tabs,
} from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './student-course.module.scss';
import StudentCourseAchievements from './tabs/student-course-achievements/student-course-achievements';
import StudentCourseQuizzes from './tabs/student-course-quizzes/student-course-quizzes';
import StudentCourseTasks from './tabs/student-course-tasks/student-course-tasks';

/* eslint-disable-next-line */
export interface StudentCourseProps {}

export function StudentCourse(props: StudentCourseProps) {
  const { _getStudentCourse, enrolledCourse } = useStudent();
  const [selectedTab, setSelectedTab] = useState(0);
  const { courseId } = useParams();
  const id = parseInt(courseId || '');

  const fetchCourse = useCallback(async () => {
    const { success, data, error } = await _getStudentCourse(id);
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleStartTest = () => {
    console.log('start');
  };

  const tabs = [
    { text: 'Curso' },
    { text: 'Clases' },
    { text: 'Tareas' },
    { text: 'Tests' },
    { text: 'Logros' },
  ];

  // { text: 'Curso', url: `/student/courses/${courseId}/?tab=curse` },
  // { text: 'Clases', url: `/student/courses/${courseId}/?tab=classes` },
  // { text: 'Tareas', url: `/student/courses/${courseId}/?tab=tasks` },
  // { text: 'Tests', url: `/student/courses/${courseId}/?tab=quizzes` },
  // { text: 'Logros', url: `/student/courses/${courseId}/?tab=achievements` },
  const handleClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className={styles['container']}>
      <h1>Curso: {enrolledCourse.title}</h1>
      <br />
      <div className="card with-padding">
        <Tabs
          tabs={tabs}
          isNav={false}
          onClickTab={(option) => handleClick(option)}
        />
        <div className={styles['tabs-content']}>
          {selectedTab === 0 && (
            <div className={styles['contents-course']}>
              <h2 className={styles['title-content']}>Sobre el Curso</h2>
              <p className={styles['about-course']}>
                {enrolledCourse.description}
              </p>
              <h3 className={styles['subtitle-content']}>Contenidos</h3>
              <CourseContents contents={enrolledCourse.contents || []} />
            </div>
          )}
          {selectedTab === 1 && (
            <div className={styles['course-date']}>
              {enrolledCourse.session.meetings.map((meeting, index) => (
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
          {selectedTab === 2 && (
            <StudentCourseTasks
              courseId={enrolledCourse.id}
            />
          )}
          {selectedTab === 3 && (
            <StudentCourseQuizzes
              courseId={enrolledCourse.id}
            />
          )}
          {selectedTab === 4 && (
            <StudentCourseAchievements
              courseId={ parseInt(courseId || '')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentCourse;

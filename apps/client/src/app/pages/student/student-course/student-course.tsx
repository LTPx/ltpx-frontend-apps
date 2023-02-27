import {
  AchievementCard,
  CourseContents,
  CourseDateCard,
  QuizStudentCard,
  Tabs,
} from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './student-course.module.scss';

/* eslint-disable-next-line */
export interface StudentCourseProps {}

export function StudentCourse(props: StudentCourseProps) {
  const { _getStudentCourse, enrolledCourse } = useStudent();
  const params = useParams();
  const { courseId } = params;
  const id = parseInt(courseId || '');
  const [selectedTab, setSelectedTab] = useState(0);

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
    { text: 'Test' },
    { text: 'Logros' },
    { text: 'Clases' },
  ];
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
            <div className={styles['quizzes-content']}>
              {enrolledCourse.quizzes?.map((quiz, index) => (
                <div className={styles['quiz']} key={index}>
                  <QuizStudentCard
                    title={quiz.name}
                    totalQuestions={quiz.questions.length}
                    onClick={handleStartTest}
                    url={`/student/course/${enrolledCourse.id}/quiz/${quiz.id}`}
                    urlReviewQuiz={`/student/quiz-review/${quiz.id}`}
                  />
                </div>
              ))}
            </div>
          )}
          {selectedTab === 2 && (
            <div className={styles['achievements-content']}>
              {enrolledCourse.achievements?.map((achievement, index) => (
                <AchievementCard
                  key={index}
                  image={achievement.image}
                  text={achievement.title}
                />
              ))}
            </div>
          )}
          {selectedTab === 3 && (
            <div className={styles['course-date']}>
              {enrolledCourse.sessions[0].meetings.map((meeting, index) => (
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
      </div>
    </div>
  );
}

export default StudentCourse;

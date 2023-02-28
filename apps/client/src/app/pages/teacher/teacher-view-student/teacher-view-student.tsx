import TeacherReviewQuiz from '../teacher-review-quiz/teacher-review-quiz';
import styles from './teacher-view-student.module.scss';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QuizStudentCard } from '@ltpx-frontend-apps/shared-ui';
/* eslint-disable-next-line */
export interface TeacherViewStudentProps {}

export function TeacherViewStudent(props: TeacherViewStudentProps) {
  const { _getStudentCourse, enrolledCourse } = useStudent();
  const params = useParams();
  const { courseId } = params;
  const id = parseInt(courseId || '');
  const [selectedTab, setSelectedTab] = useState(0);

  const fetchCourse = useCallback(async () => {
    const { success, data, error } = await _getStudentCourse(1);
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

  return (
    <div className={styles['container']}>
      <h2>Perfil de: </h2>
      <div className={styles['content']}>
        <h4>Test dados por el estudiante</h4>
        <div className={styles['quizzes-content']}>
              {enrolledCourse.quizzes?.map((quiz, index) => (
                <div className={styles['quiz']} key={index}>
                  <QuizStudentCard
                    title={quiz.name}
                    totalQuestions={quiz.questions.length}
                    onClick={handleStartTest}
                    url={`/student/quiz/${quiz.id}`}
                    urlReviewQuiz={`/student/quiz-review/${quiz.id}`}
                  />
                </div>
              ))}
            </div>
      </div>
            {/* <TeacherReviewQuiz/> */}
    </div>
  );
}

export default TeacherViewStudent;

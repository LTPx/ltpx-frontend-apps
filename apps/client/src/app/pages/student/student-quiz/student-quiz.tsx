import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './student-quiz.module.scss';

/* eslint-disable-next-line */
export interface StudentQuizProps {}

export function StudentQuiz(props: StudentQuizProps) {
  const { _getStudentQuiz, currentCourse } = useStudent();
  const params = useParams();
  const { quizId } = params;
  const id = parseInt(quizId || '');

  const fetchQuiz = useCallback(async () => {
    const { success, data, error } = await _getStudentQuiz(id);
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className={styles['container']}>
      <h1>Welcome to StudentQuiz!</h1>
    </div>
  );
}

export default StudentQuiz;

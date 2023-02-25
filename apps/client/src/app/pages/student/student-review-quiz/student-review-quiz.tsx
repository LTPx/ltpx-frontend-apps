import { QuizView } from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './student-review-quiz.module.scss';

/* eslint-disable-next-line */
export interface StudentReviewQuizProps {}

export function StudentReviewQuiz(props: StudentReviewQuizProps) {
  const { _getStudentQuiz, currentQuiz } = useStudent();
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
      { currentQuiz.id && <QuizView quiz={currentQuiz}/> }
    </div>
  );
}

export default StudentReviewQuiz;

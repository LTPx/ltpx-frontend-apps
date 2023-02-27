import { QuizView } from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './student-review-quiz.module.scss';

/* eslint-disable-next-line */
export interface StudentReviewQuizProps {}

export function StudentReviewQuiz(props: StudentReviewQuizProps) {
  const { _getStudentQuizResult, currentQuiz } = useStudent();
  const params = useParams();
  const { courseId, quizId } = params;
  const id = parseInt(quizId || '');

  const fetchQuiz = useCallback(async () => {
    console.log('id: ', id);
    const { success, data, error } = await _getStudentQuizResult(id);
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
      {/* { currentQuiz.id && <QuizView quiz={currentQuiz}/> } */}
    </div>
  );
}

export default StudentReviewQuiz;

import { QuizResultSummary } from '@ltpx-frontend-apps/api';
import { QuizView } from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './student-review-quiz.module.scss';

/* eslint-disable-next-line */
export interface StudentReviewQuizProps {}

export function StudentReviewQuiz(props: StudentReviewQuizProps) {
  const [quizResult, setQuizResult] = useState<QuizResultSummary>();
  const { _getStudentQuizResult } = useStudent();
  const params = useParams();
  const { courseId, quizId } = params;
  const id = parseInt(quizId || '');

  const fetchQuiz = useCallback(async () => {
    const { success, data, error } = await _getStudentQuizResult(id);
    if (success) {
      console.log('data: ', data);
      setQuizResult(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className={styles['container']}>
      {quizResult?.id && (
        <QuizView
          quiz={quizResult.quiz}
          userAnswers={quizResult.user_answers}
          score={quizResult.score}
        />
      )}
    </div>
  );
}

export default StudentReviewQuiz;

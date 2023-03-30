import { QuizResultSummary } from '@ltpx-frontend-apps/api';
import {
  QuizReviewTeacher,
} from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import styles from './teacher-review-quiz.module.scss';

/* eslint-disable-next-line */
export interface TeacherReviewQuizProps {
  quizId: number;
}

export function TeacherReviewQuiz(props: TeacherReviewQuizProps) {
  const { quizId } = props;
  const [quiz, setQuiz] = useState<QuizResultSummary>();
  const { _getStudentQuizResult } = useStudent();

  const fetchQuiz = useCallback(async () => {
    const { success, data, error } = await _getStudentQuizResult(quizId);
    if (success) {
      console.log('data: ', data);
      setQuiz(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className={styles['container']}>
      {quiz?.id && (
        <QuizReviewTeacher
          quiz={quiz.quiz}
          userAnswers={quiz.user_answers}
          score={quiz.score}
          submittedAt={quiz.submitted_at}
        />
      )}
    </div>
  );
}

export default TeacherReviewQuiz;

import { QuizResultSummary } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, QuizReviewTeacher } from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './teacher-review-quiz.module.scss';

/* eslint-disable-next-line */
export interface TeacherReviewQuizProps {}

export function TeacherReviewQuiz(props: TeacherReviewQuizProps) {
  const [quiz, setQuiz] = useState<QuizResultSummary>();
  const { _getStudentQuizResult } = useStudent();
  const { quizId } = useParams();
  const id = parseInt(quizId || '');

  const fetchQuiz = useCallback(async () => {
    const { success, data, error } = await _getStudentQuizResult(id);
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
        >
          <Button
            title="Regresar"
            color={ColorsButton.secondary}
            link={`/student/courses/${12}`}
          />
        </QuizReviewTeacher>
      )}
    </div>
  );
}

export default TeacherReviewQuiz;

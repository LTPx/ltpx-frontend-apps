import { QuizResultSummary } from '@ltpx-frontend-apps/api';
import { QuizReviewTeacher } from '@ltpx-frontend-apps/shared-ui';
import { useCourseStudents, useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import styles from './teacher-review-quiz.module.scss';

/* eslint-disable-next-line */
export interface TeacherReviewQuizProps {
  quizId: number;
  close?: () => void;
}

export function TeacherReviewQuiz(props: TeacherReviewQuizProps) {
  const { quizId, close } = props;
  const [quiz, setQuiz] = useState<QuizResultSummary>();
  const { _getStudentQuizResult } = useStudent();
  const { _teacherGradeQuiz } = useCourseStudents();

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

  async function handleGradeQuiz(dataForm: any) {
    if (quiz) {
      const { success, data, error} = await _teacherGradeQuiz(quiz.id, dataForm.answers);
      if (success) {
        console.log('data: ', data);
      } else {
        console.log('error: ', error);
      }
    }
  }

  return (
    <div className={styles['container']}>
      {quiz && (
        <QuizReviewTeacher
          quiz={quiz.quiz}
          userAnswers={quiz.user_answers}
          score={quiz.score}
          submittedAt={quiz.submitted_at}
          onClose={close}
          hideHeader={true}
          onSubmit={handleGradeQuiz}
        />
      )}
    </div>
  );
}

export default TeacherReviewQuiz;

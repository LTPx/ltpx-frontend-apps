import styles from './student-review-quiz.module.scss';
import { QuizResultSummary } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, QuizView } from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface StudentReviewQuizProps {}

export function StudentReviewQuiz(props: StudentReviewQuizProps) {
  const [quizResult, setQuizResult] = useState<QuizResultSummary>();
  const { _getStudentQuizResult } = useStudent();
  const { courseId, quizId } = useParams();
  const id = parseInt(quizId || '');
  const navigate = useNavigate();

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
    <div className={styles['wrap']}>
      <div className={styles['container']}>
        {quizResult?.id && (
          <QuizView
            quiz={quizResult.quiz}
            userAnswers={quizResult.user_answers}
            score={quizResult.score}
            submittedAt={quizResult.submitted_at}
          >
            <Button
              title="Regresar"
              color={ColorsButton.secondary}
              onClick={() => navigate(-1)}
              // link={`/student/course/${slug}`  
            />
          </QuizView>
        )}
      </div>
    </div>
  );
}

export default StudentReviewQuiz;

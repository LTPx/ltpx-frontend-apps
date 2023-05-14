import styles from './student-review-quiz.module.scss';
import { QuizResultSummary, QuizStudentResult } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, QuizView } from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface StudentReviewQuizProps {
  quizId: number;
  onClose: () => void;
}

export function StudentReviewQuiz(props: StudentReviewQuizProps) {
  const { quizId, onClose } = props;
  const [quizResult, setQuizResult] = useState<QuizStudentResult>();
  const { _getStudentQuizResult } = useStudent();
  // const id = parseInt(quizId);

  const fetchQuiz = useCallback(async () => {
    const { success, data, error } = await _getStudentQuizResult(quizId);
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
      {quizResult && (
        <QuizView
          questions={quizResult.questions}
          score={quizResult.score}
          submittedAt={quizResult.submitted_at}
        >
          <Button
            title="Regresar"
            color={ColorsButton.secondary}
            onClick={() => onClose()}
          />
        </QuizView>
      )}
    </div>
  );
}

export default StudentReviewQuiz;

import { QuestionQuiz } from '@ltpx-frontend-apps/api';
import { QuizBuilder, SetupCard } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './quiz.module.scss';

/* eslint-disable-next-line */
export interface QuizProps {
  onSubmit?: (quiz: QuestionQuiz) => void;
}

export function Quiz(props: QuizProps) {
  const [openModal, setOpenModal] = useState(false);
  const [quiz, setQuiz] = useState<QuestionQuiz>();

  return (
    <div className="quizzes">
      <div className={styles['header-text']}>
        <h2>Test</h2>
        <h4 className="muted">Los tests los tomara el estudiante</h4>
      </div>
      {!quiz && (
        <SetupCard
          onClick={() => {
            setOpenModal(true);
          }}
          icon={'paper-outline'}
          text={'Crear test'}
          titleButton={'Configurar Ahora'}
        />
      )}
      <QuizBuilder
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />
      {quiz && (
        <div className={styles['classroom-preview']}>
          <h4>sdadsa</h4>
        </div>
      )}
    </div>
  );
}

export default Quiz;

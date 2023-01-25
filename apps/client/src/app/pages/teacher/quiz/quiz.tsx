import { NewQuizParams, QuestionQuiz } from '@ltpx-frontend-apps/api';
import { QuizBuilder, SetupCard } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './quiz.module.scss';

/* eslint-disable-next-line */
export interface QuizProps {
  onSubmit?: (quiz: QuestionQuiz) => void;
}

export function Quiz(props: QuizProps) {
  const [openModal, setOpenModal] = useState(false);
  const [quiz, setQuiz] = useState<NewQuizParams>();

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
        onSubmit={(data) => {
          setOpenModal(false);
          setQuiz(data);
        }}
      />
      {quiz && (
        <>
          <div className={styles['quiz-preview']}>
            <h4>Examen de: {quiz.name} </h4>
            {quiz.questions.map((ele, key) => (
              <div key={key}>
                <h4>Preguntas de tipo: {ele.kind}</h4>
              </div>
            ))}
          </div>
          <div
            className={styles['edit-btn']}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <h4>Editar Test</h4>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;

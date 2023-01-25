import { EditQuizApiParams, NewQuizParams, QuestionQuiz } from '@ltpx-frontend-apps/api';
import { QuizBuilder, SetupCard } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import { useTeacher } from '../../../store';
import styles from './quiz.module.scss';

/* eslint-disable-next-line */
export interface QuizProps {
  courseId: number;
  onSubmit?: (quiz: QuestionQuiz) => void;
}

export function Quiz(props: QuizProps) {
  const { courseId } = props;
  const [ showForm, setShowForm ] = useState(true);
  const [ quiz, setQuiz] = useState<NewQuizParams>();
  const { createQuiz } = useTeacher();

  const handleCreateQuiz = async(quizParams: NewQuizParams) => {
    console.log(quizParams);
    const data = {
      ...quizParams,
      ...{
        course_id: courseId
      }
    }
    const response = await createQuiz(data);
    console.log(response);
  };

  return (
    <div className="quizzes">
      <div className={styles['header-text']}>
        <h2>Test</h2>
        <h4 className="muted">Los tests los tomara el estudiante</h4>
      </div>
      {!showForm && !quiz &&(
        <SetupCard
          onClick={() => {
            setShowForm(true);
          }}
          icon={'paper-outline'}
          text={'Crear test'}
          titleButton={'Configurar Ahora'}
        />
      )}
      { showForm && (
        <QuizBuilder
          onSubmit={(data) => {
            setShowForm(false);
            setQuiz(data);
            handleCreateQuiz(data)
          }}
        />
      )}
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
              setShowForm(true);
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

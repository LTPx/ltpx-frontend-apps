import { QuizModel, QuizParamsUi } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  Icon,
  QuizBuilder,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse } from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import { ResponseRequest } from '../../teacher-edit-course/teacher-edit-course';
import styles from './course-quizzes.module.scss';

/* eslint-disable-next-line */
export interface CourseQuizzesProps {
  onSubmit?: (data: ResponseRequest) => void;
}

export function CourseQuizzes(props: CourseQuizzesProps) {
  const { onSubmit } = props;
  const [ quizEdit, setQuizEdit ] = useState<QuizModel>();
  const [ showForm, setShowForm ] = useState(false);
  const { course, removeQuiz, addNewQuiz, updateQuiz } = useCourse();
  const { quizzes } = course;

  const handleSaveQuiz = async (quiz: QuizParamsUi) => {
    try {
      const { data } = quiz.id
        ? await updateQuiz({ ...quiz, ...{ id: quiz.id } })
        : await addNewQuiz(quiz);
      onSubmit &&
        onSubmit({
          success: true,
          data: data,
        });
      setShowForm(false);
    } catch (error: any) {
      onSubmit &&
        onSubmit({
          success: false,
          error: error,
        });
    }
  };

  return (
    <div className="quiz-section">
      <div className={styles['header-text']}>
        <h2>Tests</h2>
        <h4 className="muted">Evalúa a tus estudiantes creando tests</h4>
      </div>
      {!showForm && (
        <div className={styles['quizzes']}>
          {quizzes?.map((quiz, index) => (
            <div className={styles['quiz']} key={index}>
              <div className={styles['summary']}>
                <Icon icon="list" size={20} />
                <div className="d">
                  <h4>{quiz.name}</h4>
                  <h5>{quiz.questions.length} preguntas</h5>
                </div>
              </div>
              <div className={styles['actions']}>
                <div
                  className={styles['action']}
                  onClick={() => {
                    setQuizEdit(quiz);
                    setShowForm(true);
                  }}
                >
                  <Icon icon="pencil" size={15} />
                </div>
                <div
                  className={styles['action']}
                  onClick={() => {
                    removeQuiz(quiz.id);
                  }}
                >
                  <Icon icon="trash" size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!showForm && quizzes?.length === 0 && (
        <SetupCard
          onClick={() => {
            setShowForm(true);
          }}
          icon={'paper-outline'}
          text={'Crear test'}
          titleButton={'Configurar Ahora'}
        />
      )}
      {!showForm && quizzes && quizzes.length > 0 && (
        <Button
          title="Crear Nuevo Test"
          className={styles['add-button']}
          color={ColorsButton.accent}
          onClick={() => {
            setShowForm(true);
          }}
        />
      )}
      {showForm && (
        <>
          <QuizBuilder
            quiz={quizEdit}
            className={styles['quiz-forms']}
            onSubmit={(data) => {
              handleSaveQuiz(data);
            }}
            onClose={() => {
              setShowForm(false);
              setQuizEdit(undefined);
            }}
          />
          <Button
            title="Cancelar"
            className={styles['add-button']}
            color={ColorsButton.accent}
            onClick={() => {
              setShowForm(false);
            }}
          />
        </>
      )}
    </div>
  );
}

export default CourseQuizzes;

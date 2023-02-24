import { TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  QuizAnswerQuestion,
  QuizConditionalQuestion,
  QuizMultiselectQuestion,
} from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './student-quiz.module.scss';

/* eslint-disable-next-line */
export interface StudentQuizProps {}

export function StudentQuiz(props: StudentQuizProps) {
  const { _getStudentQuiz, currentQuiz } = useStudent();
  const params = useParams();
  const { quizId } = params;
  const id = parseInt(quizId || '');

  const fetchQuiz = useCallback(async () => {
    const { success, data, error } = await _getStudentQuiz(id);
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className={styles['container']}>
      {currentQuiz.id && (
        <div className={`${styles['quiz-container']} card with-padding`}>
          <div className={styles['header']}>
            <h2>{currentQuiz.name}</h2>
            <div className={styles['progress-quiz']}>
              <p>Progreso</p>
              <h3>1 / {currentQuiz.questions.length}</h3>
            </div>
          </div>
          <div className={styles['content']}>
            <div className={styles['questions']}>
              {currentQuiz.questions.map((question, index) => (
                <div className="question" key={index}>
                  {question.kind === TypeQuestionQuiz.conditional && (
                    <QuizConditionalQuestion
                      title={question.question}
                      description={question.description}
                    />
                  )}
                  {question.kind === TypeQuestionQuiz.multiple && (
                    <QuizMultiselectQuestion
                      title={question.question}
                      description={question.description}
                      answers={question.answers}
                      multiple={true}
                    />
                  )}
                  {question.kind === TypeQuestionQuiz.single && (
                    <QuizMultiselectQuestion
                      title={question.question}
                      description={question.description}
                      answers={question.answers}
                      multiple={false}
                    />
                  )}
                  {question.kind === TypeQuestionQuiz.answer && (
                    <QuizAnswerQuestion
                      title={question.question}
                      description={question.description}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles['footer']}>
            <Button
              title="Cancelar"
              color={ColorsButton.white}
              outline={true}
            />
            <Button title="Finalizar test" />
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentQuiz;

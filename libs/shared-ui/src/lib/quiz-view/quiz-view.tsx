import { QuizModel, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import { useState } from 'react';
import Button, { ColorsButton } from '../button/button';
import Icon from '../icon/icon';
import styles from './quiz-view.module.scss';

/* eslint-disable-next-line */
export interface QuizViewProps {
  quiz: QuizModel;
}

export function QuizView(props: QuizViewProps) {
  const { quiz } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div className={styles['container']}>
      {quiz.id && (
        <div className={`${styles['quiz-container']} card with-padding`}>
          <div className={styles['header']}>
            <h2>Revisión: {quiz.name}</h2>
            <div className={styles['progress-quiz']}>
              <p>Calificación</p>
              <h3>1 / {quiz.questions.length}</h3>
            </div>
          </div>
          <div className={styles['content']}>
            <div className={styles['questions']}>
              {quiz.questions.map((question, index) => (
                <div className="question" key={index}>
                  {question.kind === TypeQuestionQuiz.conditional && (
                    <div className={styles['question-test']}>
                      <h3> {question.question} </h3>
                      <p>{question.description}</p>
                      <div className={styles['item']}>
                        {question.answers.map((a) => (
                          <div>
                            {a.correct == true ? (
                              <h4 className={styles['selected']}>{a.text} </h4>
                            ) : (
                              <h4>{a.text} </h4>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {question.kind === TypeQuestionQuiz.multiple && (
                    <div className={styles['question-test']}>
                      <h3> {question.question} </h3>
                      <p>{question.description}</p>
                      <div className={styles['item']}>
                        {question.answers.map((a) => (
                          <div>
                            {a.correct == true ? (
                              <h4 className={styles['selected']}>{a.text} </h4>
                            ) : (
                              <h4>{a.text} </h4>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {question.kind === TypeQuestionQuiz.single && (
                    <div className={styles['question-test']}>
                      <h3> {question.question} </h3>
                      <p>{question.description}</p>
                      <div className={styles['item']}>
                        {question.answers.map((a) => (
                          <div>
                            {a.correct == true ? (
                              <h4 className={styles['selected']}>{a.text} </h4>
                            ) : (
                              <h4>{a.text} </h4>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {question.kind === TypeQuestionQuiz.answer && (
                    <div className={styles['answer']}>
                      <h3> {question.question} </h3>
                      <p>{question.description}</p>
                      {question.answers.map((a) => (
                        <p>Su respuesta fue: {a.text}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles['footer']}>
            <Button
              title="Regresar"
              color={ColorsButton.secondary}
              link={`/student/dashboard/`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizView;

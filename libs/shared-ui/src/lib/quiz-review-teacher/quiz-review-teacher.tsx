import styles from './quiz-review-teacher.module.scss';
import { QuizModel, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import Button, { ColorsButton } from '../button/button';
import TextArea from '../text-area/text-area';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface QuizReviewTeacherProps {
  quiz: QuizModel;
}

export function QuizReviewTeacher(props: QuizReviewTeacherProps) {
  const { quiz } = props;
  const [style, setStyle] = useState('answer-content');

  const correctAnswer = () => {
    setStyle('answer-correct');
  };
  const errorAnswer = () => {
    setStyle('answer-noCorrect');
  };
  return (
    <div className={styles['container']}>
      {quiz.id && (
        <div className={`${styles['quiz-container']} card with-padding`}>
          <div className={styles['header']}>
            <h2>Test: {quiz.name}</h2>
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
                        {question.answers.map((answer, index) => (
                          <div key={index}>
                            {answer.correct == true ? (
                              <h4 className={styles['selected']}>
                                {answer.text}{' '}
                              </h4>
                            ) : (
                              <h4>{answer.text} </h4>
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
                        {question.answers.map((answer, index) => (
                          <div key={index}>
                            {answer.correct == true ? (
                              <h4 className={styles['selected']}>
                                {answer.text}{' '}
                              </h4>
                            ) : (
                              <h4>{answer.text} </h4>
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
                        {question.answers.map((answer, index) => (
                          <div key={index}>
                            {answer.correct == true ? (
                              <h4 className={styles['selected']}>
                                {answer.text}{' '}
                              </h4>
                            ) : (
                              <h4>{answer.text} </h4>
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
                      <div className={styles[style]}>
                        {question.answers && <p>Aquí estará la respuesta</p>}
                      </div>
                      <div className={styles['btn-to-rate']}>
                        <h4>Esta respuesta es correcta?</h4>
                        <div className={styles['btns']}>
                          <Button
                            className={styles['btn-correct']}
                            title="Si"
                            icon="check"
                            color={ColorsButton.primary}
                            outline={true}
                            onClick={correctAnswer}
                          />
                          <Button
                            className={styles['btn-correct']}
                            title="No"
                            icon="close"
                            color={ColorsButton.secondary}
                            outline={true}
                            onClick={errorAnswer}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles['revision']}>
            <h3>Observaciones Generales</h3>
            <TextArea rows={6} />
          </div>
          <div className={styles['footer']}>
            <Button
              title="Cancelar"
              color={ColorsButton.white}
              link={`/teacher/dashboard/`}
            />
            <Button
              title="Guardar"
              color={ColorsButton.primary}
              link={`/teacher/dashboard/`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizReviewTeacher;

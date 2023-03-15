import styles from './quiz-review-teacher.module.scss';
import { QuizModel, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import Button, { ColorsButton } from '../button/button';
import TextArea from '../text-area/text-area';
import { ReactElement, useState } from 'react';
import moment from 'moment';
moment.locale('es');

/* eslint-disable-next-line */
export interface QuizReviewTeacherProps {
  quiz: QuizModel;
  score: number;
  submittedAt: string;
  userAnswers: {
    answer_id: number;
    id: number;
    text?: string;
  }[];
  children: ReactElement;
}

export function QuizReviewTeacher(props: QuizReviewTeacherProps) {
  const { quiz, userAnswers, score, submittedAt, children } = props;
  const [style, setStyle] = useState('answer-content');
  const answersIds = userAnswers.map((answer) => answer.answer_id);
  const foundAnswer = (answerId: number) => {
    return userAnswers.find((answer) => answer.answer_id == answerId);
  };

  const correctAnswer = () => {
    setStyle('answer-correct');
  };

  const errorAnswer = () => {
    setStyle('answer-noCorrect');
  };

  return (
    <div className={styles['container']}>
      {quiz.id && (
        <div className={`${styles['quiz-container']} card`}>
          <div className={styles['header']}>
            <h2>Test: {quiz.name}</h2>
            <h4>
              Enviado: {moment(submittedAt).format('MMMM D YYYY, h:mm a')}
            </h4>
          </div>
          <div className={styles['content']}>
            <div className={styles['questions']}>
              {quiz.questions_attributes.map((question, index) => (
                <div className="question" key={index}>
                  {question.kind === TypeQuestionQuiz.conditional && (
                    <>
                      <h3 className={styles['question-text']}>
                        {index + 1}. {question.question}
                      </h3>
                      <p>{question.description}</p>
                      <div className={styles['items']}>
                        {question.answers_attributes.map((answer, i) => (
                          <p
                            key={i}
                            className={`${styles['question-answer']} ${
                              answersIds.includes(answer.id || -1)
                                ? styles['selected']
                                : ''
                            }`}
                          >
                            {answer.text}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                  {question.kind === TypeQuestionQuiz.multiple && (
                    <>
                      <h3 className={styles['question-text']}>
                        {index + 1}. {question.question}
                      </h3>
                      <p>{question.description}</p>
                      <div className={styles['items']}>
                        {question.answers_attributes.map((answer, i) => (
                          <p
                            key={i}
                            className={`${styles['question-answer']} ${
                              answersIds.includes(answer.id || -1)
                                ? styles['selected']
                                : ''
                            }`}
                          >
                            {answer.text}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                  {question.kind === TypeQuestionQuiz.single && (
                    <>
                      <h3 className={styles['question-text']}>
                        {index + 1}. {question.question}
                      </h3>
                      <p>{question.description}</p>
                      <div className={styles['items']}>
                        {question.answers_attributes.map((answer, i) => (
                          <p
                            key={i}
                            className={`${styles['question-answer']} ${
                              answersIds.includes(answer.id || -1)
                                ? styles['selected']
                                : ''
                            }`}
                          >
                            {answer.text}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                  {question.kind === TypeQuestionQuiz.answer && (
                    <div className={styles['answer']}>
                      <div>
                        <h3 className={styles['question-text']}>
                          {index + 1}. {question.question}
                        </h3>
                        <p>{question.description}</p>
                        {question.answers_attributes.map((answer, i) => (
                          <pre className={styles['question-answer']} key={i}>
                            {foundAnswer(answer.id)?.text}
                          </pre>
                        ))}
                      </div>
                      <div className={styles['buttons-rate']}>
                        <Button
                          className={styles['btn-correct']}
                          title="Es incorrecto"
                          icon="close"
                          color={ColorsButton.secondary}
                          outline={true}
                          onClick={errorAnswer}
                        />
                        <Button
                          className={styles['btn-correct']}
                          title="La respuesta es correcta"
                          icon="check"
                          color={ColorsButton.primary}
                          outline={true}
                          onClick={correctAnswer}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles['feedback']}>
            <TextArea
              rows={6}
              label="Observaciones Generales"
              description="Puedes agregar feedback en caso que el estudiante tenga un resultado negativo 😐 o felicitar al estudiante por alcanzar una nota alta 😃"
            />
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

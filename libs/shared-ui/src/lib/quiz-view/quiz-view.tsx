import { QuizModel, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import styles from './quiz-view.module.scss';
import moment from 'moment';
import { ReactElement } from 'react';
moment.locale('es');
/* eslint-disable-next-line */
export interface QuizViewProps {
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

export function QuizView(props: QuizViewProps) {
  const { quiz, userAnswers, score, submittedAt, children } = props;
  const answersIds = userAnswers.map((answer) => answer.answer_id);
  const foundAnswer = (answerId: number) => {
    return userAnswers.find((answer) => answer.answer_id == answerId);
  };

  return (
    <div className={styles['container']}>
      {quiz.id && (
        <div className={`${styles['quiz-container']} card`}>
          <div className={styles['header']}>
            <div className={styles['quiz-info']}>
              <h2>Test: {quiz.name}</h2>
              <h4>
                Enviado: {moment(submittedAt).format('MMMM D YYYY, h:mm a')}
              </h4>
            </div>
            <div className={styles['quiz-score']}>
              <p>Calificación</p>
              <h3>{score} / 100</h3>
            </div>
          </div>
          <div className={styles['content']}>
            <div className={styles['questions']}>
              {quiz.questions.map((question, index) => (
                <div className={styles['question']} key={index}>
                  {question.kind === TypeQuestionQuiz.conditional && (
                    <>
                      <h3 className={styles['question-text']}>
                        {index + 1}. {question.question}
                      </h3>
                      <p>{question.description}</p>
                      <div className={styles['items']}>
                        {question.answers.map((answer, i) => (
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
                        {question.answers.map((answer, i) => (
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
                        {question.answers.map((answer, i) => (
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
                    <>
                      <h3 className={styles['question-text']}>
                        {index + 1}. {question.question}
                      </h3>
                      <p>{question.description}</p>
                      {question.answers.map((answer, i) => (
                        <pre className={styles['question-answer']} key={i}>
                          {foundAnswer(answer.id)?.text}
                        </pre>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles['footer']}>{children}</div>
        </div>
      )}
    </div>
  );
}

export default QuizView;
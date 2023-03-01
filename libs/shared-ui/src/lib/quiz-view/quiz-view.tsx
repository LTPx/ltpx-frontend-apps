import { QuizModel, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import styles from './quiz-view.module.scss';
import moment from 'moment'
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
  const answersIds = userAnswers.map((answer)=> answer.answer_id);

  return (
    <div className={styles['container']}>
      {quiz.id && (
        <div className={`${styles['quiz-container']} card with-padding`}>
          <div className={styles['header']}>
            <div className="s">
              <h2>Test: {quiz.name}</h2>
              <h4>Enviado: {moment(submittedAt).format('MMMM D YYYY, h:mm a')}</h4>
            </div>
            <div className={styles['progress-quiz']}>
              <p>Calificación</p>
              <h3>{score} / 100</h3>
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
                        {question.answers.map((answer, i) => (
                          <div key={i}>
                            {answersIds.includes(answer.id || -1) ? (
                              <h4 className={styles['selected']}>{answer.text} </h4>
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
                        {question.answers.map((answer, i) => (
                          <div key={i}>
                            {answersIds.includes(answer.id || -1) ? (
                              <h4 className={styles['selected']}>{answer.text} </h4>
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
                        {question.answers.map((answer, i) => (
                          <div key={i}>
                            {answersIds.includes(answer.id || -1) ? (
                              <h4 className={styles['selected']}>{answer.text} </h4>
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
                      {question.answers.map((answer, i) => (
                        <p key={i}>Su respuesta fue: {answer.text}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles['footer']}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizView;

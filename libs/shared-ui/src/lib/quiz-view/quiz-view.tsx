import { QuizModel, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import styles from './quiz-view.module.scss';
import { ReactElement } from 'react';
import { useCourseUtil } from '@ltpx-frontend-apps/store';
/* eslint-disable-next-line */
export interface QuizViewProps {
  score: number;
  submittedAt: string;
  questions: {
    question: string;
    description: string;
    kind: TypeQuestionQuiz;
    answers: {
      text: string;
      user_select: boolean;
      user_text_answer: string;
      is_correct: boolean;
    }[];
  }[];
  children: ReactElement;
}

export function QuizView(props: QuizViewProps) {
  const { questions, score, submittedAt, children } = props;
  const { translateOption } = useCourseUtil();

  return (
    <div className={styles['container']}>
      <div className={`${styles['quiz-container']} card`}>
        {/* <div className={styles['header']}>
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
        </div> */}
        <div className={styles['content']}>
          <div className={styles['questions']}>
            {questions.map((question, index) => (
              <div className={styles['question']} key={index}>
                {question.kind === TypeQuestionQuiz.conditional && (
                  <>
                    <h3 className={styles['question-text']}>
                      {index + 1}. {question.question}
                    </h3>
                    <p>{question.description}</p>
                    <div className={styles['items']}>
                      {question.answers.map((answer, i) => (
                        <div key={i}>
                          <p
                            className={`${styles['question-answer']} ${
                              answer.user_select
                                ? answer.is_correct && answer.user_select
                                  ? styles['selected-true']
                                  : styles['selected-false']
                                : ''
                            }`}
                          >
                            {answer.text}
                          </p>
                        </div>
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
                        <div key={i}>
                          <p
                            className={`${styles['question-answer']} ${
                              answer.user_select
                                ? answer.is_correct && answer.user_select
                                  ? styles['selected-true']
                                  : styles['selected-false']
                                : ''
                            }`}
                          >
                            {answer.text}
                          </p>
                        </div>
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
                        <div key={i}>
                          <p
                            className={`${styles['question-answer']} ${
                              answer.user_select
                                ? answer.is_correct && answer.user_select
                                  ? styles['selected-true']
                                  : styles['selected-false']
                                : ''
                            }`}
                          >
                            {answer.text}
                          </p>
                        </div>
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
                      <div key={i}>
                        <p
                          className={`${styles['question-answer']} ${
                            answer.user_select
                              ? answer.is_correct && answer.user_select
                                ? styles['selected-true']
                                : styles['selected-false']
                              : ''
                          }`}
                        >
                          {answer.user_text_answer}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles['footer']}>{children}</div>
      </div>
    </div>
  );
}

export default QuizView;

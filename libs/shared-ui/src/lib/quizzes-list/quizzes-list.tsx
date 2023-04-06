import { QuizParamsUi, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import { ReactElement } from 'react';
import Icon from '../icon/icon';
import PanelAccordion from '../panel-accordion/panel-accordion';
import styles from './quizzes-list.module.scss';
import { useCourseUtil } from '@ltpx-frontend-apps/store';

/* eslint-disable-next-line */
export interface QuizzesListProps {
  quizzes: QuizParamsUi[];
  children?: ReactElement;
}

export function QuizzesList(props: QuizzesListProps) {
  const { quizzes, children } = props;
  const { translateOption } = useCourseUtil();

  return (
    <div className={styles['quizzes']}>
      {quizzes?.map((quiz, index) => (
        <div className={styles['quiz']} key={index}>
          <PanelAccordion
            classNameSubTitle={styles['subtitle-text']}
            title={'Test: ' + quiz.name}
            subTitle={
              'Total de preguntas: ' +
              quiz.questions_attributes.length +
              ' y puntos necesarios para aprobar: ' +
              quiz.approve_score
            }
          >
            <div>
              {quiz.questions_attributes.map((question, index) => (
                <div className={styles['test']} key={index}>
                  <div className={styles['title-content']}>
                    <h4 className={styles['title-test']}>
                      {index + 1}. {question.question}
                    </h4>
                    <h4 className={styles['points-test']}>
                      Puntos: ({question.points})
                    </h4>
                  </div>
                  <h4 className={styles['description-test']}>
                    {question.description}
                  </h4>
                  {question.answers_attributes.map((answer, index) => (
                    <div key={index}>
                      {question.kind === TypeQuestionQuiz.conditional ? (
                        <h4>{translateOption(answer.text)}</h4>
                      ) : (
                        <div className={styles['options-test']}>
                          <h4>{answer.text}</h4>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </PanelAccordion>
          <div className={styles['actions']}>
            {/* <div className={styles['action']} onClick={() => {}}>
              <Icon icon="plus" size={15} />
            </div> */}
            {children}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuizzesList;

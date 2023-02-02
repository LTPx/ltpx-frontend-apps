import { QuizParamsUi } from '@ltpx-frontend-apps/api';
import Icon from '../icon/icon';
import styles from './quizzes-list.module.scss';

/* eslint-disable-next-line */
export interface QuizzesListProps {
  quizzes: QuizParamsUi[];
}

export function QuizzesList(props: QuizzesListProps) {
  const { quizzes} = props;
  return (
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
              }}
            >
              <Icon icon="plus" size={15} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuizzesList;

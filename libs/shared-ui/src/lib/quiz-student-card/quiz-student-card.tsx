import { ReactElement } from 'react';
import Button, { ColorsButton } from '../button/button';
import Icon from '../icon/icon';
import styles from './quiz-student-card.module.scss';

/* eslint-disable-next-line */
export interface QuizStudentCardProps {
  title: string;
  totalQuestions: number;
  children?: ReactElement;
}

export function QuizStudentCard(props: QuizStudentCardProps) {
  const { title, totalQuestions, children } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['row']}>
        <Icon icon={'quiz-outline'} size={30} />
        <div className={styles['row-info']}>
          <h4>{title}</h4>
          <h4 className={styles['total-questions']}>
            Total de preguntas: {totalQuestions}
          </h4>
        </div>
      </div>
      <div className={styles['row-buttons']}>
        {children}
      </div>
    </div>
  );
}

export default QuizStudentCard;

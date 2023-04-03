import { ReactElement } from 'react';
import Button, { ColorsButton } from '../button/button';
import Icon from '../icon/icon';
import styles from './quiz-student-card.module.scss';

/* eslint-disable-next-line */
export interface QuizStudentCardProps {
  title: string;
  text: string;
  score?: number;
  approved?: boolean;
  children?: ReactElement;
}

export function QuizStudentCard(props: QuizStudentCardProps) {
  const { title, text, children, approved, score } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['row']}>
        <Icon icon={'quiz-outline'} size={30} />
        <div className={styles['row-info']}>
          <h4>{title}</h4>
          <h4 className={styles['total-questions']}>{text}</h4>
          {approved ? (
            <h5 className={styles['approved']}>
              Calificación: {score} - Aprobado
            </h5>
          ) : (
            <h5 className={styles['no-approved']}>
              Calificación: {score} - No aprobado
            </h5>
          )}
        </div>
      </div>
      <div className={styles['row-buttons']}>{children}</div>
    </div>
  );
}

export default QuizStudentCard;

import { ReactElement } from 'react';
import Icon from '../icon/icon';
import styles from './quiz-student-card.module.scss';

/* eslint-disable-next-line */
export interface QuizStudentCardProps {
  title: string;
  text: string;
  score?: number;
  feedback?: string;
  approved?: boolean;
  approveScore?: number;
  children?: ReactElement;
}

export function QuizStudentCard(props: QuizStudentCardProps) {
  const { title, text, children, approved, score, feedback, approveScore } =
    props;

  return (
    <div className={styles['container']}>
      <div className={styles['wrap']}>
        <div className={styles['row']}>
          <Icon icon={'quiz-outline'} size={30} />
          <div className={styles['row-info']}>
            <h4 className={styles['title']}>{title}</h4>
            <h4 className={styles['total-questions']}>{text}</h4>
            {approveScore && <h4>Puntos necesarios: {approveScore}</h4>}
            {score && (
              <div>
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
            )}
          </div>
        </div>
        <div className={styles['row-buttons']}>{children}</div>
      </div>
      {feedback && (
        <div className={styles['feedback']}>
          <h4 className={styles['text-feedback']}>
            <strong>Feedback: </strong> {feedback}
          </h4>
        </div>
      )}
    </div>
  );
}

export default QuizStudentCard;

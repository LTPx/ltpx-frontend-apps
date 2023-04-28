import { ReactElement } from 'react';
import styles from './quiz-score.module.scss';

/* eslint-disable-next-line */
export interface QuizScoreProps {
  totalScore: number;
  approveScore: number;
  children?: ReactElement;
}

export function QuizScore(props: QuizScoreProps) {
  const { totalScore, approveScore, children } = props;

  return (
    <div className={styles['container']}>
      {totalScore >= approveScore ? (
        <div className={styles['content']}>
          <h3>Tu resultado es</h3>
          <h1 className={styles['approve']}>{totalScore}</h1>
          <h3 className={styles['approve']}>Felicitaciones!</h3>
        </div>
      ) : (
        <div className={styles['content']}>
          <h3>Tu resultado es</h3>
          <h1 className={styles['no-approve']}>{totalScore}</h1>
          <h3 className={styles['no-approve']}>
            Te faltaron {approveScore - totalScore} puntos
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}

export default QuizScore;

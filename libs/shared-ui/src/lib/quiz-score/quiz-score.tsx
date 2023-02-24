import { ReactElement } from 'react';
import Button, { ColorsButton } from '../button/button';
import styles from './quiz-score.module.scss';

/* eslint-disable-next-line */
export interface QuizScoreProps {
  totalScore: number;
  message: string;
  img: string;
  children?: ReactElement;
}

export function QuizScore(props: QuizScoreProps) {
  const { totalScore, message, img, children } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['head-score']}>
        <img src={img}></img>
      </div>
      <div className={styles['content']}>
        <h1>{totalScore}</h1>
        <h3>Tu puntuación total</h3>
        <h3 className={styles['message']}>{message}</h3>
      </div>
      {children}
    </div>
  );
}

export default QuizScore;

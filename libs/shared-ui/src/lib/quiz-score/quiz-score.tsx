import Button, { ColorsButton } from '../button/button';
import styles from './quiz-score.module.scss';

/* eslint-disable-next-line */
export interface QuizScoreProps {
  totalScore: number;
  message: string;
}

export function QuizScore(props: QuizScoreProps) {
  const { totalScore, message } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['head-score']}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR83K5rBkgtaRL7Or_WNwxAzS_wy-8DaGDMKA&usqp=CAU"></img>
      </div>
      <div className={styles['content']}>
        <h1>{totalScore}</h1>
        <h4>Your total Score</h4>
        <h4 className={styles['message']}>{message}</h4>
      </div>
      <Button
        className={styles['button']}
        title={'Back to Home'}
        color={ColorsButton.secondary}
      />
    </div>
  );
}

export default QuizScore;

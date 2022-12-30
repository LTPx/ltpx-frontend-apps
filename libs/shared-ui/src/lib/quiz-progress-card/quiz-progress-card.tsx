import ProgressBar from '../progress-bar/progress-bar';
import styles from './quiz-progress-card.module.scss';

/* eslint-disable-next-line */
export interface QuizProgressCardProps {
  percentage: number;
  text: string;
}

export function QuizProgressCard(props: QuizProgressCardProps) {
  const {
    percentage,
    text
  } = props;
  return (
    <div className={styles['container']}>
      <h3>Quiz Complete</h3>
      <div className={styles['progress']}>
        <ProgressBar percentage={percentage} text={text}></ProgressBar>
      </div>
    </div>
  );
}

export default QuizProgressCard;

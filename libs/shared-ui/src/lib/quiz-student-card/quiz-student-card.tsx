import Button from '../button/button';
import Icon from '../icon/icon';
import styles from './quiz-student-card.module.scss';

/* eslint-disable-next-line */
export interface QuizStudentCardProps {
  title: string;
  totalQuestions: number;
  url: string;
  onClick?: () => void;
}

export function QuizStudentCard(props: QuizStudentCardProps) {
  const { title, totalQuestions, url, onClick } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['row-icon']}>
        <Icon icon={'quiz-outline'} size={30} />
      </div>
      <div className={styles['row-info']}>
        <h4>{title}</h4>
        <h4 className={styles['total-questions']}>Total de preguntas: {totalQuestions}</h4>
      </div>
      <div className={styles['row-btn']}>
        <Button
          className={styles['btn']}
          title="Empezar test"
          icon="play-filled"
          onClick={onClick}
          link={url}
        />
      </div>
    </div>
  );
}

export default QuizStudentCard;

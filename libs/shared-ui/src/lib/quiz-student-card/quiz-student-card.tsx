import Button, { ColorsButton } from '../button/button';
import Icon from '../icon/icon';
import styles from './quiz-student-card.module.scss';

/* eslint-disable-next-line */
export interface QuizStudentCardProps {
  title: string;
  totalQuestions: number;
  url: string;
  urlReviewQuiz?: string;
  onClick?: () => void;
  approved?: boolean;
}

export function QuizStudentCard(props: QuizStudentCardProps) {
  const { title, totalQuestions, url, onClick, approved, urlReviewQuiz } =
    props;

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
      <div className={styles['row-btn']}>
        {approved ? (
          <Button
            className={styles['btn']}
            title="Empezar test"
            icon="play-filled"
            onClick={onClick}
            link={url}
          />
        ) : (
          <div className={styles['buttons-review']}>
            <Button
              className={styles['btn']}
              color={ColorsButton.secondary}
              title="Revisar Test"
              icon="search"
              onClick={onClick}
              link={urlReviewQuiz}
            />
            <Button
              className={styles['btn']}
              color={ColorsButton.secondary}
              title="Volver a Intentar"
              icon="play-filled"
              onClick={onClick}
              link={url}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizStudentCard;

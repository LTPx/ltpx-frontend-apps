import { ReactElement } from 'react';
import styles from './quiz-question-view.module.scss';

/* eslint-disable-next-line */
export interface QuizQuestionViewProps {
  number?: number;
  question: string;
  description?: string;
  children?: ReactElement;
  className?: string;
}

export function QuizQuestionView(props: QuizQuestionViewProps) {
  const { className, number, question, description, children} = props;
  return (
    <div className={`${styles['question']} ${className}`}>
      <div className={styles['summary']}>
        <div className={styles['number']}>{number}</div>
        <div className={styles['text']}>
          <h4>{question}</h4>
          <h5>{description}</h5>
        </div>
      </div>
      {children}
    </div>
  );
}

export default QuizQuestionView;

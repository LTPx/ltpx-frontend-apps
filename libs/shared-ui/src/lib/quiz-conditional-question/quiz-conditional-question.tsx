import { Answer, UserAnswer } from '@ltpx-frontend-apps/api';
import GroupSelectOption from '../group-select-option/group-select-option';
import styles from './quiz-conditional-question.module.scss';

/* eslint-disable-next-line */
export interface QuizConditionalQuestionProps {
  title: string;
  description?: string;
  answers: Answer[];
  onChange?: (answer: UserAnswer) => void;
}

export function QuizConditionalQuestion(props: QuizConditionalQuestionProps) {
  const { title, description, answers, onChange } = props;

  return (
    <div className={styles['container']}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles['options']}>
        <GroupSelectOption
          options={answers}
          onChange={(option) => {
            onChange && onChange(option);
          }}
        />
      </div>
    </div>
  );
}

export default QuizConditionalQuestion;

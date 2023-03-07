import { AnswerModel, UserAnswer } from '@ltpx-frontend-apps/api';
import GroupSelectOption from '../group-select-option/group-select-option';
import styles from './quiz-conditional-question.module.scss';

/* eslint-disable-next-line */
export interface QuizConditionalQuestionProps {
  number?: number;
  title: string;
  description?: string;
  answers: AnswerModel[];
  onChange?: (answer: UserAnswer) => void;
}

export function QuizConditionalQuestion(props: QuizConditionalQuestionProps) {
  const { title, description, answers, onChange, number } = props;

  return (
    <div className={styles['container']}>
      <h3>{number}. {title}</h3>
      <p>{description}</p>
      <div className={styles['options']}>
        <GroupSelectOption
          options={answers}
          onChange={(option) => {
            onChange && onChange({
              answer_id: option.id,
              question_id: option.question_id,
            });
          }}
        />
      </div>
    </div>
  );
}

export default QuizConditionalQuestion;

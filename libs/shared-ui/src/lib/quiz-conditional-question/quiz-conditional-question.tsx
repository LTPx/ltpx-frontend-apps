import { AnswerModel, UserAnswer } from '@ltpx-frontend-apps/api';
import GroupSelectOption from '../group-select-option/group-select-option';
import styles from './quiz-conditional-question.module.scss';
import { useCourseUtil } from '@ltpx-frontend-apps/store';
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
  const { translateOption } = useCourseUtil();

  return (
    <div className={styles['container']}>
      <h3>
        {number}. {title}
      </h3>
      <p>{description}</p>
      <div className={styles['options']}>
        <GroupSelectOption
          options={answers.map((answer) => {
            return { ...answer, ...{ text: translateOption(answer.text) } };
          })}
          onChange={(option) => {
            onChange &&
              onChange({
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

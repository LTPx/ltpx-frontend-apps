import GroupSelectOption, {
  OptionSelectGroup,
} from '../group-select-option/group-select-option';
import styles from './quiz-conditional-question.module.scss';

/* eslint-disable-next-line */
export interface QuizConditionalQuestionProps {
  title: string;
  description?: string;
}

export function QuizConditionalQuestion(props: QuizConditionalQuestionProps) {
  const { title, description } = props;
  return (
    <div className={styles['container']}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles['options']}>
        <GroupSelectOption
          options={[
            { text: 'Verdadera', value: 'true' },
            { text: 'Falsa', value: 'false' },
          ]}
          onChange={() => {}}
        />
      </div>
    </div>
  );
}

export default QuizConditionalQuestion;

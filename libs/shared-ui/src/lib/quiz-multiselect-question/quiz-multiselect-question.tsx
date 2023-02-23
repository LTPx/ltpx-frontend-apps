import { Answer } from '@ltpx-frontend-apps/api';
import GroupSelectOption, { OptionSelectGroup } from '../group-select-option/group-select-option';
import Icon from '../icon/icon';
import styles from './quiz-multiselect-question.module.scss';

/* eslint-disable-next-line */
export interface QuizMultiselectQuestionProps {
  title: string;
  description?: string;
  answers: Answer[];
  multiple?: boolean;
}

export function QuizMultiselectQuestion(props: QuizMultiselectQuestionProps) {
  const { title, description, answers, multiple } = props;

  return (
    <div className={styles['container']}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles['answers']}>
        {multiple &&
          answers.map((answer, index) => (
            <div
              className={`${styles['answer']} ${
                answer.correct ? styles['check'] : ''
              }`}
              key={index}
            >
              <Icon
                icon={answer.correct ? 'checkbox' : 'un-checkbox'}
                size={20}
              />
              <h4>{answer.text}</h4>
            </div>
          ))}
        {!multiple &&
          <GroupSelectOption options={answers} onChange={()=>{}} />
        }
      </div>
    </div>
  );
}

export default QuizMultiselectQuestion;

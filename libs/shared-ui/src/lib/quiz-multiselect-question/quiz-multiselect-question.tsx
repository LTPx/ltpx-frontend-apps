import styles from './quiz-multiselect-question.module.scss';
import { Answer, UserAnswer } from '@ltpx-frontend-apps/api';
import GroupSelectOption from '../group-select-option/group-select-option';
import Icon from '../icon/icon';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface QuizMultiselectQuestionProps {
  title: string;
  description?: string;
  answers: Answer[];
  multiple?: boolean;
  onChange?: (answers: UserAnswer[]) => void;
}

export function QuizMultiselectQuestion(props: QuizMultiselectQuestionProps) {
  const { title, description, answers, multiple, onChange } = props;
  const answersForm = answers.map((answer) => {
    return {
      text: answer.text,
      selected: false,
      question_id: answer.question_id || 1,
      answer_id: answer.id || 1
    };
  });
  const [answersUi, setAnswersUi] = useState(answersForm);

  return (
    <div className={styles['container']}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles['answers']}>
        {multiple &&
          answersUi.map((answer, index) => (
            <div
              className={`${styles['answer']} ${
                answer.selected ? styles['check'] : ''
              }`}
              key={index}
              onClick={() => {
                const answers = answersUi.map((answerUi) => {
                  return {
                    ...answerUi,
                    ...{
                      selected:
                        answer.answer_id === answerUi.answer_id
                          ? !answerUi.selected
                          : answerUi.selected,
                    },
                  };
                });
                setAnswersUi(answers);
                onChange && onChange(answers.filter((answer) => answer.selected));
              }}
            >
              <Icon
                icon={answer.selected ? 'checkbox' : 'un-checkbox'}
                size={20}
              />
              <h4>{answer.text}</h4>
            </div>
          ))}
        {!multiple && (
          <GroupSelectOption
            options={answers}
            onChange={(answer) => {
              onChange &&
                onChange([
                  {
                    answer_id: answer.id,
                    question_id: answer.question_id,
                  },
                ]);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default QuizMultiselectQuestion;

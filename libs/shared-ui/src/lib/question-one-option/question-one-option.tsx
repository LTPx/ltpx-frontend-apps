import { useState } from 'react';
import Icon from '../icon/icon';
import Tag, { ColorsTag } from '../tag/tag';
import styles from './question-one-option.module.scss';

/* eslint-disable-next-line */
export interface OptionsQuestions {
  text: string;
}

export interface QuestionOneOptionProps {
  tag: string;
  question: string;
  options: Array<OptionsQuestions>;
}

export function QuestionOneOption(props: QuestionOneOptionProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { tag, question, options } = props;

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles['container']}>
      <Tag text={tag} color={ColorsTag.green}></Tag>
      <h3>{question}</h3>
      <div className={styles['options-content']}>
        {options.map((option, index) => (
          <div
            className={`${styles['options']} ${
              selectedIndex === index ? styles['selected'] : ''
            }`}
            onClick={() => {
              handleClick(index);
            }}
          >
            {selectedIndex === index ? (
              <Icon icon={'checkbox'} size={18} color={'#10b981'}></Icon>
            ) : (
              <Icon icon={'un-checkbox'} size={18}></Icon>
            )}
            <h4>{option.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionOneOption;

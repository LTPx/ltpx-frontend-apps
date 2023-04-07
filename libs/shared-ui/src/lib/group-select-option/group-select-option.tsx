import styles from './group-select-option.module.scss';
import { useState } from 'react';
import Icon from '../icon/icon';
/* eslint-disable-next-line */
export interface OptionSelectGroup {
  text: string;
  value?: string;
}

export interface GroupSelectOptionProps {
  options: OptionSelectGroup[];
  onChange: (option: any) => void;
  className?: string;
}

export function GroupSelectOption(props: GroupSelectOptionProps) {
  const { options, onChange, className } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    selectedIndex !== index && onChange(options[index]);
  };

  return (
    <div className={`${styles['container']} ${className}`}>
      <div className={styles['options-content']}>
        {options.map((option, index) => (
          <div
            className={styles['option']}
            onClick={() => {
              handleClick(index);
            }}
            key={index}
          >
            {selectedIndex === index ? (
              <Icon icon={'circle-filled'} color={'#10b981'}></Icon>
            ) : (
              <Icon icon={'circle-outline'}></Icon>
            )}
            <p>{option.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupSelectOption;

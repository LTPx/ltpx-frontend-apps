import styles from './group-select-option.module.scss';
import { useState } from 'react';
import Icon from '../icon/icon';

/* eslint-disable-next-line */
export interface OptionSelectGroup {
  text: string;
}

export interface GroupSelectOptionProps {
  options: OptionSelectGroup[];
  onChange: (option: OptionSelectGroup) => void;
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
            className={styles['options']}
            onClick={() => {
              handleClick(index);
            }}
            key={index}
          >
            {selectedIndex === index ? (
              <Icon icon={'circle-filled'} size={18} color={'#10b981'}></Icon>
            ) : (
              <Icon icon={'circle-outline'} size={18}></Icon>
            )}
            <h4>{option.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupSelectOption;

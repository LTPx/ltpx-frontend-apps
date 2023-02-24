import { useState } from 'react';
import SelectOptionCard, {
  SelectOptionCardProps,
} from '../select-option-card/select-option-card';
import styles from './group-select-option-card.module.scss';

/* eslint-disable-next-line */
export interface GroupSelectOptionCardProps {
  options: SelectOptionCardProps[];
  onChange: (value: string) => void;
  className?: string;
}

export function GroupSelectOptionCard(props: GroupSelectOptionCardProps) {
  const { options, onChange, className } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    selectedIndex !== index && onChange(options[index].value);
  };

  return (
    <div className={`${styles['container']} ${className}`}>
      {options.map((option, index) => (
        <SelectOptionCard
          key={index}
          title={option.title}
          text={option.text}
          icon={option.icon}
          selected={selectedIndex === index}
          value={option.value}
          onClick={() => {
            handleClick(index);
          }}
        />
      ))}
    </div>
  );
}

export default GroupSelectOptionCard;

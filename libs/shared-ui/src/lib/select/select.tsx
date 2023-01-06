import { useState } from 'react';
import styles from './select.module.scss';

export interface OptionSelect {
  value: string;
  text: string;
}

/* eslint-disable-next-line */
export interface SelectProps {
  options: Array<OptionSelect>;
  label?: string;
  onChange?: (selectedOption: OptionSelect) => void;
  selected?: OptionSelect;
  className?: string;
}

export function Select(props: SelectProps) {
  const { options, label, onChange, selected, className } = props;
  const initialSelectedOption = selected?.value || options[0].value;
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption)

  const handleChange = (e:any) => {
    const optionFound = options.find((option)=> option.value === e.target.value);
    const option = optionFound || options[0];
    setSelectedOption(option.value);
    onChange && onChange(option);
  }
  return (
    <div className={styles['container']}>
      { label && (
        <label className={styles['label']}>{label}</label>
      )}
      <select className={`${styles['style-select']} ${className}`}
        onChange={ (e: any) => { handleChange(e) }}
        value={selectedOption}
      >
        { options.map((option, index) => (
          <option key={index} value={option.value} >
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

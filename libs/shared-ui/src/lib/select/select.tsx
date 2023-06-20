import { useState } from 'react';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import styles from './select.module.scss';

export interface OptionSelect {
  value: string;
  text: string;
}

/* eslint-disable-next-line */
export interface SelectProps {
  options: Array<OptionSelect>;
  label?: string;
  disablePlaceholder?: boolean;
  onChange?: (selectedOption: OptionSelect) => void;
  selected?: string;
  className?: string;
  errorMessage?: string | null;
}

export function Select(props: SelectProps) {
  const {
    options,
    label,
    onChange,
    selected,
    className,
    errorMessage,
    disablePlaceholder,
  } = props;
  const initialSelectedOption = selected || '';
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const handleChange = (e: any) => {
    const optionFound = options.find(
      (option) => option.value === e.target.value
    );
    const option = optionFound || options[0];
    setSelectedOption(option.value);
    onChange && onChange(option);
  };
  return (
    <div className={styles['container']}>
      {label && <label className={styles['label']}>{label}</label>}
      <select
        className={`${styles['style-select']} ${className}`}
        onChange={(e: any) => {
          handleChange(e);
        }}
        value={selectedOption}
      >
        {!disablePlaceholder && (
          <option value="">-- Selecciona un valor --</option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {errorMessage && (
        <InputTextStatus status={StatusInputText.error} text={errorMessage} />
      )}
    </div>
  );
}

export default Select;

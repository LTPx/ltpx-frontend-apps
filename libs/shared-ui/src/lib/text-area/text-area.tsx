import InputTextStatus, { StatusInputText } from '../input-text-status/input-text-status';
import styles from './text-area.module.scss';

/* eslint-disable-next-line */
export interface TextAreaProps {
  type?: string;
  id?: string;
  name?: string;
  value?: any;
  label?: string;
  disabled?: boolean;
  className?: string;
  onEnter?: any;
  onChange?: any;
  onBlur?: any;
  rows?: number;
  cols?: number;
  description?: string;
  placeholder?: string;
  errorMessage?: string | null;
}

export function TextArea(props: TextAreaProps) {
  const {
    className,
    onEnter,
    onChange,
    label,
    description,
    placeholder,
    errorMessage,
    cols,
    ...other
  } = props;
  return (
    <div className={styles['container']}>
      {label && <label className={styles['label']}>{label}</label>}
      {description && <p className={styles['description']}>{description}</p>}
      <textarea
        className={styles['textarea-container']}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e)}
        cols={cols}
        {...other}
      />
      { errorMessage && (
        <InputTextStatus
          status={StatusInputText.error}
          text={errorMessage}
        />
      )}
    </div>
  );
}

export default TextArea;

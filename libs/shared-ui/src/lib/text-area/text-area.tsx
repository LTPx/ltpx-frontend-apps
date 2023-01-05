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
}

export function TextArea(props: TextAreaProps) {
  const { className, onEnter, onChange, label, description, placeholder, ...other } = props;
  return (
    <div className={styles['container']}>
      {label && (
        <label className={styles['label']}>{label}</label>
      )}
      { description && (
        <p className={styles['description']}>{description}</p>
      )}
      <textarea
        className={styles['textarea-container']}
        placeholder={placeholder}
        {...other}
        onChange={(e) => onChange && onChange(e)}
      />
    </div>
  );
}

export default TextArea;

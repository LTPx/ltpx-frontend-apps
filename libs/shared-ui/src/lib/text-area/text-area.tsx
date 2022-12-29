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
}

export function TextArea(props: TextAreaProps) {
  const { className, onEnter, onChange, label, ...other } = props;
  return (
    <div className={styles['container']}>
      <textarea
        className={styles['textarea-container']}
        {...other}
        onChange={(e) => onChange && onChange(e)}
      />
    </div>
  );
}

export default TextArea;

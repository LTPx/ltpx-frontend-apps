import styles from './select.module.scss';

export interface OptionSelect {
  value: string;
  text: string;
}

/* eslint-disable-next-line */
export interface SelectProps {
  options: Array<OptionSelect>;
  label?: string
}

export function Select(props: SelectProps) {
  const { options, label } = props;

  return (
    <div className={styles['container']}>
      { label && (
        <label className={styles['label']}>{label}</label>
      )}
      <select className={styles['style-select']} name="select">
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

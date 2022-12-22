import styles from './select.module.scss';

export interface OptionSelect {
  value: string;
  text: string;
}

/* eslint-disable-next-line */
export interface SelectProps {
  options: Array<OptionSelect>;
  label?: string;
  onChange?: (selectedOption?: OptionSelect) => void;
}

export function Select(props: SelectProps) {
  const { options, label, onChange } = props;

  const handleChange = (e:any) => {
    const option = options.find((option)=> option.value === e.target.value);
    onChange && onChange(option);
  }
  return (
    <div className={styles['container']}>
      { label && (
        <label className={styles['label']}>{label}</label>
      )}
      <select className={styles['style-select']} name="select" onChange={ (e: any) => { handleChange(e) }}>
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

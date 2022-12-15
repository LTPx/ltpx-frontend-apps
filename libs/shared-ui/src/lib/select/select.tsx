import styles from './select.module.scss';

export interface OptionSelect {
  value: string;
  text: string;
}

/* eslint-disable-next-line */
export interface SelectProps {
  options: Array<OptionSelect>
}

export function Select(props: SelectProps) {
  const { options } = props;
  
  // [{value: '1', text: 'Numero 1'}, {value: '2', text: 'Numero 2'}]
  return (
    <div className={styles['container']}>
      <select className={styles['style-select']} name="select">
        { options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

import styles from './select.module.scss';

/* eslint-disable-next-line */
export interface SelectProps {}

export function Select(props: SelectProps) {
  return (
    <div className={styles['container']}>
      <select className={styles['style-select']} name="select">
        <option value="value1">Value 1</option>
        <option value="value2" selected>Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>
  );
}

export default Select;

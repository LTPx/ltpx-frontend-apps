import Icon from '../icon/icon';
import styles from './input-search.module.scss';

/* eslint-disable-next-line */
export interface InputSearchProps {
  type?: string
  id?: string
  name?: string
  value?: any
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string,
  onEnter?: any,
  onChange?: any,
  onBlur?: any,
}

export function InputSearch(props: InputSearchProps) {

  const {
    className,
    onEnter,
    onChange,
    label,
    ...other
  } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['search-container']}>
        <input
          className={styles['input-container']} 
          {...other}
          onChange={e => onChange && onChange(e)}
        />
        <button><Icon icon='search' size={20}/></button>
      </div>
    </div>
  );
}

export default InputSearch;

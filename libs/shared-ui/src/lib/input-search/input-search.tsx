import Input, { Position } from '../input/input';
import styles from './input-search.module.scss';

/* eslint-disable-next-line */
export interface InputSearchProps {
  id?: string;
  name?: string;
  value?: any;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onEnter?: any;
  onChange?: any;
  onBlur?: any;
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
    <div className={styles['search-container']}>
      <Input
        addonInput={
          {
            icon: 'search',
            position: Position.right
          }
        }
        className={styles['input-lenin']}
        {...other}
        onChange={(e: any) => onChange && onChange(e)}
      />
    </div>
  );
}

export default InputSearch;

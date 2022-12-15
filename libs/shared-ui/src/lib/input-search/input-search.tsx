import Icon from '../icon/icon';
import styles from './input-search.module.scss';

/* eslint-disable-next-line */
export interface InputSearchProps {}

export function InputSearch(props: InputSearchProps) {
  return (
    <div className={styles['container']}>
        <div className={styles['search-container']}>
          <input type="text" placeholder="Search.." name="search"></input>
          <button><Icon icon='search' size={14}/></button>
        </div>
      </div>
  );
}

export default InputSearch;

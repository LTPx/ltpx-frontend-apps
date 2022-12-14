import styles from './classes.module.scss';

/* eslint-disable-next-line */
export interface ClassesProps {}

export function Classes(props: ClassesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Classes!</h1>
    </div>
  );
}

export default Classes;

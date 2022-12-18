import styles from './user-classes.module.scss';

/* eslint-disable-next-line */
export interface UserClassesProps {}

export function UserClasses(props: UserClassesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UserClasses!</h1>
    </div>
  );
}

export default UserClasses;

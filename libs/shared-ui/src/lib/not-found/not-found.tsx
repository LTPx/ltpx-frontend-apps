import styles from './not-found.module.scss';
import illustration from './../../assets/images/astronaut.svg';

/* eslint-disable-next-line */
export interface NotFoundProps {}

export function NotFound(props: NotFoundProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['head']}>
        <h1>Oops!</h1>
        <h3>You are lost</h3>
      </div>
      <div className={styles['content']}>
        <img src={illustration} alt="404" />
      </div>
    </div>
  );
}

export default NotFound;

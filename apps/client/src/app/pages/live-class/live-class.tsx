import styles from './live-class.module.scss';

/* eslint-disable-next-line */
export interface LiveClassProps {}

export function LiveClass(props: LiveClassProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LiveClass!</h1>
    </div>
  );
}

export default LiveClass;

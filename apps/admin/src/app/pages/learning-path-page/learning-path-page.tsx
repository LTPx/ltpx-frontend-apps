import styles from './learning-path-page.module.scss';

/* eslint-disable-next-line */
export interface LearningPathPageProps {}

export function LearningPathPage(props: LearningPathPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LearningPathPage!</h1>
    </div>
  );
}

export default LearningPathPage;

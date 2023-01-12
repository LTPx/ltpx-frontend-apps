import styles from './teacher-quizzes-page.module.scss';

/* eslint-disable-next-line */
export interface TeacherQuizzesPageProps {}

export function TeacherQuizzesPage(props: TeacherQuizzesPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TeacherQuizzesPage!</h1>
    </div>
  );
}

export default TeacherQuizzesPage;

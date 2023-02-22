import styles from './student-quiz.module.scss';

/* eslint-disable-next-line */
export interface StudentQuizProps {}

export function StudentQuiz(props: StudentQuizProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudentQuiz!</h1>
    </div>
  );
}

export default StudentQuiz;

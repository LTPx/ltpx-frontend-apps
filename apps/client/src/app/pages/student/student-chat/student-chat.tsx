import styles from './student-chat.module.scss';

/* eslint-disable-next-line */
export interface StudentChatProps {}

export function StudentChat(props: StudentChatProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudentChat!</h1>
    </div>
  );
}

export default StudentChat;

import Chat from '../../components/chat/chat';
import styles from './student-chat.module.scss';

/* eslint-disable-next-line */
export interface StudentChatProps {}

export function StudentChat(props: StudentChatProps) {
  return (
    <div className={styles['container']}>
      <h1>Chat</h1>
      <Chat></Chat>
    </div>
  );
}

export default StudentChat;

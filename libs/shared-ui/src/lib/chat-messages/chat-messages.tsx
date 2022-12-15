import Avatar from '../avatar/avatar';
import Input from '../input/input';
import styles from './chat-messages.module.scss';

/* eslint-disable-next-line */
export interface ChatMessagesProps {}

export function ChatMessages(props: ChatMessagesProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['chat']}>
        <div className={`${styles['user']} ${styles['user-chat']}`}>
          <Avatar image='https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' />
          <div className={styles['text']}>
            <h5>Michelle Wood</h5>
            <p>Hi!</p>
          </div>
        </div>
        <div className={`${styles['user']} ${styles['student']}`}>
          <div className={styles['text']}>
            <h5>Alison Wright</h5>
            <p>Hi Michelle</p>
          </div>
          <Avatar image='https://images.unsplash.com/photo-1669563306078-4c107b67d125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80' />
        </div>
        <div className={`${styles['user']} ${styles['user-chat']}`}>
          <Avatar image='https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' />
          <div className={styles['text']}>
            <h5>Michelle Wood</h5>
            <p>can you hear me?</p>
          </div>
        </div>
        <div className={`${styles['user']} ${styles['student']}`}>
          <div className={styles['text']}>
            <h5>Alison Wright</h5>
            <p>No, could be your connection</p>
          </div>
          <Avatar image='https://images.unsplash.com/photo-1669563306078-4c107b67d125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80' />
        </div>
      </div>
      <div className="text-input">
        <Input placeholder='Send message'/>
      </div>
    </div>
  );
}

export default ChatMessages;

import { getCurrentChatUser } from '@ltpx-frontend-apps/api';
import { useRef, useState } from 'react';
import Avatar from '../avatar/avatar';
import Input, { Position } from '../input/input';
import styles from './chat-messages.module.scss';

export interface ChatMessage {
  userId: string;
  image: string;
  name: string;
  message: string;
  date?: Date;
}

/* eslint-disable-next-line */
export interface ChatMessagesProps {
  messages: Array<ChatMessage>;
  userId: string;
}

export function ChatMessages(props: ChatMessagesProps) {
  const { messages, userId } = props;
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [msgs, setMsgs] = useState(messages);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      const { target: { value } } = event;
      const user = getCurrentChatUser();
      const message = Object.assign(user, {message: value});
      setMsgs([...msgs, message]);
      if(mainRef.current) {
        window.scrollTo(0, mainRef.current.scrollTop);
      }
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['chat']} ref={mainRef}>
        { msgs.map((message, index)=>(
          <div key={index} className={`${styles['user']} ${ message.userId === userId ? styles['student'] : ''}`}>
            { message.userId !== userId && (
              <Avatar image={message.image} />
            )}
            <div className={styles['text']}>
              <h5>{message.name}</h5>
              <p>{message.message}</p>
            </div>
            { message.userId === userId && (
              <Avatar image={message.image} />
            )}
          </div>
        ))}
      </div>
      <div className={styles['text-input']}>
        <Input
          placeholder='Send message'
          addonInput={{icon: 'chat-dots', position: Position.right}}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default ChatMessages;

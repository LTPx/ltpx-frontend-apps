import { ChatMessage, getCurrentChatUser } from '@ltpx-frontend-apps/api';
import { Avatar } from 'evergreen-ui';
import { useRef, useState } from 'react';
import Input, { Position } from '../input/input';
import styles from './chat-messages.module.scss';

/* eslint-disable-next-line */
export interface ChatMessagesProps {
  messages: Array<ChatMessage>;
  senderId: number;
  onSubmit: (message: ChatMessage) => void;
}

export function ChatMessages(props: ChatMessagesProps) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const { messages, senderId, onSubmit} = props;
  const [ msgs, setMsgs] = useState(messages);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      const { target: { value } } = event;
      const newMessage = {
        text: value,
        user_id: senderId,
        user_name: 'Yp',
        created_at: '',
      };
      setMsgs([...msgs, newMessage]);
      onSubmit(newMessage);
      // if(mainRef.current) {
      //   window.scrollTo(0, mainRef.current.scrollTop);
      // }
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['chat']} ref={mainRef}>
        { msgs.length > 0 ? msgs.map((message, index)=>(
          <div key={index} className={`${styles['user']} ${ message.user_id === senderId ? styles['student'] : ''}`}>
            { message.user_id !== senderId && (
              <Avatar name={message.user_name}/>
            )}
            <div className={styles['text']}>
              <h5>{message.user_name}</h5>
              <p>{message.text}</p>
            </div>
            { message.user_id === senderId && (
              <Avatar name={message.user_name}/>
            )}
          </div>
        )) : (
          <h3>No hay mensajes</h3>
        )}
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

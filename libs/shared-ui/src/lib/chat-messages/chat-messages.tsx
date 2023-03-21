import { ChatMessage, Room } from '@ltpx-frontend-apps/api';
import { Avatar } from 'evergreen-ui';
import { useEffect, useRef, useState } from 'react';
import { useMoment } from '../../hooks/useMoment';
import Input, { Position } from '../input/input';
import styles from './chat-messages.module.scss';

export interface ChatMessagesProps {
  room: Room;
  senderId: number;
  onSubmit: (message: ChatMessage) => void;
}

export function ChatMessages(props: ChatMessagesProps) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const { senderId, onSubmit, room } = props;
  // const [ msgs, setMsgs] = useState(messages);
  const { fromNow, dateNow } = useMoment();

  useEffect(() => {
    scrollDown()
  }, [room.messages]);

  function scrollDown() {
    const height = mainRef.current?.scrollHeight || 100;
    // mainRef.current?.scrollIntoView({behavior: 'smooth'});
    mainRef.current?.scrollTo(0, height);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const { currentTarget: { value } } = event;
      const newMessage = {
        text: value,
        user_id: senderId,
        user_name: 'Yp',
        created_at: dateNow.toString(),
      };
      // const mensajes = msgs.concat([newMessage]);
      // setMsgs(mensajes);
      onSubmit(newMessage);
      event.currentTarget.value = '';
      scrollDown();
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <Avatar name={room.name} size={40}/>
        {room.name}
      </div>
      <div className={styles['chat']} ref={mainRef}>
        { room.messages.length > 0 ? room.messages.map((message, index)=>(
          <div key={index} className={`${styles['user']} ${ message.user_id === senderId ? styles['current-user'] : ''}`}>
            <div className={`${styles.text} ${message.user_id === senderId ?  styles['current-user'] : ''}`}>
              {message.user_id !== senderId && <h5>{message.user_name}</h5>}
              <p>{message.text}</p>
            </div>
            <h5 className={styles.date}>{fromNow(message.created_at)}</h5>
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

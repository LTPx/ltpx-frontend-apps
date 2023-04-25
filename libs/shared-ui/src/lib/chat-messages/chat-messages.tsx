import { ChatMessage, Room } from '@ltpx-frontend-apps/api';
import { Avatar } from 'evergreen-ui';
import { useEffect, useRef } from 'react';
import { useMoment } from '../../hooks/useMoment';
import Input, { Position } from '../input/input';
import styles from './chat-messages.module.scss';
import EmptyState from '../empty-state/empty-state';

export interface ChatMessagesProps {
  room: Room;
  senderId: number;
  onSubmit: (message: ChatMessage) => void;
}

export function ChatMessages(props: ChatMessagesProps) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const { senderId, onSubmit, room } = props;
  const { fromNow, dateNow } = useMoment();

  useEffect(() => {
    scrollDown();
  }, [room.messages]);

  function scrollDown() {
    const height = mainRef.current?.scrollHeight || 100;
    // mainRef.current?.scrollIntoView({behavior: 'smooth'});
    mainRef.current?.scrollTo(0, height);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
      key,
    } = event;
    if (key === 'Enter' && value.length) {
      const newMessage = {
        text: value,
        user_id: senderId,
        user_name: 'Yp',
        created_at: dateNow.toString(),
      };
      onSubmit(newMessage);
      event.currentTarget.value = '';
      scrollDown();
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <Avatar name={room.user_name} size={40} />
        {room.user_name}
      </div>
      <div className={styles['wrap-chat']}>
        <div className={styles['chat']} ref={mainRef}>
          {room.messages.length > 0 ? (
            room.messages.map((message, index) => (
              <div
                key={index}
                className={`${styles['user']} ${
                  message.user_id === senderId ? styles['current-user'] : ''
                }`}
              >
                <div
                  className={`${styles.text} ${
                    message.user_id === senderId ? styles['current-user'] : ''
                  }`}
                >
                  {message.user_id !== senderId && <h5>{message.user_name}</h5>}
                  <p>{message.text}</p>
                </div>
                <h5 className={styles.date}>{fromNow(message.created_at)}</h5>
              </div>
            ))
          ) : (
            <div className={styles['empty-chat']}>
              <EmptyState
                classNameImage={`${styles['image-empty']}`}
                className={`${styles['image-content']}`}
                img="../../../../assets/images/empty-states/no-messages.svg"
                title="Comencemos a chatear"
                description={'No tienes mensajes previos con esta persona'}
              />
            </div>
          )}
        </div>
        <div className={styles['text-input']}>
          <Input
            placeholder="Enviar mensaje"
            addonInput={{ icon: 'chat-dots', position: Position.right }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatMessages;

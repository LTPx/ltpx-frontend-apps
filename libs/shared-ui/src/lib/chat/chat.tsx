import styles from './chat.module.scss';
import { ChatMessages, EmptyState, Icon } from '@ltpx-frontend-apps/shared-ui';
import { useChat, useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { ReactElement } from 'react';
import { useChatData } from './useChatData';

/* eslint-disable-next-line */
export interface ChatProps {
  children?: ReactElement;
  onCancel?: () => void;
}

export function Chat(props: ChatProps) {
  const { children, onCancel } = props;
  const { rooms, room, _getRoom, _sendMessageRoom } = useChat();
  const { user } = useUser();
  useChatData();

  return (
    <div className={styles['container']}>
      <div className={styles.actions}>
        <Icon icon="close" size={20} onClick={onCancel} />
      </div>
      <div className={styles['content']}>
        <div className={styles['rooms-container']}>
          <div className={styles['header']}>
            <h3>Chat</h3>
            {children}
          </div>
          {rooms && (
            <div className={styles['rooms']}>
              {rooms.map((roomData, index) => (
                <div
                  className={`${styles['room-row']} ${
                    room.id == roomData.id ? styles['selected'] : ''
                  }`}
                  key={index}
                  onClick={() => {
                    if (room.id !== roomData.id) {
                      _getRoom(roomData.id);
                    }
                  }}
                >
                  <Avatar name={roomData.user_name} size={30} />
                  {roomData.user_name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles['chat-body']}>
          <div className={styles['messages']}>
            {room.messages ? (
              <ChatMessages
                room={room}
                senderId={user.id}
                onSubmit={(message) => {
                  const newMessage = {
                    text: message.text,
                    user_id: user.id,
                    room_id: room.id,
                  };
                  _sendMessageRoom(newMessage);
                }}
              />
            ) : (
              <EmptyState
                classNameImage={`${styles['image-empty']}`}
                className={`${styles['image-content']}`}
                img="../../../../assets/images/empty-states/no-messages.svg"
                description={
                  'Comunícate por medio de mensajes con tus contactos agregados en Openmind '
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

import { ChatMessages } from '@ltpx-frontend-apps/shared-ui';
import { useChat, useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { ReactElement } from 'react';
import styles from './chat.module.scss';
import { useChatData } from './useChatData';

export interface ChatProps {
  initRoomId?: number;
  initUserId?: number;
  children?: ReactElement;
}

export function Chat(props: ChatProps) {
  const { initRoomId, initUserId, children } = props;
  const { senderId } = useChatData();
  const {
    rooms,
    room,
    _getRoom,
    _sendMessageRoom,
  } = useChat();
  const { user } = useUser();

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['rooms-container']}>
          <div className={styles['header']}>
            <h3>Chat {rooms.length}</h3>
            {children}
          </div>
          <div className={styles['rooms']}>
            {rooms.map((roomData, index) => (
              <div
                className={`${styles['room-row']} ${room.id == roomData.id ? styles['selected'] : ''}`}
                key={index}
                onClick={() => {
                  if (room.id !== roomData.id) {
                    _getRoom(roomData.id)
                  }
                }}
              >
                <Avatar name={roomData.name} size={30} />
                {roomData.name}
              </div>
            ))}
          </div>
        </div>
        <div className={styles['chat-body']}>
          <div className="messages">
            { room.messages &&
              <ChatMessages
                room={room}
                senderId={senderId}
                onSubmit={(message) => {
                  const newMessage = {
                    text: message.text,
                    user_id: user.id,
                    room_id: room.id,
                  }
                  _sendMessageRoom(newMessage)
                }}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

import { ChatMessages } from '@ltpx-frontend-apps/shared-ui';
import { Avatar } from 'evergreen-ui';
import styles from './chat.module.scss';
import { useChat } from './useChat';

/* eslint-disable-next-line */
export interface ChatProps {
  initRoomId?: number;
  initUserId?: number;
}

export function Chat(props: ChatProps) {
  const { initRoomId, initUserId } = props;
  const { rooms, messages, senderId, fetchMessages, sendMessage, loadingMessages } = useChat();
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['all-students']}>
          <div className={styles['all-students-header']}>
            <h3>Usuarios</h3>
          </div>
          <div className={styles['rooms']}>
            {rooms.map((room, index) => (
              <div
                className={styles['room-row']}
                key={index}
                onClick={() => {
                  fetchMessages(room.id);
                }}
              >
                <Avatar name={room.name} size={30} />
                {room.name}
              </div>
            ))}
          </div>
        </div>
        <div className={styles['chat-body']}>
          <div className={styles['chat-body-header']}>
            <h3>Chat</h3>
            <p>Se respetuoso con todos</p>ess
          </div>
          <div className="messages">
            {!loadingMessages &&
              <ChatMessages
                messages={messages}
                senderId={senderId}
                onSubmit={(message) => {
                  sendMessage(message);
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

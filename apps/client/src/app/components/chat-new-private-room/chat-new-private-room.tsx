import { UserModel } from '@ltpx-frontend-apps/api';
import { useChat, useUtil } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import styles from './chat-new-private-room.module.scss';

/* eslint-disable-next-line */
export interface ChatNewPrivateRoomProps {
  users: UserModel[];
  onClose: () => void;
}

export function ChatNewPrivateRoom(props: ChatNewPrivateRoomProps) {
  const { users, onClose } = props;
  const { _newChatRoom } = useChat();
  const { setMessageToast } = useUtil();

  async function createNewPrivateRoom(userId: number) {
    const { error, success } = await _newChatRoom(userId);
    if (success) {
      onClose();
    } else {
      onClose();
      setMessageToast('error', error)
    }
  }

  return (
    <Dialog
      isShown={true}
      title="Selecciona un usuario"
      hasFooter={false}
      onCloseComplete={onClose}
    >
      <div className={styles['users-list']}>
        {users.map((user, index) => (
          <div
            className={styles.user}
            key={index}
            onClick={() => {
              createNewPrivateRoom(user.id);
            }}
          >
            {user.fullname}
          </div>
        ))}
      </div>
    </Dialog>
  );
}

export default ChatNewPrivateRoom;

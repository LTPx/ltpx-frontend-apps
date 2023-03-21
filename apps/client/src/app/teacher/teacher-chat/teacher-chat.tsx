import styles from './teacher-chat.module.scss';
import Chat from '../../components/chat/chat';
import { Icon } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import { Dialog } from 'evergreen-ui';
import {
  getChatStudents,
  UserModel,
} from '@ltpx-frontend-apps/api';
import { useChat } from '@ltpx-frontend-apps/store';

export function TeacherChat() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<UserModel[]>([]);
  const { _newChatRoom, setRoomById, rooms } = useChat();

  async function handleNewChat() {
    try {
      const data = await getChatStudents();
      setUsers(data);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function createNewPrivateRoom(userId: number) {
    const { data, error, success } = await _newChatRoom(userId);
    if (success) {
      setRoomById(data.id);
      setOpen(false);
    } else {
      console.log(error);
    }
  }

  return (
    <>
      <Chat>
        <Icon icon="plus-circle" size={20} onClick={handleNewChat} />
      </Chat>
      <Dialog
        isShown={open}
        title="Selecciona el estudiante"
        onCloseComplete={() => setOpen(false)}
        hasFooter={false}
      >
        <div className={styles['students-list']}>
          {users.map((user, index) => (
            <div
              className={styles.student}
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
    </>
  );
}

export default TeacherChat;

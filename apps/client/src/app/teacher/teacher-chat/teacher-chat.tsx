import styles from './teacher-chat.module.scss';
import Chat from '../../components/chat/chat';
import { Icon } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import { Dialog } from 'evergreen-ui';
import { createNewRoom, getChatStudents, UserModel } from '@ltpx-frontend-apps/api';
import { useChat } from '@ltpx-frontend-apps/store';
// import { useChat } from '../../components/chat/useChat';

export function TeacherChat() {
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState<UserModel[]>([]);
  // const { rooms, createRoom, setRooms } = useChat();
  const {
    rooms,
    room,
    messages,
    _newChatRoom,
    _getRooms,
    _getRoom,
  } = useChat();

  async function handleNewChat() {
    try {
      const data = await getChatStudents();
      setUsers(data);
      setOpen(true)
    } catch (error) {
      console.log(error);
    }
  }

  async function createNewPrivateRoom(userId: number) {
    try {
      const newRoom = await _newChatRoom(userId);
      // setRooms([...rooms, ...[newRoom]])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Chat>
        <Icon icon='plus-circle' size={20} onClick={handleNewChat}/>
      </Chat>
      <div>{rooms.length}</div>
      <Dialog
        isShown={open}
        title='Selecciona el estudiante'
        onCloseComplete={() => setOpen(false)}
        hasFooter={false}
      >
        <div className="">
          { users.map((user, index)=> (
            <div className="" key={index} onClick={()=>{
              createNewPrivateRoom(user.id)
            }}>
              {user.fullname}
            </div>
          ))}
        </div>

      </Dialog>
    </>
  );
}

export default TeacherChat;

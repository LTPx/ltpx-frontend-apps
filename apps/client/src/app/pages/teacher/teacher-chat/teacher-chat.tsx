import styles from './teacher-chat.module.scss';
import { ChatMessage, Room, UserBasic } from '@ltpx-frontend-apps/api';
import { ChatMessages, Tab, Tabs } from '@ltpx-frontend-apps/shared-ui';
import { useTeacher, useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';

export function TeacherChat() {
  const { _getTeacherRooms, _getTeacherRoom, _sendMessage } = useTeacher();
  const { user } = useUser();
  const [loaded, setLoaded] = useState(false);
  const [optionsTab, setOptionsTab] = useState<Tab[]>([]);
  const [users, setUsers] = useState<UserBasic[]>([]);
  const [room, setRoom] = useState<Room>();

  const fetchRooms = useCallback(async () => {
    const { success, data, error } = await _getTeacherRooms();
    if (success) {
      const users = data;
      const options = users.map((user: UserBasic) => {
        return {
          text: user.fullname,
          children: <TabStudent name={user.fullname} />,
        };
      });
      setUsers(users);
      setOptionsTab(options);
      setLoaded(true);
    } else {
      setLoaded(true);
      console.log(error);
    }
  }, []);

  const fetchRoom = async (id: number) => {
    setRoom(undefined);
    const { success, data, error } = await _getTeacherRoom(id);
    if (success) {
      const room = data as Room;
      setRoom(room);
      console.log('data: ', data);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  async function handleSendMessage(message: ChatMessage) {
    if (room) {
      const newMessage = {
        text: message.text,
        user_id: user.id,
        room_id: room.id,
      };
      const { success, data, error } = await _sendMessage(newMessage);
      if (success) {
        console.log('data: ', data);
      } else {
        console.log('error: ', error);
      }
    }
  }

  const TabStudent = ({ name }: { name: string }) => (
    <div className={styles['tab-options']}>
      <Avatar name={name} size={30} />
      {name}
    </div>
  );

  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>Chat</h2>
      <div className={styles['content']}>
        <div className={styles['all-students']}>
          <div className={styles['all-students-header']}>
            <h3>Usuarios</h3>
            <h3>{loaded ? users.length : 0}</h3>
          </div>
          {loaded && (
            <Tabs
              className={styles['tabs']}
              tabs={optionsTab}
              vertical={true}
              onClickTab={(index) => {
                fetchRoom(users[index].id);
              }}
            />
          )}
        </div>
        <div className={styles['information']}>
          <div className={styles['live-chat-content']}>
            <h3>Chat Group</h3>
            <label className="muted">Por favor se respetuoso</label>
            {room ? (
              <ChatMessages
                messages={room.messages}
                senderId={user.id}
                onSubmit={handleSendMessage}
              />
            ) : (
              <h4> selecciona un usuario</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherChat;

import styles from './teacher-chat.module.scss';
import { UserBasic } from '@ltpx-frontend-apps/api';
import { Tab, Tabs } from '@ltpx-frontend-apps/shared-ui';
import { useTeacher } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import TeacherViewStudent from '../teacher-view-student/teacher-view-student';

/* eslint-disable-next-line */
export interface TeacherChatProps {}

export function TeacherChat(props: TeacherChatProps) {
  const { _getTeacherRooms } = useTeacher();
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState<number>();
  const [optionsTab, setOptionsTab] = useState<Tab[]>([]);
  const [users, setUsers] = useState<UserBasic[]>([]);

  const fetchStudents = useCallback(async () => {
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

  useEffect(() => {
    fetchStudents();
  }, []);

  const TabStudent = ({ name }: { name: string; }) => (
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
            <h3>{ loaded ? users.length : 0}</h3>
          </div>
          {loaded && (
            <Tabs
              className={styles['tabs']}
              tabs={optionsTab}
              vertical={true}
              onClickTab={(index) => {
                setUserId(users[index].id);
              }}
            />
          )}
        </div>
        <div className={styles['information']}>
          {userId && <TeacherViewStudent studentId={userId} />}
        </div>
      </div>
    </div>
  );
}

export default TeacherChat;

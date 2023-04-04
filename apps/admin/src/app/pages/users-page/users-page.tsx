import { StatusAccount, TypeAccounts, UserModel } from '@ltpx-frontend-apps/api';
import { useAdmin, useChat } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import styles from './users-page.module.scss';
import { Button, ColorsButton } from '@ltpx-frontend-apps/shared-ui';

/* eslint-disable-next-line */
export interface UsersTable {
  image: string;
  name: string;
  email: string;
  typeAccount: TypeAccounts;
  status: StatusAccount;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UsersPageProps {}

export function UsersPage(props: UsersPageProps) {
  const [ users, setUsers] = useState<UserModel[]>([]);
  const { _getUsers } = useAdmin();
  const {
    _newChatRoom,
    setShowChat,
  } = useChat();
  
  const fetchUsers = useCallback(async () => {
    const { success, data, error } = await _getUsers();
    if ( success) {
      setUsers(data);
    } else {
      console.log('error: ', error);
    }
    console.log('resp....: ', data);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const chatWithUser = async (id: number) => {
    await _newChatRoom(id)
    setShowChat(true);
  };

  return (
    <div className={styles['container']}>
      <h1>Usuarios registrados ({users.length})</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tipo de Cuenta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className={styles['user-name']}>
                <Avatar name={user.fullname} size={40}></Avatar>
                {user.fullname}
              </td>
              <td>{user.email}</td>
              <td>{user.initial_register}</td>
              <td className={styles['actions']}>
              <Button
                onClick={() =>chatWithUser(user.id)}
                icon="chat"
                color={ColorsButton.secondary}
                outline={true}
                title=""
              />
              <Button
                icon="eye"
                color={ColorsButton.secondary}
                title="Ver perfil"
                outline={true}
              />
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;

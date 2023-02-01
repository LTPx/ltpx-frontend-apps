import { StatusAccount, TypeAccounts, UserModel } from '@ltpx-frontend-apps/api';
import { useAdmin } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import styles from './users-page.module.scss';

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

  const fetchUsers = useCallback(async () => {
    const { data } = await _getUsers();
    setUsers(data);
    console.log('resp....: ', data);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className={styles['container']}>
      <h1>Usuarios registrados</h1>
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
              <td>Ver perfil</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;

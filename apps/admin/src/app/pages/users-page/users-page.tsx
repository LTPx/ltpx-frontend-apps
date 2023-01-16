import { StatusAccount, TypeAccounts } from '@ltpx-frontend-apps/api';
import { Avatar, AvatarSize } from '@ltpx-frontend-apps/shared-ui';
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
  const users: UsersTable[] = [
    {
      image:
        'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      name: 'Kristian Watson',
      typeAccount: TypeAccounts.student,
      status: StatusAccount.active,
      email: 'example@gmail.com',
    },
    {
      image:
        'https://images.unsplash.com/photo-1642792743923-3fc2adcd1b84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      name: 'Jhonatan Doe',
      typeAccount: TypeAccounts.teacher,
      status: StatusAccount.blocked,
      email: 'example@gmail.com',
    },
    {
      image:
        'https://images.unsplash.com/flagged/photo-1574110906643-8311b0ce29d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      name: 'Jacob Jones',
      typeAccount: TypeAccounts.admin,
      status: StatusAccount.removed,
      email: 'example@gmail.com',
    },
    {
      image:
        'https://images.unsplash.com/photo-1602133187081-4874fdbd555c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      name: 'Teresa Web',
      typeAccount: TypeAccounts.user,
      status: StatusAccount.active,
      email: 'example@gmail.com',
    },
  ];

  return (
    <div className={styles['container']}>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tipo de Cuenta</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className={styles['user-name']}>
                <Avatar image={user.image} size={AvatarSize.small}></Avatar>
                {user.name}
              </td>
              <td>{user.email}</td>
              <td>{user.typeAccount}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;

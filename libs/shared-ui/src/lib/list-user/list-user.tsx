import Avatar, { AvatarSize } from '../avatar/avatar';
import styles from './list-user.module.scss';

/* eslint-disable-next-line */
export interface User {
  name: string;
  image: string;
}

export interface ListUserProps {
  users: Array<User>;
}

export function ListUser(props: ListUserProps) {
  const { users } = props;
  return (
    <div className={styles['container']}>
      <h3>Online users</h3>
      <h4>2 online user (last 12 minutes)</h4>
      {users.map((user, index) => (
        <div className={styles['user']} key={index}>
          <Avatar image={user.image} size={AvatarSize.medium}/>
          <h4>{user.name}</h4>
        </div>
      ))}
    </div>
  );
}

export default ListUser;

import Avatar, { AvatarSize } from '../avatar/avatar';
import styles from './list-user.module.scss';

/* eslint-disable-next-line */
export interface ListUserProps {}

export function ListUser(props: ListUserProps) {
  return (
    <div className={styles['container']}>
      <h3>Online users</h3>
      <h4>2 online user (last 12 minutes)</h4>
      <div className={styles['user']}>
        <Avatar
          image={
            'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVhY2hlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
          }
          size={AvatarSize.medium}
        />
        <h4>Daniel</h4>
      </div>
    </div>
  );
}

export default ListUser;

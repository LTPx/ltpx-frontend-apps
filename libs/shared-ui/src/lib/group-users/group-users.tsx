import Avatar, { AvatarSize } from '../avatar/avatar';
import styles from './group-users.module.scss';

/* eslint-disable-next-line */
export interface Images {
  image: string;
}

export interface GroupUsersProps {
  images: Array<Images>;
}

export function GroupUsers(props: GroupUsersProps) {
  const { images } = props;
  const avatars = images.slice(0, 3);
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        {avatars.map((image, index) => (
          <div
            className={styles['images']}
            key={index}
            style={{ zIndex: index, left: `${2 * (index + 1)}rem` }}
          >
            <Avatar image={image.image} size={AvatarSize.medium}></Avatar>
          </div>
        ))}
        {images.length > 3 && (
          <div
            className={`${styles['images']} ${styles['count']}`}
            style={{ zIndex: 4, left: `8rem` }}
          >
            <h2>+ {images.length - 3}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupUsers;

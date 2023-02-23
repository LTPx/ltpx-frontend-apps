import Avatar, { AvatarSize } from '../avatar/avatar';
import Icon from '../icon/icon';
import Rating from '../rating/rating';
import styles from './profile-user.module.scss';

/* eslint-disable-next-line */
export interface ProfileUserProps {
  name: string;
  profession?: string;
  rating?: number;
  biography: string;
}

export function ProfileUser(props: ProfileUserProps) {
  const {
    name,
    profession,
    biography,
  } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['profile-content']}>
        <h2>Profile</h2>
        <div className={styles['profile']}>
          <Avatar
            image={
              'https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fHRlYWNoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
            }
            size={AvatarSize.large}
          />
          <div className={styles['information']}>
            <h3>{name}</h3>
            <h4>{profession}</h4>
          </div>
        </div>
        <div className={styles['description-profile']}>
          <p>{biography}</p>
        </div>
        <div className={styles['social-networks']}>
          <Icon
            className={styles['social']}
            icon="link"
            size={35}
            color="#949DA6"
          />
          <Icon
            className={styles['social']}
            icon="home"
            size={35}
            color="#949DA6"
          />
          <Icon
            className={styles['social']}
            icon="heart"
            size={35}
            color="#949DA6"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;

import { NavLink } from 'react-router-dom';
import Avatar, { AvatarSize } from '../avatar/avatar';
import Icon from '../icon/icon';
import styles from './user-menu.module.scss';

/* eslint-disable-next-line */
export interface LinkOption {
  icon: string;
  text: string;
  url: string;
}

export interface UserMenuProps {
  links: Array<LinkOption>;
  image: string;
  name: string;
  email: string;
}

export function UserMenu(props: UserMenuProps) {
  const { links, image, name, email } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>
        <Avatar image={image} size={AvatarSize.medium}></Avatar>
        <div className={styles['user']}>
          <h4>{name}</h4>
          <h5>{email}</h5>
        </div>
      </div>
      {links.map((link, index) => (
        <div className={styles['content']} key={index}>
          <Icon icon={link.icon} size={16}></Icon>
          <NavLink to={link.url}>
            <h4>{link.text}</h4>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default UserMenu;

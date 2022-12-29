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
}

export function UserMenu(props: UserMenuProps) {
  const { links, image } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>
        <Avatar image={image} size={AvatarSize.medium}></Avatar>
        <div className={styles['user']}>
          <h4>Ali Tufan</h4>
          <h5>ali@skola.com</h5>
        </div>
      </div>
      {links.map((link, index) => (
        <div className={styles['content']}>
          <Icon icon={link.icon} size={16}></Icon>
          <NavLink key={index} to={link.url}>
            <h4>{link.text}</h4>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default UserMenu;

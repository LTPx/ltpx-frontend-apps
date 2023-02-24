import { NavLink } from 'react-router-dom';
import Avatar, { AvatarSize } from '../avatar/avatar';
import Icon from '../icon/icon';
import styles from './user-menu.module.scss';

/* eslint-disable-next-line */
export interface LinkOption {
  icon: string;
  text: string;
  url?: string;
  onClick?: () => void;
}

export interface UserMenuProps {
  links: Array<LinkOption>;
  image?: string;
  name?: string;
  email?: string;
}

export function UserMenu(props: UserMenuProps) {
  const { links, image, name, email } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>
        {image && <Avatar image={image} size={AvatarSize.medium}></Avatar>}
        <div className={styles['user']}>
          <h4>{name}</h4>
          <h5>{email}</h5>
        </div>
      </div>
      <div className={styles['links']}>
        {links.map((link, index) => (
          <div
            className={styles['link']}
            key={index}
            onClick={() => {
              link.onClick && link.onClick();
            }}
          >
            <Icon icon={link.icon} size={16}></Icon>
            {link.url ? (
              <NavLink to={link.url}>
                <h4>{link.text}</h4>
              </NavLink>
            ) : (
              <h4>{link.text}</h4>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserMenu;

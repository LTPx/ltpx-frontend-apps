import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import styles from './menu.module.scss';

/* eslint-disable-next-line */
export interface MenuItem {
  text: string;
  icon?: string;
  url?: string;
  onClick?: () => void;
}

export interface MenuProps {
  items: MenuItem[];
}

export function Menu(props: MenuProps) {
  const { items } = props;

  return (
    <div className={styles['container']}>
      {items.map((item, key) => (
        <div className={styles['item']} key={key}>
          {item.url ? (
            <NavLink to={item.url}>
              {item.icon && <Icon icon={item.icon} size={18} />}
              <h4>{item.text}</h4>
            </NavLink>
          ) : (
            <div
              onClick={() => {
                item.onClick && item.onClick();
              }}
            >
              {item.icon && <Icon icon={item.icon} size={18} />}
              <h4>{item.text}</h4>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Menu;

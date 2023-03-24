import { Popover, Position, Menu as MenuLib } from 'evergreen-ui';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import styles from './menu.module.scss';

/* eslint-disable-next-line */
export interface MenuItem {
  text: string;
  icon?: string;
  url?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MenuProps {
  items: MenuItem[];
  children: ReactElement;
}

export function Menu(props: MenuProps) {
  const { items, children } = props;

  return (
    <Popover
      position={Position.BOTTOM_RIGHT}
      content={
        <MenuLib>
          <div className={styles['menu-items']}>
            {items.map((item, key) => (
              <div className={styles['menu-item-wrapper']} key={key}>
                {item.url ? (
                  <div>
                    {item.disabled ? (
                      <div className={styles['menu-item-disabled']}>
                        {item.icon && <Icon icon={item.icon} size={18} />}
                        <h4>{item.text}</h4>
                      </div>
                    ) : (
                      <NavLink to={item.url} className={styles['menu-item']}>
                        {item.icon && <Icon icon={item.icon} size={18} />}
                        <h4>{item.text}</h4>
                      </NavLink>
                    )}
                  </div>
                ) : (
                  <div
                    className={`${
                      item.disabled
                        ? styles['menu-item-disabled']
                        : styles['menu-item']
                    }`}
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
        </MenuLib>
      }
    >
      <div className={styles['trigger']}>{children}</div>
    </Popover>
  );
}

export default Menu;

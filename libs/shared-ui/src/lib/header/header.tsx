import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';
import Brand from '../brand/brand';
import { useState } from 'react';
import Icon from '../icon/icon';
import Drawer, { DrawerPosition } from '../drawer/drawer';

/* eslint-disable-next-line */

export interface LinkHeader {
  title: string;
  url: string;
  accent?: boolean;
}
export interface HeaderProps {
  children?: any;
  links: Array<LinkHeader>;
  className?: string;

}

export function Header(props: HeaderProps) {
  const { children, links, className } = props;
  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    setOpenModal(true);
  };
  return (
    <div className={`${styles['container-header']} ${className}`}>
      <div className={styles['header-responsive']}>
        <div className={styles['brand']}>
          <Brand link="/home" />
        </div>
        <div className={styles['panel-container']}>
          <div className={styles['navbar']} onClick={handleClick}>
            {openModal === false ? (
              <Icon icon={'menu'} size={40}></Icon>
            ) : (
              <Icon icon={'minus'} size={40}></Icon>
            )}
          </div>
          <Drawer
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
            width={180}
            position={DrawerPosition.RIGHT}
          >
            <div className={styles['navigate-content']}>
              {links.map((link, index) => (
                <NavLink
                  to={link.url}
                  key={index}
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <h3 className={`${styles['link-options']}`}>{link.title}</h3>
                </NavLink>
              ))}
            </div>
          </Drawer>
        </div>
      </div>
      <div className={styles['main-action']}>
        <Brand link="/home" />
      </div>
      <div className={styles['information']}>
        <div className={styles['links']}>
          {links.map((link, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive
                  ? `${styles['active-link']} ${styles['link']} ${
                      link.accent ? styles['accent'] : ''
                    }`
                  : `${styles['link']} ${link.accent ? styles['accent'] : ''}`
              }
              to={link.url}
            >
              <h4 className={`${styles['link']}`}>{link.title}</h4>
            </NavLink>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}

export default Header;

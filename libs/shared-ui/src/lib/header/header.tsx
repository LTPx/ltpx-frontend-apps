import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';
import Brand from '../brand/brand';
import { useState } from 'react';
import Icon from '../icon/icon';

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
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`${styles['container-header']} ${className}`}>
      <div className={styles['main-action']}>
        <Brand />
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

      <div className={styles['header-small']}>
        <div className={styles['panel-container']}>
          <div className={styles['panel-open']} onClick={handleClick}>
            {isOpen === false ? (
              <Icon icon={'menu'} size={40}></Icon>
            ) : (
              <Icon icon={'minus'} size={40}></Icon>
            )}
          </div>
          <div className={`${styles['panel']} ${isOpen ? styles['open'] : ''}`}>
            {links.map((link, index) => (
              <NavLink to={link.url}>
                <h4 className={`${styles['link-options']}`}>{link.title}</h4>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

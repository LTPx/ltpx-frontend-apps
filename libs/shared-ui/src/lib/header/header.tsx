import styles from './header.module.scss';
import { NavLink } from "react-router-dom";
import Brand from '../brand/brand';

/* eslint-disable-next-line */

export interface LinkHeader {
  title: string;
  url: string;
}
export interface HeaderProps {
  children?: any;
  links: Array<LinkHeader>;
  className?: string;
}

export function Header(props: HeaderProps) {
  const { children, links, className } = props;
  return (
    <div className={`${styles['container']} ${className}`}>
      <div className={styles['main-action']}>
        <Brand/>
        <div className={styles['search']}>

        </div>
      </div>
      <div className={styles['information']}>
        <div className={styles['links']}>
          { links.map((link, index) => (
              <NavLink
                key={index}
                className={({ isActive }) =>
                  isActive ? `${styles['active-link']} ${styles['link']}` : styles['link']
                }
                to={link.url}
              >
                <h4 className={styles['link']} >{link.title}</h4>
              </NavLink>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}

export default Header;

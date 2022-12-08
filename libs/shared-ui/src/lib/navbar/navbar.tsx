import styles from './navbar.module.scss';
import { NavLink } from "react-router-dom";

/* eslint-disable-next-line */

export interface Link {
  title: string;
  url: string;
}
export interface NavbarProps {
  children?: any;
  links: Array<Link>;
}

export function Navbar(props: NavbarProps) {
  const { children, links } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['main-action']}>
        <div className={styles['brand']}>
          LTPX
        </div>
        <div className={styles['search']}>

        </div>
      </div>
      <div className={styles['information']}>
        <div className={styles['links']}>
          { links.map((link, index) => (
              <NavLink
                key={index}
                className={styles['link']}
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

export default Navbar;

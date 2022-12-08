import styles from './navbar.module.scss';

/* eslint-disable-next-line */
export interface NavbarProps {
  children?: any
}

const links = [
  { title: 'Home', url: '/home'},
  { title: 'Courses', url: '/courses'},
  { title: 'Find a class', url: '/find'},
  { title: 'Teach', url: '/teach'},
  { title: 'Contact', url: '/contact'}
]

export function Navbar(props: NavbarProps) {
  const { children } = props;
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
          { links.map((link, index)=>(
            <div className={styles['link']} key={index}>
              {link.title}
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}

export default Navbar;

import { NavLink, Outlet } from 'react-router-dom';
import styles from './blog-layout.module.scss';

export function BlogLayout() {
  return (
    <div className={styles['container']}>
      <div className={styles['content-wrapper']}>
        <div className={styles['breadcrumbs']}>
          <NavLink to='/blog'>
            Inicio
          </NavLink>
        </div>
        <div className={styles['content']}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default BlogLayout;

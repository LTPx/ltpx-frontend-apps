import { Outlet } from 'react-router-dom';
import styles from './blog-layout.module.scss';

/* eslint-disable-next-line */
export interface BlogLayoutProps {}

export function BlogLayout(props: BlogLayoutProps) {
  return (
    <div className={styles['container']}>
      {/* <div>breadcrumbs</div> */}
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}

export default BlogLayout;

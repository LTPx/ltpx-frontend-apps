import { Icon, NotFound } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './page-404.module.scss';

/* eslint-disable-next-line */
export interface Page404Props {}

export function Page404(props: Page404Props) {
  return (
    <div className={styles['container']}>
      <NotFound></NotFound>
      <div className={styles['back']}>
        <NavLink to={'/home'} className={styles['link']}>
          <Icon icon={'arrow-left'} size={20} />
          <h3>Go Home</h3>
        </NavLink>
      </div>
    </div>
  );
}

export default Page404;

import { Cart, Header } from '@ltpx-frontend-apps/shared-ui';
import { Outlet } from 'react-router-dom';
import styles from './app-layout.module.scss';

/* eslint-disable-next-line */
export interface AppLayoutProps {}

const links = [
  { title: 'Home', url: '/home'},
  { title: 'Courses', url: '/courses'},
  { title: 'Become a teacher', url: '/register'},
  { title: 'Login', url: '/login'}
];

export function AppLayout(props: AppLayoutProps) {
  return (
    <div className={styles['container']}>
      <Header links={links}>
        <Cart amount={1}/>
      </Header>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;

import { Header, Sidebar } from '@ltpx-frontend-apps/shared-ui';
import { Outlet } from 'react-router-dom';
import styles from './dashboard-layout.module.scss';

/* eslint-disable-next-line */
export interface DashboardLayoutProps {}

export function DashboardLayout(props: DashboardLayoutProps) {
  const sidebarOptions = [
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: {
        icon: 'dashboard',
        size: 20,
      }
    },
    {
      title: 'My Courses',
      url: 'courses',
      icon: {
        icon: 'book-open',
        size: 20,
      }
    },
    {
      title: 'Payments',
      url: 'payments',
      icon: {
        icon: 'wallet',
        size: 20,
      }
    },
    {
      title: 'Settings',
      url: 'settings',
      icon: {
        icon: 'wrench',
        size: 20,
      }
    },
    {
      title: 'My Account',
      url: 'account',
      icon: {
        icon: 'user',
        size: 20,
      }
    }
  ];
  return (
    <div className={styles['container']}>
      <Header links={[]}/>
      <div className="sidebar">
        <Sidebar links={sidebarOptions} />
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
      <div className={styles['footer']}></div>
      <div className={styles['footer']}>LTPX 2022</div>
    </div>
  );
}

export default DashboardLayout;

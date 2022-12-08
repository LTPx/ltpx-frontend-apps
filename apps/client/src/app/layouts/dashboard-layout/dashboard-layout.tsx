import { Sidebar } from '@ltpx-frontend-apps/shared-ui';
import { Outlet } from 'react-router-dom';
import styles from './dashboard-layout.module.scss';

/* eslint-disable-next-line */
export interface DashboardLayoutProps {}

export function DashboardLayout(props: DashboardLayoutProps) {
  const sidebarOptions = [
    {
      title: 'Dashboard',
      url: '/new'
    },
    {
      title: 'My Courses',
      url: '/my-courses',
    },
    {
      title: 'Resources',
      url: '/resources'
    },
    {
      title: 'Wallet',
      url: '/wallet'
    },
    {
      title: 'My Account',
      url: '/account'
    },
  ];
  return (
    <div className={styles['container']}>
      <div className="sidebar">
        <Sidebar links={sidebarOptions} />
      </div>
      <div className="content">
        <Outlet />
      </div>
      {/* <div className="h-screen flex">
        <Sidebar options={sidebarOptions} />
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-scroll py-6 px-16 antialiased bg-gray-200 mb-12">
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default DashboardLayout;

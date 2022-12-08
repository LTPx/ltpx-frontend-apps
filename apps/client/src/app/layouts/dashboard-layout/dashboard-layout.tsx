import { Outlet } from 'react-router-dom';
import styles from './dashboard-layout.module.scss';

/* eslint-disable-next-line */
export interface DashboardLayoutProps {}

export function DashboardLayout(props: DashboardLayoutProps) {
  const sidebarOptions = [
    {
      title: 'Dashboard',
      icon: {
        name: 'MdApps'
      },
      link: '/orders/new'
    },
    {
      title: 'My Courses',
      icon: {
        name: 'FaStore'
      },
      link: '/my-courses',
      selected: true
    },
    {
      title: 'Resources',
      icon: {
        name: 'MdDashboard'
      },
      link: '/resources'
    },
    {
      title: 'Wallet',
      icon: {
        name: 'MdDashboard'
      },
      link: '/wallet'
    },
    {
      title: 'My Account',
      icon: {
        name: 'MdDashboard'
      },
      link: '/account'
    },
  ];
  return (
    <div className={styles['container']}>
      <div className="sidebar">

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

import { Avatar, Header, Icon, Nav } from '@ltpx-frontend-apps/shared-ui';
import { Outlet } from 'react-router-dom';
import styles from './dashboard-layout.module.scss';

/* eslint-disable-next-line */
export interface DashboardLayoutProps {}

const headerLinks = [
  { title: 'Home', url: '/home'},
  { title: 'Courses', url: '/courses'},
  { title: 'Become a teacher', url: '/register'},
  { title: 'Login', url: '/login'}
];

const sidebarOptions = [
  {
    title: 'Dashboard',
    url: 'dashboard',
    icon: {
      icon: 'store',
      size: 20,
    }
  },
  {
    title: 'My Courses',
    url: 'courses/learning',
    icon: {
      icon: 'university',
      size: 20,
    }
  },
  {
    title: 'My Classes',
    url: 'classes/week',
    icon: {
      icon: 'desktop',
      size: 20,
    }
  },
  {
    title: 'Payments',
    url: 'payments/purchases',
    icon: {
      icon: 'wallet',
      size: 20,
    }
  },
  {
    title: 'Settings',
    url: 'settings',
    icon: {
      icon: 'cog',
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


export function DashboardLayout(props: DashboardLayoutProps) {

  return (
    <div className={styles['container']}>
      <Header links={headerLinks}>
        <div className={styles['actions']}>
          <Icon icon='notification' size={22}></Icon>
          <Avatar image='https://images.unsplash.com/photo-1669563306078-4c107b67d125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80'/>
        </div>
      </Header>
      <div className={styles['navbar']}>
        <Nav links={sidebarOptions}/>
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
      <div className={styles['footer']}>LTPX 2022</div>
    </div>
  );
}

export default DashboardLayout;

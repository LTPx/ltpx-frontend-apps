import { logout } from '@ltpx-frontend-apps/api';
import { Button, Icon, Nav } from '@ltpx-frontend-apps/shared-ui';
import { Outlet, useNavigate } from 'react-router-dom';
import HeaderApp from '../../components/header-app/header-app';
import { useUser } from '../../hooks/useUser';
import styles from './dashboard-layout.module.scss';

/* eslint-disable-next-line */
export interface DashboardLayoutProps {}

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
  const { setUser, logoutApp } = useUser();
  const navigate = useNavigate();

  const logoutSession = async () => {
    sessionStorage.setItem('user', '');
    sessionStorage.setItem('isAuthenticated', 'false');
    await logout();
    setUser({name:'', email:''});
    logoutApp();
    navigate('/home');
    // console.log('out: ', resp);
  }

  return (
    <div className={styles['container']}>
      <HeaderApp/>
      <div className={styles['navbar']}>
        <Nav links={sidebarOptions}/>
        <div className={styles['logout']} onClick={logoutSession}>
          <Icon icon='log-out' size={20}/>
          <h4>Logout</h4>
        </div>
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
      <div className={styles['footer']}>LTPX 2022</div>
    </div>
  );
}

export default DashboardLayout;

import { Icon, Nav } from '@ltpx-frontend-apps/shared-ui';
import { Outlet, useNavigate } from 'react-router-dom';
import HeaderApp from '../../components/header-app/header-app';
import { useUser } from '../../hooks/useUser';
import styles from './dashboard-layout.module.scss';

export interface DashboardLink {
  title: string,
  url: string,
  icon: {
    icon: string,
    size: number,
  }
}
/* eslint-disable-next-line */
export interface DashboardLayoutProps {
  links: DashboardLink[]
}

export function DashboardLayout(props: DashboardLayoutProps) {
  const { links } = props;
  const { logoutApp } = useUser();
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.setItem('user', '');
    sessionStorage.setItem('isAuthenticated', 'false');
    logoutApp();
    navigate('/home');
  }

  return (
    <div className={styles['container']}>
      <HeaderApp/>
      <div className={styles['navbar']}>
        <Nav links={links}/>
        <div className={styles['logout']} onClick={logout}>
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

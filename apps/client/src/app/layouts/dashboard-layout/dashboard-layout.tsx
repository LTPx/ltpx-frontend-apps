import { Icon, Nav } from '@ltpx-frontend-apps/shared-ui';
import { Outlet, useNavigate } from 'react-router-dom';
import HeaderApp from '../../components/header-app/header-app';
import { useUser } from '../../store';
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
  const { logout } = useUser();
  const navigate = useNavigate();

  const logoutSession = async () => {
    await logout();
    navigate('/');
    window.location.reload();
  }

  return (
    <div className={styles['container']}>
      <HeaderApp/>
      <div className={styles['navbar']}>
        <Nav links={links}/>
        <div className={styles['logout']} onClick={logoutSession}>
          <Icon icon='log-out' size={20}/>
          <h4>Logout</h4>
        </div>
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;

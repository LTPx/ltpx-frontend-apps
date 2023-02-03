import { Nav } from '@ltpx-frontend-apps/shared-ui';
import { Outlet } from 'react-router-dom';
import HeaderApp from '../../components/header-app/header-app';
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

  return (
    <div className={styles['container']}>
      <HeaderApp/>
      <div className={styles['navbar']}>
        <Nav links={links}/>
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;

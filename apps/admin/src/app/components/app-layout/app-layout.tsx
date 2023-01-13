import { Header, Nav } from '@ltpx-frontend-apps/shared-ui';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import styles from './app-layout.module.scss';

/* eslint-disable-next-line */
export interface AppLayoutProps {}

export function AppLayout(props: AppLayoutProps) {
  const { t } = useTranslation();

  const links = [
    {
      title: t('Dashboard'),
      url: '/admin/dashboard',
      icon: {
        icon: 'list',
        size: 20,
      },
    },
    {
      title: t('Usuarios'),
      url: '/admin/users',
      icon: {
        icon: 'user-circle',
        size: 20,
      },
    },
    {
      title: t('Profesores'),
      url: '/admin/teachers',
      icon: {
        icon: 'user',
        size: 20,
      },
    },
    {
      title: t('Configuracion'),
      url: '/admin/settings',
      icon: {
        icon: 'cog',
        size: 20,
      },
    },
    {
      title: 'Plan de Carrera',
      url: '/admin/learning-path',
      icon: {
        icon: 'box-unpacked',
        size: 20,
      },
    },
  ];

  return (
    <div className={styles['container']}>
      <Header links={[]}></Header>
      <div className={styles['navbar']}>
        <Nav links={links} />
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;

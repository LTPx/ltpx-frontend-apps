import {
  Dropdown,
  Header,
  Icon,
  Nav,
  UserMenu,
} from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './app-layout.module.scss';

/* eslint-disable-next-line */
export interface AppLayoutProps {}

export function AppLayout(props: AppLayoutProps) {
  const { t } = useTranslation();
  const { user, logout } = useUser();
  const navigate = useNavigate();

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
      <Header className={styles['header']} links={[]}>
        <Dropdown>
          <div className={styles['avatar']}>
            <h4>Administrador</h4>
            <Icon icon="caret-down" size={18} />
          </div>
          <UserMenu
            name={'admin'}
            email={'email@example.com'}
            links={[
              {
                icon: 'log-out',
                text: 'Cerrar Session',
                onClick: async() => {
                  await logout();
                  navigate('/');
                },
              },
            ]}
          />
        </Dropdown>
      </Header>
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

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
import { Avatar } from 'evergreen-ui';

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
        icon: 'user-group',
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
      title: t('Cursos'),
      url: '/admin/courses',
      icon: {
        icon: 'university',
        size: 20,
      },
    },
    {
      title: t('Configuración'),
      url: '/admin/settings',
      icon: {
        icon: 'cog',
        size: 20,
      },
    },
    {
      title: 'Planes de carrera',
      url: '/admin/learning-path',
      icon: {
        icon: 'box-unpacked',
        size: 20,
      },
    },
    {
      title: 'Pagos',
      url: '/admin/payments',
      icon: {
        icon: 'money',
        size: 20,
      },
    },
  ];

  return (
    <div className={styles['container']}>
      <Header className={styles['header']} links={[]}>
        <div className={styles['teacher-actions']}>
          <Dropdown>
            <UserMenu
              name={'Admin System'}
              email={'admin@example.com'}
              links={[
                {
                  icon: 'log-out',
                  text: 'Cerrar Session',
                  onClick: async () => {
                    await logout();
                    navigate('/');
                  },
                },
              ]}
            />
            <div className={styles['avatar']}>
              <Avatar name={'Admin System'} size={40} color="green" />
              <Icon icon="caret-down" size={18} />
            </div>
          </Dropdown>
        </div>
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

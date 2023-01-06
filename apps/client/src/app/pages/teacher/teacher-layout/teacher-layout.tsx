import { Avatar, Dropdown, Header, Icon, Nav, NotificationList, UserMenu } from '@ltpx-frontend-apps/shared-ui';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../../store';
import styles from './teacher-layout.module.scss';

/* eslint-disable-next-line */
export interface TeacherLayoutProps {}

export function TeacherLayout(props: TeacherLayoutProps) {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const links = [
    {
      title: t('dashboards.teacher.dashboard'),
      url: 'dashboard',
      icon: {
        icon: 'store',
        size: 20,
      }
    },
    {
      title: t('dashboards.teacher.courses'),
      url: 'courses',
      icon: {
        icon: 'university',
        size: 20,
      }
    },
    {
      title: t('dashboards.teacher.earnings'),
      url: 'earnings',
      icon: {
        icon: 'wallet',
        size: 20,
      }
    },
    {
      title: t('dashboards.teacher.account'),
      url: 'account',
      icon: {
        icon: 'user',
        size: 20,
      }
    }
  ];

  const logoutSession = async () => {
    await logout();
    navigate('/');
    window.location.reload();
  }

  return (
    <div className={styles['container']}>
      <Header links={[]}>
        <div className={styles['teacher-actions']}>
          <Dropdown>
            <Icon icon='notification' size={22}/>
            <NotificationList notifications={[]} countNewNotification={0}/>
          </Dropdown>
          <h4>{user.fullname}</h4>
          <Dropdown>
            <Avatar
              image='https://images.unsplash.com/photo-1669563306078-4c107b67d125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80'
              dropdown-id={'menu'}
            />
            <UserMenu
              name={user.fullname}
              email={user.email}
              links={[
                {
                  icon: 'arrows-horizontal',
                  text: 'Cambiar a Usuario',
                  onClick: () => {console.log('switch to default view')}
                },
                {
                  icon: 'log-out',
                  text: 'Cerrar Session',
                  onClick: () => {logoutSession()}
                }
              ]}
            />
          </Dropdown>
        </div>
      </Header>
      <div className={styles['navbar']}>
        <Nav links={links}/>
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}

export default TeacherLayout;

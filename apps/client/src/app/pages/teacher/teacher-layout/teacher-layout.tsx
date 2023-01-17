import { Dropdown, Header, Icon, Nav, NotificationList, UserMenu } from '@ltpx-frontend-apps/shared-ui';
import { Avatar } from 'evergreen-ui';
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
      <Header links={[]} className={styles['header']}>
        <div className={styles['teacher-actions']}>
          <Dropdown>
            <Icon icon='notification' size={22} className={styles['notification']}/>
            <NotificationList notifications={[]} countNewNotification={0}/>
          </Dropdown>
          <Dropdown>
            <div className={styles['avatar']}>
              <Avatar name={user.fullname} size={40} color='green'/>
              <h4>{user.fullname}</h4>
              <Icon icon='caret-down' size={18}/>
            </div>
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

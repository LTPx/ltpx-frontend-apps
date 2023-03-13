import { Avatar, AvatarSize, Dropdown, Header, Icon, UserMenu } from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './teacher-layout.module.scss';
import avatar from './../../../../assets/images/avatars/avatar-3.svg'

export function TeacherLayout() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const links = [
    {
      title: t('dashboards.teacher.dashboard'),
      url: 'dashboard',
    },
    {
      title: t('dashboards.teacher.courses'),
      url: 'courses',
    },
    {
      title: t('dashboards.teacher.sessions'),
      url: 'sessions',
    },
    {
      title: t('dashboards.teacher.earnings'),
      url: 'earnings',
    },
    // {
    //   title: t('dashboards.teacher.account'),
    //   url: 'account',
    // }
  ];

  const logoutSession = async () => {
    await logout();
    navigate('/');
    window.location.reload();
  }

  return (
    <div className={styles['container']}>
      <Header links={links} className={styles['header']}>
        <div className={styles['teacher-actions']}>
          <Dropdown>
            <UserMenu
              name={user.fullname}
              email={user.email}
              links={[
                {
                  icon: 'user',
                  text: 'Perfil de profesor',
                  url: '/teacher/account'
                },
                {
                  icon: 'telephone',
                  text: 'Contactar Soporte',
                },
                {
                  icon: 'log-out',
                  text: 'Cerrar Session',
                  onClick: () => {logoutSession()}
                }
              ]}
            />
            <div className={styles['avatar']}>
              <Avatar outline={true} size={AvatarSize.small} image={avatar}/>
              <Icon icon='caret-down' size={18}/>
            </div>
          </Dropdown>
        </div>
      </Header>
      <div className={styles['content']}>
        <div className={styles['render-content']}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default TeacherLayout;

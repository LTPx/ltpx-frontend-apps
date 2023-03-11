import styles from './student-layout.module.scss';
import {
  Dropdown,
  Header,
  Icon,
  Nav,
  UserMenu,
} from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import avatar from './../../../../assets/images/avatars/avatar-1.svg'

export function StudentLayout() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const links = [
    {
      title: t('dashboards.student.dashboard'),
      url: '/student/dashboard',
      icon: {
        icon: 'store',
        size: 20,
      },
    },
    {
      title: t('header.courses'),
      url: '/courses',
      icon: {
        icon: 'store',
        size: 20,
      },
    },
    // {
    //   title: t('dashboards.student.courses'),
    //   url: 'courses',
    //   icon: {
    //     icon: 'university',
    //     size: 20,
    //   },
    // },
    {
      title: t('dashboards.student.classes'),
      url: '/student/classes',
      icon: {
        icon: 'desktop',
        size: 20,
      },
    },
    // {
    //   title: t('dashboards.student.payments'),
    //   url: 'payments',
    //   icon: {
    //     icon: 'wallet',
    //     size: 20,
    //   }
    // },
    // {
    //   title: t('dashboards.student.settings'),
    //   url: 'settings',
    //   icon: {
    //     icon: 'cog',
    //     size: 20,
    //   }
    // },
  ];

  const logoutSession = async () => {
    await logout();
    navigate('/');
    window.location.reload();
  };

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
                  text: 'Mi Cuenta',
                  url: '/student/account',
                },
                {
                  icon: 'log-out',
                  text: 'Cerrar Session',
                  onClick: () => {
                    logoutSession();
                  },
                },
              ]}
            />
            <div className={styles['avatar']}>
              <Avatar name={user.fullname} size={40} color="green" src={avatar}/>
              <Icon icon="caret-down" size={18} />
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

export default StudentLayout;

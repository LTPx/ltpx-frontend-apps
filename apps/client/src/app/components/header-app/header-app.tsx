import styles from './header-app.module.scss';
import {
  Dropdown,
  Header,
  UserMenu,
} from '@ltpx-frontend-apps/shared-ui';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart, useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';

export function HeaderApp() {
  const { user, logout, isAuthenticated, currentView } = useUser();
  const { totalCourses } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const logoutSession = async () => {
    await logout();
    navigate('/');
    window.location.reload();
  };

  const mainLinks = [
    { title: t('header.home'), url: '/home' },
    { title: t('header.courses'), url: '/courses' },
    { title: t('header.beTeacher'), url: '/register-teacher' },
  ];

  const authLinks = [
    { title: t('header.login'), url: '/login' },
    { title: t('header.register'), url: '/register', accent: true },
  ];

  const linksNotAccount = isAuthenticated
    ? mainLinks
    : mainLinks.concat(authLinks);

  const linksView = {
    default: linksNotAccount,
    user: [],
    student: [],
    teacher: [],
  };

  const links = linksView[currentView];

  return (
    <div className={styles['container']}>
      <Header links={links}>
        <div className={styles['actions']}>
          {isAuthenticated && (
            <Dropdown>
              <Avatar name={user.fullname} size={35}/>
              <UserMenu
                name={user.fullname}
                email={user.email}
                links={[
                  {
                    icon: 'log-out',
                    text: 'Cerrar Session',
                    onClick: () => {
                      logoutSession();
                    },
                  },
                ]}
              />
            </Dropdown>
          )}
        </div>
      </Header>
    </div>
  );
}

export default HeaderApp;

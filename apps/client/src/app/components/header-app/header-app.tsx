import {
  Avatar,
  Cart,
  Dropdown,
  Header,
  Icon,
  UserMenu,
} from '@ltpx-frontend-apps/shared-ui';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './header-app.module.scss';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../store';

/* eslint-disable-next-line */
export interface HeaderAppProps {}

export function HeaderApp(props: HeaderAppProps) {
  const { user, logout, isAuthenticated, totalProducts, currentView } =
    useUser();
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

  const linksStudent = [{ title: 'My Dashboard', url: '/student/dashboard' }];

  const linksNotAccount = isAuthenticated
    ? mainLinks
    : mainLinks.concat(authLinks);

  const linksView = {
    default: linksNotAccount,
    user: linksStudent,
    student: linksStudent,
    teacher: [],
  };

  const links = linksView[currentView];

  return (
    <div className={styles['container']}>
      <Header links={links}>
        <div className={styles['actions']}>
          {isAuthenticated && (
            <>
              <NavLink className="c" to={'cart'}>
                {totalProducts > 0 && <div className="badge">{totalProducts}</div>}
                <Icon icon="shopping-cart" size={18}></Icon>
              </NavLink>
              <Dropdown>
                <Avatar
                  image="https://images.unsplash.com/photo-1669563306078-4c107b67d125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80"
                  dropdown-id={'menu'}
                />
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
            </>
          )}
        </div>
      </Header>
    </div>
  );
}

export default HeaderApp;

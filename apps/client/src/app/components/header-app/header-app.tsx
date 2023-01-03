import { Avatar, Cart, Header, Icon } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './header-app.module.scss';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../store';

/* eslint-disable-next-line */
export interface HeaderAppProps {}

export function HeaderApp(props: HeaderAppProps) {
  const { user, isAuthenticated, totalProducts, currentView } = useUser();
  const { t } = useTranslation();

  const mainLinks = [
    { title: t('header.home'), url: '/home'},
    { title: t('header.courses'), url: '/courses'},
    { title: t('header.beTeacher'), url: '/register-teacher'},
  ];

  const authLinks = [
    { title: t('header.login'), url: '/login'},
    { title: t('header.register'), url: '/register'},
  ];

  // const linksTeacher = [
  //   { title: 'My Dashboard', url: '/teacher/dashboard'},
  // ];

  const linksStudent = [
    { title: 'My Dashboard', url: '/student/dashboard'},
  ];

  const linksNotAccount = mainLinks.concat(authLinks);

  const linksView = {
    default: linksNotAccount,
    user: linksStudent,
    student: linksStudent,
    teacher: []
  }

  const links = linksView[currentView];

  return (
    <Header links={links}>
      <div className={styles['actions']}>
        <NavLink to={'/cart'}>
          <Cart amount={totalProducts}/>
        </NavLink>
        { isAuthenticated && (
          <>
            <Icon icon='notification' size={22}></Icon>
            <h4>{user.fullname}</h4>
            <Avatar image='https://images.unsplash.com/photo-1669563306078-4c107b67d125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80'/>
          </>
        )}
      </div>
    </Header>
  );
}

export default HeaderApp;

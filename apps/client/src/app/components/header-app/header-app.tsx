import { Avatar, Cart, Header, Icon } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import styles from './header-app.module.scss';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface HeaderAppProps {}

export function HeaderApp(props: HeaderAppProps) {
  const { user, isAuthenticated, products } = useUser();
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

  const linksAccount = [
    { title: 'My Dashboard', url: '/student/dashboard'},
  ];

  const linksNotAccount = mainLinks.concat(authLinks);
  const linksWithAccount = mainLinks.concat(linksAccount);

  return (
    <>
      { isAuthenticated && (
        <Header links={linksWithAccount}>
          <div className={styles['actions']}>
            <NavLink to={'/cart'}>
              <Cart amount={products.length}/>
            </NavLink>
            { isAuthenticated && (
              <>
                <Icon icon='notification' size={22}></Icon>
                <h4>{user.name}</h4>
                <Avatar image='https://images.unsplash.com/photo-1669563306078-4c107b67d125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80'/>
              </>
            )}
          </div>
        </Header>
      )}
      { !isAuthenticated && (
        <Header links={linksNotAccount}>
          <div className={styles['actions']}>
            <NavLink to={'/cart'}>
              <Cart amount={products.length}/>
            </NavLink>
          </div>
        </Header>
      )}
    </>
  );
}

export default HeaderApp;

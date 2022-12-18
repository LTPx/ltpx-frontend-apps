import { Avatar, Cart, Header, Icon } from '@ltpx-frontend-apps/shared-ui';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../store/context/user/user-context';
import styles from './header-app.module.scss';

const links = [
  { title: 'Home', url: '/home'},
  { title: 'Courses', url: '/courses'},
  { title: 'Become a teacher', url: '/register'},
  { title: 'Login', url: '/login'}
];

/* eslint-disable-next-line */
export interface HeaderAppProps {}

export function HeaderApp(props: HeaderAppProps) {
  const { userState } = useContext(UserContext);
  const { logged } = userState;

  return (
    <Header links={links}>
      <div className={styles['actions']}>
        <NavLink to={'cart'}>
          <Cart amount={2}/>
        </NavLink>
        { logged && (
          <>
            <Icon icon='notification' size={22}></Icon>
            <Avatar image='https://images.unsplash.com/photo-1669563306078-4c107b67d125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3387&q=80'/>
          </>
        )}
      </div>
    </Header>
  );
}

export default HeaderApp;

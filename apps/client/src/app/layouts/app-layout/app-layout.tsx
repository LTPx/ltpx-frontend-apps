import { Cart, Footer, Header } from '@ltpx-frontend-apps/shared-ui';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './app-layout.module.scss';

/* eslint-disable-next-line */
export interface AppLayoutProps {}

const links = [
  { title: 'Home', url: '/home'},
  { title: 'Courses', url: '/courses'},
  { title: 'Become a teacher', url: '/register'},
  { title: 'Login', url: '/login'}
];

const companyLinks = [
  { text: 'Our Company', url: '/company'},
  { text: 'About us', url: '/about'},
  { text: 'Contact us', url: '/contact'},
  { text: 'Community', url: '/community'},
  { text: 'Blog', url: '/blog'},
]

const supportLinks = [
  { text: 'Documentation', url: '/documentation'},
  { text: 'Forums', url: '/forums'},
  { text: 'Language Packs', url: '/languages'},
  { text: 'Release', url: '/release'},
]

export function AppLayout(props: AppLayoutProps) {
  return (
    <div className={styles['container']}>
      <Header links={links}>
        <NavLink to={'cart'}>
          <Cart amount={2}/>
        </NavLink>
      </Header>
      <div className="content">
        <Outlet />
      </div>
      <Footer companyLinks={companyLinks} supportLinks={supportLinks} />
    </div>
  );
}

export default AppLayout;

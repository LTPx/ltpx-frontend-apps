import { Cart, Footer, Header } from '@ltpx-frontend-apps/shared-ui';
import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import HeaderApp from '../../components/header-app/header-app';
import { UserContext } from '../../store/context/user/user-context';
import styles from './app-layout.module.scss';

/* eslint-disable-next-line */
export interface AppLayoutProps {}

const companyLinks = [
  { text: 'Our Company', url: '/company'},
  { text: 'About us', url: '/about'},
  { text: 'Contact us', url: '/contact'},
  { text: 'Community', url: '/community'},
  { text: 'Blog', url: '/blog'},
];

const supportLinks = [
  { text: 'Documentation', url: '/documentation'},
  { text: 'Forums', url: '/forums'},
  { text: 'Language Packs', url: '/languages'},
  { text: 'Release', url: '/release'},
];

export function AppLayout(props: AppLayoutProps) {

  return (
    <div className={styles['container']}>
      <HeaderApp/>
      <div className={styles['content']}>
        <Outlet />
      </div>
      <Footer companyLinks={companyLinks} supportLinks={supportLinks} />
    </div>
  );
}

export default AppLayout;

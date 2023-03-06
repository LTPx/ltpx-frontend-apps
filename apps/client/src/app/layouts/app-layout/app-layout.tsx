import { Footer } from '@ltpx-frontend-apps/shared-ui';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import HeaderApp from '../../components/header-app/header-app';
import styles from './app-layout.module.scss';

/* eslint-disable-next-line */
export interface AppLayoutProps {}

// const supportLinks = [
//   { text: 'Documentation', url: '/documentation' },
//   { text: 'Forums', url: '/forums' },
//   { text: 'Language Packs', url: '/languages' },
//   { text: 'Release', url: '/release' },
// ];

export function AppLayout(props: AppLayoutProps) {
  const { t } = useTranslation();
  const companyLinks = [
    { text: t('footer.about'), url: '/about' },
    { text: t('footer.contact'), url: '/contact' },
    { text: t('footer.blog'), url: '/blog' },
    { text: t('footer.blog'), url: '/FAQ' },
  ];
  return (
    <div className={styles['layout']}>
      <div className={styles['header']}>
        <HeaderApp />
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
      <div className={styles['footer']}>
        <Footer companyLinks={companyLinks}/>
      </div>
    </div>
  );
}

export default AppLayout;

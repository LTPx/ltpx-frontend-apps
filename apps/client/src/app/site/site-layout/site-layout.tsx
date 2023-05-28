import styles from './site-layout.module.scss';
import {
  BannerNotification,
  ChatFloat,
  Dropdown,
  Footer,
  Header,
  UserMenu,
} from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';

export function SiteLayout() {
  const { user, logout, isAuthenticated } =
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

  const headerLinks = isAuthenticated ? mainLinks : mainLinks.concat(authLinks);

  const companyLinks = [
    { text: t('footer.about'), url: '/about' },
    { text: t('footer.blog'), url: '/blog' },
    { text: 'Términos y condiciones', url: '/terms-and-conditions' },
    { text: 'Preguntas Frecuentes', url: '/faq' },
  ];

  return (
    <div className={styles['container']}>
      <Header links={headerLinks} className={styles['header']}>
        <div className={styles['user-actions']}>
          {isAuthenticated && (
            <Dropdown>
              <UserMenu
                name={user.fullname}
                email={user.email}
                links={[
                  {
                    icon: 'log-out',
                    text: 'Cerrar Sesión',
                    onClick: () => {
                      logoutSession();
                    },
                  },
                ]}
              />
              <Avatar name={user.fullname} size={35} />
            </Dropdown>
          )}
        </div>
      </Header>
      <div className={styles['content']}>
        {localStorage.getItem('pending-validation')  && (
          <BannerNotification
            onClickClose={() => {
              localStorage.removeItem('pending-validation');
            }}
          >
            <h5 className={styles['email-text-banner']}>
              Hemos enviado un correo de validación a tu correo electrónico:{' '}
              {localStorage.getItem('pending-validation')}
            </h5>
          </BannerNotification>
        )}
        {localStorage.getItem('reset_account') && (
          <BannerNotification
            onClickClose={() => {
              localStorage.removeItem('reset_account');
            }}
          >
            <h5 className={styles['email-text-banner']}>
              Hemos enviado un correo electrónico con instrucciones a tu
              dirección: {localStorage.getItem('reset_account')}
            </h5>
          </BannerNotification>
        )}
        {localStorage.getItem('password-updated') && (
          <BannerNotification
            onClickClose={() => {
              localStorage.removeItem('password-updated');
            }}
          >
            <h5 className={styles['email-text-banner']}>
              Tu contraseña ha sido actualizado correctamente, ya puedes
              iniciar sesión de nuevo.
            </h5>
          </BannerNotification>
        )}
        <Outlet />
      </div>
      {isAuthenticated && <ChatFloat />}
      <div className={styles['footer']}>
        <Footer companyLinks={companyLinks} />
      </div>
    </div>
  );
}

export default SiteLayout;

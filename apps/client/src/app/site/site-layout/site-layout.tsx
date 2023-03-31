import styles from './site-layout.module.scss';
import { Dropdown, Footer, Header, Icon, UserMenu } from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { Chat } from '../../components';
import { useState } from 'react';

export function SiteLayout() {
  const { user, logout, isAuthenticated } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openChat, setOpenChat] = useState(false);

  const logoutSession = async () => {
    await logout();
    navigate('/');
    window.location.reload();
  }

  const mainLinks = [
    { title: t('header.home'), url: '/home' },
    { title: t('header.courses'), url: '/courses' },
    { title: t('header.beTeacher'), url: '/register-teacher' },
  ];

  const authLinks = [
    { title: t('header.login'), url: '/login' },
    { title: t('header.register'), url: '/register', accent: true },
  ];

  const headerLinks = isAuthenticated
    ? mainLinks
    : mainLinks.concat(authLinks);

  const companyLinks = [
    { text: t('footer.about'), url: '/about' },
    { text: t('footer.blog'), url: '/blog' },
    { text: "Términos y condiciones", url: '/terms-and-conditions' },
    { text: "Preguntas Frecuentes", url: '/faq' },
  ];

  //TODO: move to new component
  const ChatFloat = ({ onClick }: { onClick: () => void }) => (
    <div className={styles['chat-tab-button']} onClick={onClick}>
      <Icon icon="chat-dots" size={20} />
    </div>
  )

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
                    text: 'Cerrar Session',
                    onClick: () => {
                      logoutSession();
                    },
                  },
                ]}
              />
              <Avatar name={user.fullname} size={35}/>
            </Dropdown>
          )}
        </div>
      </Header>
      <div className={styles['content']}>
        <Outlet />
      </div>
      <div className={styles['chat-float-container']}>
        {openChat ? (
          <div className={styles['chat-container']}>
            <Chat onCancel={() => setOpenChat(false)} />
          </div>
        ) : (
          <ChatFloat onClick={() => setOpenChat(true)} />
        )}
      </div>
      <div className={styles['footer']}>
        <Footer companyLinks={companyLinks}/>
      </div>
    </div>
  );
}

export default SiteLayout;

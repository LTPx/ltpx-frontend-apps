import styles from './student-layout.module.scss';
import {
  Dropdown,
  Header,
  Icon,
  Nav,
  UserMenu,
} from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import avatar from './../../../assets/images/avatars/avatar-1.svg'
import Chat from '../../components/chat/chat';
import { useState } from 'react';

export function StudentLayout() {
  const [openChat, setOpenChat] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const links = [
    {
      title: t('dashboards.student.dashboard'),
      url: '/student/dashboard',
      icon: {
        icon: 'store',
        size: 20,
      },
    },
    {
      title: t('header.courses'),
      url: '/courses',
      icon: {
        icon: 'store',
        size: 20,
      },
    },
    {
      title: t('dashboards.student.classes'),
      url: '/student/classes',
      icon: {
        icon: 'desktop',
        size: 20,
      },
    },
  ];

  const logoutSession = async () => {
    await logout();
    navigate('/');
    window.location.reload();
  };

  //TODO: move to new component
  const ChatFloat = ({ onClick }: { onClick: () => void }) => (
    <div className={styles['chat-tab-button']} onClick={onClick}>
      <Icon icon="chat-dots" size={20} />
    </div>
  );

  return (
    <div className={styles['container']}>
      <Header links={links} className={styles['header']}>
        <div className={styles['teacher-actions']}>
          <Dropdown>
            <UserMenu
              name={user.fullname}
              email={user.email}
              links={[
                {
                  icon: 'user',
                  text: 'Mi Cuenta',
                  url: '/student/account',
                },
                {
                  icon: 'log-out',
                  text: 'Cerrar Sesión',
                  onClick: () => {
                    logoutSession();
                  },
                },
              ]}
            />
            <div className={styles['avatar']}>
              <Avatar name={user.fullname} size={40} color="green" src={avatar}/>
              <Icon icon="caret-down" size={18} />
            </div>
          </Dropdown>
        </div>
      </Header>
      <div className={styles['content']}>
        <div className={styles['render-content']}>
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
      </div>
    </div>
  );
}

export default StudentLayout;

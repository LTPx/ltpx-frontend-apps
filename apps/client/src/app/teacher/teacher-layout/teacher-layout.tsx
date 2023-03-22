import {
  Avatar,
  AvatarSize,
  Dropdown,
  Header,
  Icon,
  UserMenu,
} from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './teacher-layout.module.scss';
import avatar from './../../../assets/images/avatars/avatar-3.svg';
import { useState } from 'react';
import Chat from '../../components/chat/chat';
import ChatNewPrivateRoom from '../../components/chat-new-private-room/chat-new-private-room';
import { getChatStudents, UserModel } from '@ltpx-frontend-apps/api';

export function TeacherLayout() {
  const [openChat, setOpenChat] = useState(false);
  const [openNewChat, setOpenNewChat] = useState(false);
  const [users, setUsers] = useState<UserModel[]>([]);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const links = [
    {
      title: t('dashboards.teacher.dashboard'),
      url: 'dashboard',
    },
    {
      title: t('dashboards.teacher.courses'),
      url: 'courses',
    },
    {
      title: t('dashboards.teacher.sessions'),
      url: 'sessions',
    },
    {
      title: t('dashboards.teacher.earnings'),
      url: 'earnings',
    },
  ];

  const logoutSession = async () => {
    await logout();
    navigate('/');
    window.location.reload();
  };

  async function handleNewChat() {
    try {
      const data = await getChatStudents();
      setUsers(data);
      setOpenNewChat(true);
    } catch (error) {
      console.log(error);
    }
  }

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
                  text: 'Perfil de profesor',
                  url: '/teacher/account',
                },
                {
                  icon: 'telephone',
                  text: 'Contactar Soporte',
                },
                {
                  icon: 'log-out',
                  text: 'Cerrar Session',
                  onClick: () => {
                    logoutSession();
                  },
                },
              ]}
            />
            <div className={styles['avatar']}>
              <Avatar outline={true} size={AvatarSize.small} image={avatar} />
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
              <Chat onCancel={() => setOpenChat(false)}>
                <Icon
                  icon="plus-circle"
                  size={20}
                  onClick={() => {
                    handleNewChat();
                  }}
                />
              </Chat>
            </div>
          ) : (
            <ChatFloat onClick={() => setOpenChat(true)} />
          )}
        </div>
      </div>
      {openNewChat && (
        <ChatNewPrivateRoom
          users={users}
          onClose={() => setOpenNewChat(false)}
        />
      )}
    </div>
  );
}

export default TeacherLayout;

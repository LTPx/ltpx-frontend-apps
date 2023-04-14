import styles from './student-layout.module.scss';
import {
  Avatar,
  AvatarSize,
  Cart,
  Chat,
  ChatFloat,
  Dropdown,
  Header,
  Icon,
  NotificationList,
  UserMenu,
} from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import avatar from './../../../assets/images/avatars/avatar-1.svg';
import { useEffect, useState } from 'react';
import ActionCable from 'actioncable';

export function StudentLayout() {
  const [openChat, setOpenChat] = useState(false);
  const { user, logout } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    const notificationsChannel = cable.subscriptions.create({
      channel: 'NotificationsChannel',
      id: user.id
    }, {
      received(data: any) {
        console.log(data);
        setNotifications(['data'])
      },
    });

    return () => {
      cable.subscriptions.remove(notificationsChannel);
    };
  }, []);

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

  return (
    <div className={styles['container']}>
      <Header links={links} className={styles['header']}>
        <div className={styles['teacher-actions']}>
          <Dropdown>
            <NotificationList notifications={[]} countNewNotification={notifications.length}/>
            <div className={styles['avatar']}>
              <Cart amount={notifications.length}/>
            </div>
          </Dropdown>
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
              <Avatar size={AvatarSize.small} outline={true} image={avatar} />
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
            <ChatFloat />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentLayout;

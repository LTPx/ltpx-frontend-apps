import styles from './student-layout.module.scss';
import {
  Avatar,
  AvatarSize,
  Chat,
  ChatFloat,
  Dropdown,
  Header,
  Icon,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
  UserMenu,
} from '@ltpx-frontend-apps/shared-ui';
import {
  useAppStore,
  useNotificationWebSocket,
  useUser,
  useUtil,
} from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import avatar from './../../../assets/images/avatars/avatar-1.svg';
import Notifications from '../../components/notifications/notifications';
import { TypeAccounts } from '@ltpx-frontend-apps/api';

export function StudentLayout() {
  const [openChat, setOpenChat] = useState(false);
  const { user, logout, newNotification, notifications, _changeAccount } =
    useUser();
  const { t } = useTranslation();
  const { feedbackAction } = useAppStore();
  const { clearMessageToast } = useUtil();
  const navigate = useNavigate();

  const wsUrl = process.env.NX_WS_URL || '';
  useNotificationWebSocket(wsUrl);

  const links = [
    {
      title: t('dashboards.student.dashboard'),
      url: '/student/dashboard',
    },
    {
      title: t('header.courses'),
      url: '/courses',
    },
    {
      title: t('dashboards.student.classes'),
      url: '/student/classes',
    },
    { title: t('header.beTeacher'), url: '/register-teacher' },
  ];

  const logoutSession = async () => {
    await logout();
    navigate('/');
    window.location.reload();
  };

  const myAccountAction = {
    icon: 'user',
    text: 'Mi Cuenta',
    url: '/student/account',
  };

  const studentAccountAction = {
    icon: 'switch-account',
    text: 'Cambiar a profesor',
    onClick: async () => {
      const { success, error } = await _changeAccount(TypeAccounts.teacher);
      if (success) {
        window.location.reload();
        console.log(success);
      } else {
        console.log(error);
      }
    },
  };

  const logoutAction = {
    icon: 'log-out',
    text: 'Cerrar Sesión',
    onClick: () => {
      logoutSession();
    },
  };

  const dropdownActions = user.is_teacher
    ? [myAccountAction, studentAccountAction, logoutAction]
    : [myAccountAction, logoutAction];

  return (
    <div className={styles['container']}>
      <Header links={links} className={styles['header']}>
        <div className={styles['teacher-actions']}>
          <Notifications />
          <Dropdown>
            <UserMenu
              name={user.fullname}
              email={user.email}
              links={dropdownActions}
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
      {feedbackAction.text && (
        <Snackbar
          position={SnackbarPosition.centerBottom}
          open={true}
          title={feedbackAction.type === 'success' ? 'Actualizado' : 'Errores'}
          text={feedbackAction.text}
          kind={
            feedbackAction.type === 'success'
              ? SnackbarType.success
              : SnackbarType.error
          }
          duration={2000}
          onClose={clearMessageToast}
        />
      )}
      {newNotification && notifications.length > 0 && (
        <Snackbar
          position={SnackbarPosition.bottomRight}
          open={true}
          title={'Nueva notificación'}
          text={notifications[notifications.length - 1].text}
          kind={SnackbarType.message}
          duration={1000}
          onClose={clearMessageToast}
        />
      )}
    </div>
  );
}

export default StudentLayout;

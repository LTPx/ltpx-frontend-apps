import styles from './teacher-layout.module.scss';
import {
  Avatar,
  AvatarSize,
  Chat,
  Dropdown,
  Header,
  Icon,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
  UserMenu,
} from '@ltpx-frontend-apps/shared-ui';
import { Outlet } from 'react-router-dom';
import avatar from './../../../assets/images/avatars/avatar-3.svg';
import { useTeacherLayout } from './useTeacherLayout';
import { ChatNewPrivateRoom } from '../../components';
import Notifications from '../../components/notifications/notifications';
import { useNotificationWebSocket, useUser } from '@ltpx-frontend-apps/store';
import { TypeAccounts } from '@ltpx-frontend-apps/api';

export function TeacherLayout() {
  // useNotification(onMessageListener);
  const wsUrl = process.env.NX_WS_URL || '';
  useNotificationWebSocket(wsUrl);

  const {
    headerLinks,
    handleNewChat,
    logoutSession,
    users,
    currentUser,
    openChat,
    setOpenChat,
    openNewChat,
    setOpenNewChat,
    feedbackAction,
    clearMessageToast,
    newNotification,
    notifications,
  } = useTeacherLayout();

  const { _changeAccount, user } = useUser();

  const ChatFloat = ({ onClick }: { onClick: () => void }) => (
    <div className={styles['chat-tab-button']} onClick={onClick}>
      <Icon icon="chat-dots" size={20} />
      <h4>Chat</h4>
    </div>
  );

  const teacherProfileAction = {
    icon: 'user',
    text: 'Perfil de profesor',
    url: '/teacher/account',
  };

  const contactSupportAction = {
    icon: 'telephone',
    text: 'Contactar Soporte',
    href: 'https://wa.me/message/Y5P6BHULTPA2B1',
  };

  const changeStudentAccountAction = {
    icon: 'switch-account',
    text: 'Cambiar a estudiante',
    onClick: async () => {
      const { success, error } = await _changeAccount(TypeAccounts.user);
      if (success) {
        window.location.reload();
        console.log(success);
      } else {
        console.log(error);
      }
    },
  };

  const changeAccountToUserAction = {
    icon: 'switch-account',
    text: 'Cambiar a sitio',
    onClick: async () => {
      const { success, error } = await _changeAccount(TypeAccounts.user);
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

  const dropdownActions = user.is_student
    ? [teacherProfileAction, changeStudentAccountAction, logoutAction]
    : [
        teacherProfileAction,
        changeAccountToUserAction,
        contactSupportAction,
        logoutAction,
      ];

  return (
    <div className={styles['container']}>
      <Header links={headerLinks} className={styles['header']}>
        <div className={styles['teacher-actions']}>
          <Notifications />
          <Dropdown>
            <UserMenu
              name={currentUser.fullname}
              email={currentUser.email}
              links={dropdownActions}
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
                <Icon icon="plus-circle" size={20} onClick={handleNewChat} />
              </Chat>
            </div>
          ) : (
            <ChatFloat onClick={() => setOpenChat(true)} />
          )}
          {openNewChat && (
            <ChatNewPrivateRoom
              users={users}
              onClose={() => setOpenNewChat(false)}
            />
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
          duration={2000}
          onClose={clearMessageToast}
        />
      )}
    </div>
  );
}

export default TeacherLayout;

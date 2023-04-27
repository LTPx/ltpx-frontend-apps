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
import { StatusTeacherAccount } from '@ltpx-frontend-apps/api';
import { useTeacherLayout } from './useTeacherLayout';
import { ChatNewPrivateRoom } from '../../components';
import Notifications from '../../components/notifications/notifications';

export function TeacherLayout() {
  const {
    headerLinks,
    handleNewChat,
    logoutSession,
    teacherAccount,
    users,
    currentUser,
    openChat,
    setOpenChat,
    openNewChat,
    setOpenNewChat,
    feedbackAction,
    clearMessageToast,
  } = useTeacherLayout();

  const ChatFloat = ({ onClick }: { onClick: () => void }) => (
    <div className={styles['chat-tab-button']} onClick={onClick}>
      <Icon icon="chat-dots" size={20} />
    </div>
  );

  return (
    <div className={styles['container']}>
      <Header links={headerLinks} className={styles['header']}>
        <div className={styles['teacher-actions']}>
          <Notifications />
          <Dropdown>
            <UserMenu
              name={currentUser.fullname}
              email={currentUser.email}
              links={[
                {
                  icon: 'user',
                  text: 'Perfil de profesor',
                  url: '/teacher/account',
                },
                {
                  icon: 'telephone',
                  text: 'Contactar Soporte',
                  href: 'https://wa.me/message/Y5P6BHULTPA2B1',
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
        {teacherAccount == StatusTeacherAccount.approved && (
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
        )}
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
    </div>
  );
}

export default TeacherLayout;

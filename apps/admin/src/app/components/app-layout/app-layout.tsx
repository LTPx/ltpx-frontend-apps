import {
  Dropdown,
  Header,
  Icon,
  Nav,
  UserMenu,
  ChatFloat,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
} from '@ltpx-frontend-apps/shared-ui';
import {
  useAppStore,
  useUser,
  useUtil,
} from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './app-layout.module.scss';
import { Avatar } from 'evergreen-ui';
import { useCallback, useEffect } from 'react';
import { TypeAccounts } from '@ltpx-frontend-apps/api';

export function AppLayout() {
  const { t } = useTranslation();
  const { feedbackAction } = useAppStore();
  const { user, logout, getCurrentUser, _changeAccount } = useUser();
  const navigate = useNavigate();
  const { clearMessageToast } = useUtil();

  const fetchCurrentUser = useCallback(async () => {
    await getCurrentUser();
  }, []);

  useEffect(() => {
    if (user.email === undefined) {
      fetchCurrentUser();
    }
  }, [])

  const links = [
    {
      title: t('Dashboard'),
      url: '/admin/dashboard',
      icon: {
        icon: 'list',
        size: 20,
      },
    },
    {
      title: t('Usuarios'),
      url: '/admin/users',
      icon: {
        icon: 'user-group',
        size: 20,
      },
    },
    {
      title: t('Profesores'),
      url: '/admin/teachers',
      icon: {
        icon: 'user',
        size: 20,
      },
    },
    {
      title: t('Cursos'),
      url: '/admin/courses',
      icon: {
        icon: 'university',
        size: 20,
      },
    },
    // {
    //   title: t('Configuración'),
    //   url: '/admin/settings',
    //   icon: {
    //     icon: 'cog',
    //     size: 20,
    //   },
    // },
    // {
    //   title: 'Planes de carrera',
    //   url: '/admin/learning-path',
    //   icon: {
    //     icon: 'box-unpacked',
    //     size: 20,
    //   },
    // },
    {
      title: 'Pagos',
      url: '/admin/payments',
      icon: {
        icon: 'money',
        size: 20,
      },
    },
    {
      title: 'Categorías',
      url: '/admin/categories',
      icon: {
        icon: 'category',
        size: 20,
      },
    },
  ];

  return (
    <div className={styles['container']}>
      <Header className={styles['header']} links={[]}>
        <div className={styles['teacher-actions']}>
          <Dropdown>
            <UserMenu
              name={user.fullname}
              email={user.email}
              links={[
                {
                  icon: 'switch',
                  text: 'Cambiar a profesor',
                  onClick: async () => {
                    const { success, error } = await _changeAccount(TypeAccounts.user);
                    if (success) {
                      window.location.reload();
                      console.log(success);
                    } else {
                      console.log(error);
                    }
                  },
                },
                {
                  icon: 'log-out',
                  text: 'Cerrar Sesión',
                  onClick: async () => {
                    await logout();
                    navigate('/');
                  },
                },
              ]}
            />
            <div className={styles['avatar']}>
              <Avatar name={user.fullname} size={40} color="green" />
              <Icon icon="caret-down" size={18} />
            </div>
          </Dropdown>
        </div>
      </Header>
      <div className={styles['navbar']}>
        <Nav links={links} />
      </div>
      <div className={styles['content']}>
        <div className={styles['render-content']}>
          <Outlet />
        </div>
        <div className={styles['chat-float-container']}>
          <ChatFloat />
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
    </div>
  );
}

export default AppLayout;

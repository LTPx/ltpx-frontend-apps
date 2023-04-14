import { Icon } from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './teacher-account-layout.module.scss';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface TeacherAccountLayoutProps {}
export function TeacherAccountLayout(props: TeacherAccountLayoutProps) {
  const { user } = useUser();
  const [indexSelected, setIndexSelected] = useState(0);
  const optionsLinks = [
    { text: 'Perfil de Profesor', url: '/teacher/account', icon: 'person' },
    { text: 'Cuenta Bancaria', url: 'account-bank', icon: 'bank' },
    { text: 'Cambiar Contraseña', url: 'password-edit', icon: 'key' },
  ];
  const selectTab = (index: number) => {
    setIndexSelected(index);
  };
  return (
    <div className={styles['container']}>
      {user.teacher ? (
        <div className={styles['content']}>
          <div className={styles['profile']}>
            <div className={styles['general-information']}>
              <NavLink to="/teacher/account">
                <Avatar
                  name={user.fullname}
                  src={user.teacher.profile_image}
                  size={150}
                />
              </NavLink>
              <h3>{user.fullname}</h3>
              <h4>{user.email}</h4>
            </div>
            <div className={styles['links-information']}>
              <div className={styles['links-wrap']}>
                {optionsLinks.map((option, index) => (
                  <NavLink
                    className={
                      indexSelected === index
                        ? `${styles['tab']} ${styles['selected']}`
                        : `${styles['tab']}`
                    }
                    to={option.url}
                    onClick={() => {
                      selectTab(index);
                    }}
                  >
                    <div className={styles['link']}>
                      <Icon icon={option.icon} size={23} />
                      <h4>{option.text}</h4>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className={styles['information']}>
            <div className={styles['render-content']}>
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <h1>Una vez seas aprobado como profesor podrás agregar tu perfil</h1>
      )}
    </div>
  );
}

export default TeacherAccountLayout;

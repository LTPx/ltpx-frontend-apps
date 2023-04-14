import { Button, Icon } from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './student-account-layout.module.scss';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface StudentAccountLayoutProps {}

export function StudentAccountLayout(props: StudentAccountLayoutProps) {
  const { user } = useUser();
  const [indexSelected, setIndexSelected] = useState(0);
  const optionsLinks = [
    { text: 'Cuenta de Usuario', url: '/student/account', icon: 'person' },
    { text: 'Cambiar Contraseña', url: 'password-edit', icon: 'key' },
  ];
  const selectTab = (index: number) => {
    setIndexSelected(index);
  };
  return (
    <div className={styles['wrap']}>
      <div className={styles['container']}>
        <div className={styles['content']}>
          <div className={styles['profile']}>
            <div className={styles['general-information']}>
              <NavLink to="/student/account">
                <Avatar name={user.fullname} size={150} />
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
      </div>
    </div>
  );
}

export default StudentAccountLayout;

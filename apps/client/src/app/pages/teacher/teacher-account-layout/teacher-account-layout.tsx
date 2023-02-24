import { Button } from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './teacher-account-layout.module.scss';

/* eslint-disable-next-line */
export interface TeacherAccountLayoutProps {}
export function TeacherAccountLayout(props: TeacherAccountLayoutProps) {
  const { user } = useUser();
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['profile']}>
          <div className={styles['general-information']}>
            <NavLink to="/teacher/account">
              <Avatar name={user.fullname} size={150} />
            </NavLink>
            <h3>{user.fullname}</h3>
            <h4>{user.email}</h4>
            <div className={styles['btn']}>
              <Button
                className={styles['button-edit']}
                title="Editar perfil"
                outline={true}
                link={'account-form'}
              />
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
  );
}

export default TeacherAccountLayout;

import { Button } from '@ltpx-frontend-apps/shared-ui';
import { Avatar } from 'evergreen-ui';
import { Outlet } from 'react-router-dom';
import styles from './teacher-account-layout.module.scss';

/* eslint-disable-next-line */
export interface TeacherAccountLayoutProps {}
export function TeacherAccountLayout(props: TeacherAccountLayoutProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['profile']}>
          <div className={styles['general-information']}>
            <Avatar name={'Angel Capa'} size={150} />
            <h3>Angel Capa</h3>
            <h4>email@example.com</h4>
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

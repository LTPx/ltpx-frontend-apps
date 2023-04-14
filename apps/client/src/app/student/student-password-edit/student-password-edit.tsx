import { ChangePasswordForm } from '@ltpx-frontend-apps/shared-ui';
import styles from './student-password-edit.module.scss';

/* eslint-disable-next-line */
export interface StudentPasswordEditProps {}

export function StudentPasswordEdit(props: StudentPasswordEditProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['title-content']}>
        <h4 className={styles['title']}>Cambiar Contraseña</h4>
      </div>
      <ChangePasswordForm url="/student/account" onSubmit={() => {}} />
    </div>
  );
}

export default StudentPasswordEdit;

import { ChangePasswordForm } from '@ltpx-frontend-apps/shared-ui';
import styles from './password-edit.module.scss';
import { useNavigate } from 'react-router-dom';
import { useUser, useUtil } from '@ltpx-frontend-apps/store';

/* eslint-disable-next-line */
export interface PasswordEditProps {}

export function PasswordEdit(props: PasswordEditProps) {
  const { changePassword } = useUser();
  const { setMessageToast } = useUtil();
  const navigate = useNavigate();

  async function updateUserPassword(params: any) {
    const formatParams = {
      current_password: params.currentPassword,
      confirm_password: params.confirmPassword,
      password: params.newPassword,
    };
    const { success, error } = await changePassword(formatParams);
    if (success) {
      setMessageToast('success', 'Tu contraseña ah sido actualizada');
      navigate('/teacher/account/account-profile');
    } else {
      setMessageToast('error', error);
    }
  }
  return (
    <div className={styles['container']}>
      <ChangePasswordForm
        url="/teacher/account/account-profile"
        onSubmit={(params) => {
          updateUserPassword(params);
        }}
      />
    </div>
  );
}

export default PasswordEdit;

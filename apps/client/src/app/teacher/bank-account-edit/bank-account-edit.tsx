import { BankAccountForm } from '@ltpx-frontend-apps/shared-ui';
import styles from './bank-account-edit.module.scss';
import { useTeacher, useUtil } from '@ltpx-frontend-apps/store';
import { useNavigate } from 'react-router-dom';
import { TeacherProfileParams } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface BankAccountEditProps {}

export function BankAccountEdit(props: BankAccountEditProps) {
  const { _updateProfile, profile } = useTeacher();
  const { setMessageToast } = useUtil();
  const navigate = useNavigate();

  async function updateTeacherProfile(params: TeacherProfileParams) {
    const { success, error } = await _updateProfile(params);
    if (success) {
      setMessageToast('success', 'Tu perfil ha sido actualizado');
      navigate('/teacher/account/account-bank');
    } else {
      setMessageToast('error', error);
    }
  }
  return (
    <div className={styles['container']}>
      <div className={styles['title-content']}>
        <h4 className={styles['title']}>Editar Cuenta Bancaria</h4>
      </div>
      <BankAccountForm
        account={profile.bank_accounts[0]}
        onSubmit={updateTeacherProfile}
      />
    </div>
  );
}

export default BankAccountEdit;

import { Button } from '@ltpx-frontend-apps/shared-ui';
import styles from './teacher-account-bank.module.scss';
import { ColorsButton } from '@ltpx-frontend-apps/shared-ui';
import { useCourseUtil, useTeacher } from '@ltpx-frontend-apps/store';

/* eslint-disable-next-line */
export interface TeacherAccountBankProps {}

export function TeacherAccountBank(props: TeacherAccountBankProps) {
  const { profile } = useTeacher();
  const { translateAccountType } = useCourseUtil();

  return (
    <div className={styles['container']}>
      {/* <h1>Cuenta Bancaria</h1> */}
      <div className={styles['content']}>
        <div className={styles['title-content']}>
          <h4 className={styles['title']}>Cuenta Bancaria</h4>
          <Button
            className={styles['btn-edit']}
            title="Editar"
            color={ColorsButton.secondary}
            link="/teacher/account/account-bank-edit"
          />
        </div>
        <div className={styles['bank']}>
          {profile.bank_accounts.length > 0 && (
            <div className={styles['info-bank']}>
              <div className={styles['item']}>
                <h4>Nombre del Banco: </h4>
                <h4 className={styles['text']}>
                  {profile.bank_accounts[0].bank_name}
                </h4>
              </div>
              <div className={styles['item']}>
                <h4>Propietario de la cuenta: </h4>
                <h4 className={styles['text']}>
                  {profile.bank_accounts[0].owner_account_name}
                </h4>
              </div>
              <div className={styles['item']}>
                <h4>Número de cuenta: </h4>
                <h4 className={styles['text']}>
                  {profile.bank_accounts[0].bank_account_number}
                </h4>
              </div>
              <div className={styles['item']}>
                <h4>Tipo de cuenta: </h4>
                <h4 className={styles['text']}>
                  {translateAccountType(
                    profile.bank_accounts[0].bank_account_type
                  )}
                </h4>
              </div>
              <div className={styles['item']}>
                <h4>Número de identificación: </h4>
                <h4 className={styles['text']}>
                  {profile.bank_accounts[0].national_id}
                </h4>
              </div>
              <div className={styles['item']}>
                <h4>Dirección: </h4>
                <h4 className={styles['text']}>
                  {profile.bank_accounts[0].address}
                </h4>
              </div>
              <div className={styles['item']}>
                <h4>Teléfono: </h4>
                <h4 className={styles['text']}>
                  {profile.bank_accounts[0].phone}
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherAccountBank;

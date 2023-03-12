import { Icon } from '@ltpx-frontend-apps/shared-ui';
import { useTeacher } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import styles from './teacher-account-profile.module.scss';

/* eslint-disable-next-line */
export interface TeacherAccountProfileProps {}

export function TeacherAccountProfile(props: TeacherAccountProfileProps) {
  const { profile, getProfile } = useTeacher();

  const fetchProfile = useCallback(async () => {
    const { success, data, error } = await getProfile();
    console.log('data: ', data);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className={styles['container']}>
      {profile.teacher_name && (
        <>
          <div className={styles['about-teacher']}>
            <div className={styles['title']}>
              <Icon icon={'person'} size={20}></Icon>
              <h3>Sobre mi</h3>
            </div>
            <p>{profile.biography} </p>
          </div>
          <div className={styles['about-teacher']}>
            <div className={styles['title']}>
              <Icon icon={'pencil-square'} size={20}></Icon>
              <h3>Información de Usuario</h3>
            </div>
          </div>
          <div className={styles['bank']}>
            <div className={styles['title']}>
              <Icon icon={'bank'} size={20}></Icon>
              <h3>Cuenta Bancaria</h3>
            </div>
            {profile.bank_accounts.length > 0 && (
              <div className={styles['info-bank']}>
                <div className={styles['row']}>
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
                </div>
                <div className={styles['row']}>
                  <div className={styles['item']}>
                    <h4>Número de cuenta: </h4>
                    <h4 className={styles['text']}>
                      {profile.bank_accounts[0].bank_account_number}
                    </h4>
                  </div>
                  <div className={styles['item']}>
                    <h4>Tipo de cuenta: </h4>
                    <h4 className={styles['text']}>
                      {profile.bank_accounts[0].bank_account_type}
                    </h4>
                  </div>
                </div>
                <div className={styles['row']}>
                  <div className={styles['item']}>
                    <h4>Número de identificación: </h4>
                    <h4 className={styles['text']}>
                      {profile.bank_accounts[0].national_id}
                    </h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TeacherAccountProfile;

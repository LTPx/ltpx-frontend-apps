import styles from './account.module.scss';
import { UserAccountForm } from '@ltpx-frontend-apps/shared-ui';
import { IUserAccount } from '@ltpx-frontend-apps/api';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface AccountProps {}

export function Account(props: AccountProps) {
  const onSubmit = (data: IUserAccount) => console.log(data);

  return (
    <div className={`${styles['container']} card`}>
      <div className={styles['title-content']}>
        <h4 className={styles['title']}>Editar Cuenta de Usuario</h4>
      </div>
      <UserAccountForm
        url="/student/account"
        onSubmit={(data) => {
          onSubmit(data);
        }}
      ></UserAccountForm>
    </div>
  );
}

export default Account;

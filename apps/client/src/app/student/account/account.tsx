import styles from './account.module.scss';
import {
  ChangePasswordForm,
  Tabs,
  UserAccountForm,
} from '@ltpx-frontend-apps/shared-ui';
import { IUserAccount } from '@ltpx-frontend-apps/api';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface AccountProps {}

export function Account(props: AccountProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const onSubmit = (data: IUserAccount) => console.log(data);

  const handleClick = (index: number) => {
    setSelectedTab(index);
  };
  const tabs = [
    {
      text: 'Cuenta de Usuario',
    },
    {
      text: 'Cambiar Contraseña',
    },
  ];
  return (
    <div className={`${styles['container']} card`}>
      <Tabs
        className={styles['tabs']}
        tabs={tabs}
        onClickTab={(option) => handleClick(option)}
      />
      {selectedTab === 0 && (
        <UserAccountForm
          url="/student/account"
          onSubmit={(data) => {
            onSubmit(data);
          }}
        ></UserAccountForm>
      )}
      {selectedTab === 1 && <ChangePasswordForm url="/student/account" onSubmit={()=>{}}/>}
    </div>
  );
}

export default Account;

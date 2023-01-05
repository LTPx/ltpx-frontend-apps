import styles from './account.module.scss';
import { UserAccountForm } from '@ltpx-frontend-apps/shared-ui';
import { IUserAccount } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface AccountProps {}

export function Account(props: AccountProps) {
  
  const onSubmit = (data: IUserAccount) => (
      console.log(data)
  )
  return (
    <div className={`${styles['container']} card`}>
      <UserAccountForm onSubmit={(data) => {onSubmit(data)}}></UserAccountForm>
    </div>
  );
}

export default Account;

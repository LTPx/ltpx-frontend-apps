import { IUserAccount } from '@ltpx-frontend-apps/api';
import { UserAccountForm } from '@ltpx-frontend-apps/shared-ui';
import styles from './new-user-page.module.scss';

/* eslint-disable-next-line */
export interface NewUserPageProps {}

export function NewUserPage(props: NewUserPageProps) {
  const clickFunction = () => {
    console.log('click');
  };

  return (
    <div className={styles['container']}>
      <UserAccountForm onSubmit={clickFunction}></UserAccountForm>
    </div>
  );
}

export default NewUserPage;

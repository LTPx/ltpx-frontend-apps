import { ICredentials } from '@ltpx-frontend-apps/api';
import { LoginForm } from '@ltpx-frontend-apps/shared-ui';
import styles from './login.module.scss';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const clickFunction = () => {
    console.log('click');
  };

  return (
    <div className={styles['container']}>
      <LoginForm onSubmit={clickFunction} />
    </div>
  );
}

export default Login;

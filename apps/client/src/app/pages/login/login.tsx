import styles from './login.module.scss';
import { Button, ColorsButton, Input, Navbar } from '@ltpx-frontend-apps/shared-ui';

/* eslint-disable-next-line */
export interface LoginProps {}

const links = [
  { title: 'Home', url: '/'},
  { title: 'Courses', url: '/courses'},
  { title: 'Become a teacher', url: '/register'},
  { title: 'Login', url: '/login'}
];

export function Login(props: LoginProps) {
  return (
    <div className="main-container">
      <Navbar links={links}/>
      <div className={styles['container']}>
        <div className={styles['illustration']}></div>
        <div className={styles['content']}>
          <h1>Log in</h1>
          <span>
            Access a supportive community of online instructors.
            Get instant access to all creation courses resources
          </span>
          <div className="form">
            <Input label='Email' placeholder='myemail@example.com'></Input>
            <Input label='Password' placeholder='********' type='password'></Input>
            <Button
              className={styles['btn-submit']}
              color={ColorsButton.primary}
              title="Sign In"
              full={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

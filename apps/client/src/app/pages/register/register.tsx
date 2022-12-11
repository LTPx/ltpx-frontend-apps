import { Button, ColorsButton, Input, Header } from '@ltpx-frontend-apps/shared-ui';
import styles from './register.module.scss';

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  return (
    <div className="main-container">
      <div className={styles['container']}>
        <div className={styles['illustration']}></div>
        <div className={styles['content']}>
          <h1>Become a E-Teacher</h1>
          <span>
            Discover a supportive community of online instructors.
            Get instant access to all creation courses resources
          </span>
          <div className="form">
            <Input label='Name' placeholder='Julian March'></Input>
            <Input label='Email' placeholder='myemail@example.com'></Input>
            <Input label='Password' placeholder='********' type='password'></Input>
            <Input label='Confirm password' placeholder='********' type='password'></Input>
            <Button
              className={styles['btn-submit']}
              color={ColorsButton.primary}
              title="Register"
              full={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

import { Button, ColorsButton, Input } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './forget-password.module.scss';

/* eslint-disable-next-line */
export interface ForgetPasswordProps {}

export function ForgetPassword(props: ForgetPasswordProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <h1>Olvidaste tu contraseña?</h1>
        <h4>
          No te preocupes, te enviaremos las instrucciones a tu correo
          electrónico
        </h4>
        <div className={styles['email']}>
          <Input
            label="Email"
            type="email"
            placeholder="Ingresa tu correo electrónico"
          ></Input>
        </div>
        <Button
          title={'Restablecer la contraseña'}
          color={ColorsButton.primary}
          full={true}
        />
        <NavLink to={'/login'} className={styles['link']}>
          Regresar a Iniciar Sesión
        </NavLink>
      </div>
    </div>
  );
}

export default ForgetPassword;

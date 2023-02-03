import styles from './register.module.scss';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RegisterForm } from '@ltpx-frontend-apps/shared-ui';
import { useNavigate } from 'react-router-dom';
import { IRegisterUser } from '@ltpx-frontend-apps/api';
import { useUser } from '@ltpx-frontend-apps/store';

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  const { register } = useUser();
  const navigate = useNavigate();

  const onSubmitForm = async (formData: IRegisterUser) => {
    const { isLogin, data } = await register(formData);
    if (isLogin) {
      navigate('/student/dashboard');
      window.location.reload();
    } else {
      // setError(true);
    }
  };

  return (
    <div className="main-container">
      <div className={styles['container']}>
        <div className={styles['content']}>
          <h1>Registrarme</h1>
          <span>
            Descubre una comunidad de apoyo de instructores en línea. Obtén
            acceso instantáneo a todos los recursos.
          </span>
          <RegisterForm
            onSubmit={(formData) => {
              onSubmitForm(formData);
            }}
            termsAndConditions={{
              text:'Acepto recibir correos informativos y/o promocionales de Open Mind',
              link:'/terms-and-conditions'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;

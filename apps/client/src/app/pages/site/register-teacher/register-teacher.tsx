// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RegisterForm } from '@ltpx-frontend-apps/shared-ui';
import { useNavigate } from 'react-router-dom';
import styles from './register-teacher.module.scss';
import { useTeacher } from '../../../store';
import { IRegisterUser } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface RegisterTeacherProps {}

export function RegisterTeacher(props: RegisterTeacherProps) {
  const { registerTeacher } = useTeacher();

  const navigate = useNavigate();

  const onSubmitForm = async (formData: IRegisterUser) => {
    const { isLogin, data } = await registerTeacher(formData);
    if (isLogin) {
      navigate('/teacher/dashboard');
      window.location.reload();
    } else {
      // setError(true);
    }
  };

  return (
    <div className="main-container">
      <div className={styles['container']}>
        <div className={styles['content']}>
          <h1>Quiero ser Profesor</h1>
          <span>
            Se parte de una comunidad de apoyo de instructores en línea.
            comparte tus conocimientos con otros y genera ingresos.
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

export default RegisterTeacher;

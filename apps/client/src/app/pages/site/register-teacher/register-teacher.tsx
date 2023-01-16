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
          <h1>Become a E-Teacher</h1>
          <span>
            Descubre una comunidad de apoyo de instructores en línea. Obtén
            acceso instantáneo a todos los recursos.
          </span>
          <RegisterForm
            onSubmit={(formData) => {
              onSubmitForm(formData);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterTeacher;

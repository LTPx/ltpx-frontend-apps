import styles from './register.module.scss';
import { RegisterForm } from '@ltpx-frontend-apps/shared-ui';
import { useNavigate } from 'react-router-dom';
import { IRegisterUser } from '@ltpx-frontend-apps/api';
import { useUser } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  const { register } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmitForm = async (formData: IRegisterUser) => {
    const { isLogin, data } = await register(formData);

    if (isLogin) {
      navigate('/home');
      window.location.reload();
    } else {
      // setError(true);
    }
  };

  return (
    <div className="main-container">
      <div className={styles['container']}>
        <div className={styles['content']}>
          <h1>{t('registerForm.user.title')}</h1>
          <span>{t('registerForm.user.text')}</span>
          <RegisterForm
            onSubmit={(formData) => {
              onSubmitForm(formData);
            }}
            termsAndConditions={{
              text: 'Acepto recibir correos informativos y/o promocionales de Open Mind',
              link: '/terms-and-conditions',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;

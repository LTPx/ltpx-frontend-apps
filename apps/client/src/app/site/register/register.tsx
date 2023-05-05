import styles from './register.module.scss';
import {
  BannerNotification,
  BannerType,
  RegisterForm,
} from '@ltpx-frontend-apps/shared-ui';
import { useNavigate } from 'react-router-dom';
import { IRegisterUser } from '@ltpx-frontend-apps/api';
import { useUser } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  const [registerError, setRegisterError] = useState<string>();
  const { register } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSubmitForm = async (formData: IRegisterUser) => {
    const { success, error } = await register(formData);
    if (success) {
      navigate('/login');
      window.location.reload();
    } else {
      setRegisterError(error);
    }
  };

  return (
    <div className={styles['main-container']}>
      <div className={styles['container']}>
        <div className={styles['register']}>
          <div className={styles['register-content']}>
            <h1 className={styles['title']}>{t('registerForm.user.title')}</h1>
            <h4 className={styles['text']}>
              Al usar Open Mind como alumno podrás avanzar a tu propio ritmo,
              asistir a clases grupales en línea, consultar a tu docente de
              manera ilimitada y obtener tus objetivos a tu propia velocidad.
            </h4>
            {registerError !== undefined && (
              <BannerNotification
                type={BannerType.error}
                onClickClose={() => setRegisterError(undefined)}
              >
                {registerError}
              </BannerNotification>
            )}
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
    </div>
  );
}

export default Register;

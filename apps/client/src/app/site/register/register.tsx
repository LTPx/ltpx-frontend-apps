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
    <div className={styles['main-container']}>
      <div className={styles['container']}>
        <div className={styles['information']}>
          <div className={styles['wrap-information']}>
            <img
              className={styles['img-register']}
              src="../../../../assets/images/vector.svg"
              alt="img-register"
            />
            <div className={styles['information-register']}>
              <h2 className={styles['title-register']}>
                Bienvenido a OpenMind
              </h2>
              <p className={styles['text-register']}>
                No estarás obligado a ir al ritmo del más lento ni a aprender
                cosas inútiles. Tu representante sólo pagará al docente una vez
                que cumplas tus objetivos motivando de esa manera al docente a
                enfocarse en lo que más importa; tu éxito. 
                {/* Podrás ver tus
                objetivos desde el inicio y completarlos a tu propio ritmo. Una
                vez que los completes, puedes avanzar de inmediato al siguiente
                nivel. */}
              </p>
            </div>
          </div>
        </div>
        <div className={styles['register']}>
          <div className={styles['register-content']}>
            <h1 className={styles['title']}>{t('registerForm.user.title')}</h1>
            <h4 className={styles['text']}>Al usar Open Mind como alumno podrás avanzar a tu propio ritmo,
                asistir a clases grupales en línea, consultar a tu docente de
                manera ilimitada y obtener tus objetivos a tu propia velocidad.</h4>
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

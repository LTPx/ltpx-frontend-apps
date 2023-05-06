import styles from './register-teacher.module.scss';
import {
  Button,
  ColorsButton,
  ContentItems,
  RegisterForm,
  SectionInformation,
  Tabs,
} from '@ltpx-frontend-apps/shared-ui';
import { NavLink, useNavigate } from 'react-router-dom';
import { IRegisterUser } from '@ltpx-frontend-apps/api';
import { useTeacher } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Dialog } from 'evergreen-ui';

/* eslint-disable-next-line */
export interface RegisterTeacherProps {}

export function RegisterTeacher(props: RegisterTeacherProps) {
  const { registerTeacher } = useTeacher();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const tabs = [
    { text: 'Proceso de solicitud' },
    { text: 'Crea un curso' },
    { text: 'Publica tu curso' },
  ];
  const items = [
    {
      image: '../../../../assets/images/teacher-course.svg',
      title: 'Enseña a tu manera',
      text: 'Publica el curso que desees y ten el control de tu propio contenido.',
    },
    {
      image: '../../../../assets/images/student.svg',
      title: 'Inspira a los estudiantes',
      text: 'Ayuda a los estudiantes a adquirir nuevas habilidades y avanzar en sus estudios.',
    },
    {
      image: '../../../../assets/images/income.svg',
      title: 'Genera Ingresos',
      text: 'Gana dinero por cada logro alcanzado por tus alumnos.',
    },
  ];
  const onSubmitForm = async (formData: IRegisterUser) => {
    const { isLogin, data } = await registerTeacher(formData);
    if (isLogin) {
      navigate('/login');
      window.location.reload();
    } else {
      // setError(true);
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['coll-to-action']}>
        <div className={styles['wrap']}>
          <div className={styles['information-section']}>
            <div className={styles['description']}>
              <h1 className={styles['title-register']}>
                {t('registerForm.teacher.title')}
              </h1>
              <h3 className={styles['text-register']}>
                {t('registerForm.teacher.text')}
              </h3>
            </div>
            <div className={styles['btn']}>
              <Button
                onClick={() => setOpenModal(true)}
                title={'Regístrate para enseñar'}
                color={ColorsButton.secondary}
              />
            </div>
          </div>
          <div className={styles['image-section']}>
            <img src="../../../../assets/images/become-teacher.png" />
          </div>
        </div>
      </div>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        title={'Aplicar para Profesor'}
        onCloseComplete={() => setOpenModal(false)}
      >
        <div className={styles['register-form']}>
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
      </Dialog>
      <ContentItems title="Hay muchas razones para empezar" items={items} />
      <div className={styles['begin-teacher']}>
        <div className={styles['content']}>
          <h1 className={styles['title']}>Como empezar</h1>
          <Tabs
            className={styles['tab']}
            classNameText={styles['tab-text']}
            tabs={tabs}
            onClickTab={(index) => setSelectedTab(index)}
          />
          {selectedTab === 0 && (
            <div className={styles['tab-container']}>
              <div className={styles['describe-content']}>
                <h4>
                  Cualquier persona apasionada por la educación y con
                  experiencia comprobada en los campos elegidos puede postularse
                  para enseñar en OpenMind. A continuación se detalla el proceso
                  de solicitud y aprobación:
                  <ul>
                    <li>
                      Regístrate en OpenMind en la sección Enseñar o dando clic
                      en uno de los botones en esta página.
                    </li>
                    <li>
                      Envía tu solicitud de admisión incluyendo la documentación
                      requerida ademas de tu experiencia en educación y tu
                      formación académica.
                    </li>
                    <li>
                      Tu solicitud será sometida a un proceso de verificación de
                      antecedentes y verificación de identidad.
                    </li>
                  </ul>
                </h4>
              </div>
              <div className={styles['image-content']}>
                <img
                  alt=""
                  className={styles['image-one']}
                  src="../../../../assets/images/application.svg"
                />
              </div>
            </div>
          )}
          {selectedTab === 1 && (
            <div className={styles['tab-container']}>
              <div className={styles['describe-content']}>
                <h4>
                  Al usar OpenMind como profesor podrás crear tus propios cursos
                  y dar clases fácilmente a alumnos de todo el mundo. Para crear
                  un curso utiliza las herramientas que ofrece OpenMind, en
                  donde los temas que se impartirán quedaran a tu libre elección
                  con tu propio sello para la enseñanza, procura que los temas
                  impartidos en tu curso sean interesantes y llamativos para los
                  alumnos. Te recomendamos leer la siguiente sección <NavLink to={'/blog/how-create-a-class'}>
                    ¿Como crear una gran clase en OpenMind?
                  </NavLink>{' '}
                  para poder empezar.
                </h4>
              </div>
              <div className={styles['image-content']}>
                <img
                  alt=""
                  className={styles['image-one']}
                  src="../../../../assets/images/recording-video.svg"
                />
              </div>
            </div>
          )}
          {selectedTab === 2 && (
            <div className={styles['tab-container']}>
              <div className={styles['describe-content']}>
                <h4>
                  OpenMind promociona tus clases en su marketplace y los
                  docentes con las mejores calificaciones y resultados serán
                  promocionados aún más. Si tus clases tienen alta demanda,
                  podrás subir su costo, tener más alumnos y ganar más dinero.
                  Tus pagos no dependen de cumplir un cierto número de horas,
                  sino de validar que tus alumnos han cumplido sus objetivos
                  preestablecidos.
                  <br />
                  <strong>
                    Tus resultados dependen de la calidad de tu trabajo y nada
                    más.
                  </strong>
                </h4>
              </div>
              <div className={styles['image-content']}>
                <img
                  alt=""
                  className={styles['image-one']}
                  src="../../../../assets/images/publish-course.svg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <SectionInformation
        className={styles['section-content']}
        title={'Conviértete en profesor ahora'}
        imgUrl={'../../../../assets/images/bg_shape.svg'}
        description={
          '¡Únete a nosotros y empieza a generar ingresos sin problemas!'
        }
      >
        <div className={styles['btn']}>
          <Button
            title={'Registrarme Ahora'}
            onClick={() => setOpenModal(true)}
          />
        </div>
      </SectionInformation>
    </div>
  );
}

export default RegisterTeacher;

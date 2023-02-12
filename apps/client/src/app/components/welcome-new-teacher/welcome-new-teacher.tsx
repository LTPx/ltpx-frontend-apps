import { Button, Icon } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './welcome-new-teacher.module.scss';

/* eslint-disable-next-line */
export interface WelcomeNewTeacherProps {}

export function WelcomeNewTeacher(props: WelcomeNewTeacherProps) {
  return (
    <div className={styles['container']}>
      <h4>Realiza estos pasos para empezar a trabajar con Openmind</h4>
      <div className={styles['step']}>
        <div className={styles['step-icon']}>
          <Icon icon="file-alt" size={30} />
        </div>
        <div className={styles['step-content']}>
          <h4>Envía una solicitud para enseñar con nosotros </h4>
          <p>Por favor envíanos tu información para trabajar con nosotros</p>
          <Button title="Aplicar Ahora" link="/teacher/apply-teach" />
        </div>
      </div>
      <div className={styles['step']}>
        <div className={styles['step-icon']}>
          <Icon icon="user-circle" size={30} />
        </div>
        <div className={styles['step-content']}>
          <h4>Completa tu perfil de docente </h4>
          <ul>
            <li>
              Tu perfil de profesor te presenta a padres y alumnos debe
              utilizar un tono profesional.
            </li>
            <li>
              Tu perfil aparecerá en tus clases y servirá como tu página de maestro
              personal.
            </li>
            <li>
              Tener un gran perfil les dará a los padres más confianza para
              inscribirse en tus clases.
            </li>
          </ul>
          <NavLink to='/teacher/account'>
            Click aquí para actualizar tu perfil
          </NavLink>
        </div>
      </div>
      <div className={styles['step']}>
        <div className={styles['step-icon']}>
          <Icon icon="tools" size={30} />
        </div>
        <div className={styles['step-content']}>
          <h4>Crea y publica un curso</h4>
          <p>
            Crea tu primer curso, no te preocupes si no lo haces bien al primer
            intento nosotros te guiaremos en el proceso, una vez lo tengas lo
            debes enviar a revision para que nosotros lo validemos
          </p>
          <NavLink to='/teacher/courses/all'>
            Crear mi primer curso
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default WelcomeNewTeacher;

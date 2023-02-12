import { Button, Icon } from '@ltpx-frontend-apps/shared-ui';
import styles from './welcome-new-teacher.module.scss';

/* eslint-disable-next-line */
export interface WelcomeNewTeacherProps {}

export function WelcomeNewTeacher(props: WelcomeNewTeacherProps) {
  return (
    <div className={styles['container']}>
      <h4>Completa estos pasos para trabajar con Openmind</h4>
      <div className={styles['step']}>
        <div className={styles['step-icon']}>
          <Icon icon="file-alt" size={30} />
        </div>
        <div className={styles['step-content']}>
          <h3>Envía una solicitud para enseñar con nosotros </h3>
          <p>Por favor envíanos tu información para trabajar con nosotros</p>
          <Button title="Aplicar Ahora" link="/teacher/apply-teach" />
        </div>
      </div>
      <div className={styles['step']}>
        <div className={styles['step-icon']}>
          <Icon icon="user-circle" size={30} />
        </div>
        <div className={styles['step-content']}>
          <h3>Completa tu perfil de docente </h3>
          <p>
            Tu perfil de profesor te presenta a padres y alumnos debe utilizar
            un tono profesional. Aparecerá en tus clases y servirá como tu
            página de maestro personal. Tener un gran perfil les dará a los
            padres más confianza para inscribirse en tus clases. Tu video de
            perfil de maestro es una herramienta que puedes usar para
            promocionarte con los padres, mostrando tu profesionalismo y
            personalidad.
          </p>
          <Button title="Actualizar Ahora" />
        </div>
      </div>
      <div className={styles['step']}>
        <div className={styles['step-icon']}>
          <Icon icon="tools" size={30} />
        </div>
        <div className={styles['step-content']}>
          <h3>Crea y publica un curso</h3>
          <p>
            Crea tu primer curso, no te preocupes si no lo haces bien al primer
            intento nosotros te guiaremos en el proceso, una vez lo tengas lo
            debes enviar a revision para que nosotros lo validemos
          </p>
          <Button title="Crear curso" link="/teacher/courses/all" />
        </div>
      </div>
    </div>
  );
}

export default WelcomeNewTeacher;

import styles from './welcome-new-teacher.module.scss';
import { Button, ColorsTag, Icon, Tag } from '@ltpx-frontend-apps/shared-ui';
import { useTeacher, useUser } from '@ltpx-frontend-apps/store';
import { NavLink } from 'react-router-dom';
import { StatusTeacherAccount } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface WelcomeNewTeacherProps {}

export function WelcomeNewTeacher(props: WelcomeNewTeacherProps) {
  const { teacher_account, myCourses } = useTeacher();
  const { user } = useUser();

  return (
    <div className={styles['container']}>
      <h4 className={styles['title']}>
        Realiza estos pasos para empezar a enseñar
      </h4>
      <div className={` ${styles['step']} ${styles['with-tag']}`}>
        <div className={styles['step-content-wrapper']}>
          <div className={styles['step-icon']}>
            <Icon icon="file-alt" size={30} />
          </div>
          <div className={styles['step-content']}>
            <h4>Envía una solicitud </h4>
            <p>
              Por favor envíanos tu información y experiencia laboral para
              trabajar con nosotros
            </p>
            {teacher_account !== StatusTeacherAccount.approved && (
              <Button
                title={
                  teacher_account === StatusTeacherAccount.review ||
                  teacher_account === StatusTeacherAccount.rejected
                    ? 'Revisar Solicitud'
                    : 'Aplicar Ahora'
                }
                link="/teacher/apply-teach"
              />
            )}
          </div>
        </div>
        {teacher_account === StatusTeacherAccount.review && (
          <Tag text={'En revision'} color={ColorsTag.orange} />
        )}
        {teacher_account === StatusTeacherAccount.rejected && (
          <Tag text={'Requiere cambios'} color={ColorsTag.blue} />
        )}
        {teacher_account === StatusTeacherAccount.approved && (
          <Tag text={'Solicitud aceptada'} color={ColorsTag.green} />
        )}
      </div>
      <div className={`${styles['step']} ${styles['with-tag']}`}>
        <div className={styles['step-content-wrapper']}>
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
                Tu perfil aparecerá en tus clases y servirá como tu página de
                maestro personal.
              </li>
              <li>
                Tener un gran perfil les dará a los padres más confianza para
                inscribirse en tus clases.
              </li>
            </ul>
            {!user.teacher?.biography && (
              <NavLink to="/teacher/account/profile-edit">
                Click aquí para actualizar tu perfil
              </NavLink>
            )}
          </div>
        </div>
        {user.teacher?.biography && (
          <Tag text={'Completado'} color={ColorsTag.green} />
        )}
      </div>
      <div className={`${styles['step']} ${styles['with-tag']}`}>
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
          {user.teacher?.total_courses !== undefined &&
            user.teacher.total_courses === 0 && (
              <NavLink to="/teacher/courses/all">Crear mi primer curso</NavLink>
            )}
        </div>
        {user.teacher?.total_courses !== undefined &&
          user.teacher.total_courses > 0 && (
            <Tag text={'Completado'} color={ColorsTag.green} />
          )}
      </div>
    </div>
  );
}

export default WelcomeNewTeacher;

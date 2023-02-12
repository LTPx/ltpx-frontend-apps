import { StatusTeacherAccount } from '@ltpx-frontend-apps/api';
import {
  BannerNotification,
  Button,
  ColorsButton,
} from '@ltpx-frontend-apps/shared-ui';
import { useTeacher, useUser } from '@ltpx-frontend-apps/store';
import WelcomeNewTeacher from '../../../components/welcome-new-teacher/welcome-new-teacher';
import styles from './teacher-dashboard.module.scss';

/* eslint-disable-next-line */
export interface TeacherDashboardProps {}

export function TeacherDashboard(props: TeacherDashboardProps) {
  const { user } = useUser();
  const { teacher_account } = useTeacher();
  return (
    <div className={`${styles['container']}`}>
      {teacher_account === StatusTeacherAccount.review && (
        <BannerNotification>
          <p>
            Tu solicitud ha sido enviada, validaremos tus datos en un periodo
            máximo de 48h luego recibirás un correo con una respuesta de nuestro
            equipo
          </p>
        </BannerNotification>
      )}
      <h1>Bienvenido {user.fullname}</h1>
      <div className={styles['layout']}>
        <div className={styles['content']}>
          {user.teacher_account !== StatusTeacherAccount.approved && (
            <WelcomeNewTeacher />
          )}
        </div>
        <div className={styles['help-ads']}>
          <div className={styles['card-join-discord']}>
            <h2>Únete al grupo de discord</h2>
            <h4>Únete a nuestra comunidad de profesores donde podrás encontrar noticias, hacer preguntas acerca del proceso de enseñar en Openmind</h4>
            <Button title='Unirme' color={ColorsButton.white} full={true}/>
          </div>
          <div className={styles['card-teaching']}>
            <h2>Enseñar en Openmind</h2>
            <h4>Únete a nuestra comunidad de profesores donde podrás encontrar noticias, hacer preguntas acerca del proceso de enseñar en Openmind</h4>
            <Button title='Aprender Mas' color={ColorsButton.secondary} full={true}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;

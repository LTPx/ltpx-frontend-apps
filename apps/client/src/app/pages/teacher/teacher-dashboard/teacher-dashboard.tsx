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
  // const { teacher_account } = useTeacher();
  return (
    <div className={`${styles['container']}`}>
      {/* {teacher_account === StatusTeacherAccount.review && (
        <BannerNotification onClickClose={()=>{}}>
          <p>
            Tu solicitud ha sido enviada, validaremos tus datos en un periodo
            máximo de 48h luego recibirás un correo con una respuesta de nuestro
            equipo
          </p>
        </BannerNotification>
      )} */}
      <h1>Bienvenido {user.fullname}</h1>
      <div className={styles['layout']}>
        <div className={styles['content']}>
          {user.teacher_account !== StatusTeacherAccount.approved && (
            <WelcomeNewTeacher />
          )}
        </div>
        <div className={styles['help-ads']}>
          <div className={styles['card-join-discord']}>
            <img
              src="../../../../assets/images/discord-group.jpg"
              alt="discord-group"
            />
            <h2>Comunidad en discord</h2>
            <p>
              Únete a nuestra comunidad de profesores donde podrás encontrar
              noticias y hacer preguntas acerca del proceso de enseñar en
              Openmind
            </p>
            <a href="https://discord.gg/JU42n3fA" target={'_blank'}>
              <Button
                title="Unirme"
                color={ColorsButton.white}
                full={true}
              />
            </a>
          </div>
          <div className={styles['card-teaching']}>
            <h2>Enseñar en Openmind</h2>
            <p>
              Revisa nuestra blog donde encontraras todo la información de como funciona Openmind
            </p>
            <Button
              title="Aprender Mas"
              color={ColorsButton.secondary}
              full={true}
              link="/teacher/blog"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;

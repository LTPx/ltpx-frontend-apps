import { StatusTeacherAccount } from '@ltpx-frontend-apps/api';
import {
  BannerNotification,
  Button,
  ColorsButton,
  NoticeCard,
  UpcomingClass,
} from '@ltpx-frontend-apps/shared-ui';
import { useTeacher, useUser } from '@ltpx-frontend-apps/store';
import { NavLink } from 'react-router-dom';
import WelcomeNewTeacher from '../../components/welcome-new-teacher/welcome-new-teacher';
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
          {/* <div className={styles['classes']}>
            <div className={styles['head']}>
              <h3>Próxima Clase</h3>
              <NavLink to={'/teacher/sessions'}>
              <h5>Mostrar todas</h5>
              </NavLink>
            </div>
            <div className={styles['upcoming-classes']}>
              <UpcomingClass
                titleClass={'Aprende acerca del universo'}
                session={1}
                date={'Viernes, 27 de Julio'}
                time={'09:00 - 10:30 AM'}
                learners={5}
              />
            </div>
          </div> */}
          <NoticeCard
            className={styles['card-join-discord']}
            title={''}
            image={'../../../../assets/images/discord-group.jpg'}
            description={
              'Únete a nuestra comunidad de profesores en discord donde podrás encontrar noticias y hacer preguntas acerca del proceso de enseñar en OpenMind'
            }
          >
            <a href="https://discord.gg/aUNfs6BuTB" target={'_blank'}>
              <Button title="Unirme" color={ColorsButton.white} full={true} />
            </a>
          </NoticeCard>
          <NoticeCard
            className={styles['card-teaching']}
            title={'Enseñar en OpenMind'}
            description={
              'Revisa nuestra blog donde encontraras todo la información de como funciona OpenMind'
            }
          >
            <Button
              title="Aprender Mas"
              color={ColorsButton.secondary}
              full={true}
              link="/teacher/blog"
            />
          </NoticeCard>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
import { StatusTeacherAccount } from '@ltpx-frontend-apps/api';
import {
  BannerNotification,
  Button,
  ColorsButton,
} from '@ltpx-frontend-apps/shared-ui';
import { useTeacher, useUser } from '../../../store';
import styles from './teacher-dashboard.module.scss';

/* eslint-disable-next-line */
export interface TeacherDashboardProps {}

export function TeacherDashboard(props: TeacherDashboardProps) {
  const { user } = useUser();
  const { teacher_account } = useTeacher();
  return (
    <div className={`${styles['container']} card`}>
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
      {user.teacher_account !== StatusTeacherAccount.approved && (
        <>
          <p>
            Estás a solo unos pasos de enseñar. ¡Siga nuestra guía paso a paso
            para comenzar!
          </p>
          <h2>Aplicar para enseñar en Openmind?</h2>
          <h4>Llena esta solicitud para enseñar con nosotros</h4>
          <Button
            title={
              teacher_account === StatusTeacherAccount.review
                ? 'Revisar Solicitud'
                : 'Aplicar Ahora'
            }
            color={ColorsButton.secondary}
            link="/teacher/apply-teach"
          />
        </>
      )}
    </div>
  );
}

export default TeacherDashboard;

import { StatusTeacherAccount } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  NewCourseForm,
  NoticeCard,
  UpcomingClass,
} from '@ltpx-frontend-apps/shared-ui';
import { useTeacher, useUser } from '@ltpx-frontend-apps/store';
import WelcomeNewTeacher from '../../components/welcome-new-teacher/welcome-new-teacher';
import styles from './teacher-dashboard.module.scss';
import { Dialog } from 'evergreen-ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface TeacherDashboardProps {}

export function TeacherDashboard(props: TeacherDashboardProps) {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const { createCourse } = useTeacher();
  const navigate = useNavigate();

  const openNewCourse = () => {
    setOpenModal(true);
  };

  const saveNewCourse = async (newCourseParams: any) => {
    setOpenModal(false);
    const { success, data } = await createCourse(newCourseParams);
    const { id } = data;
    if (success) {
      navigate(`/teacher/courses/edit/${id}`);
    } else {
      console.log('error: ', data);
    }
  };
  return (
    <div className={`${styles['container']}`}>
      <div className={styles['layout']}>
        <div className={styles['content']}>
          <div className={styles['dashboard-content']}>
            <h1 className={styles['name-teacher']}>
              Bienvenido {user.fullname}!
            </h1>
            <h4 className={styles['text-dashboard']}>
              Al crear un curso, asegúrate de establecer objetivos claros y
              específicos, esto ayudará a tus alumnos a entender lo que se
              espera de ellos y a mantenerse enfocados y motivados a medida que
              avanzan en el curso.
            </h4>
            <div className={styles['btn-content']}>
              <Button
                title="Crear Curso"
                icon="plus"
                color={ColorsButton.secondary}
                onClick={() => {
                  openNewCourse();
                }}
              />
            </div>
          </div>
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
              link="/blog"
            />
          </NoticeCard>
          <Dialog
            isShown={openModal}
            hasFooter={false}
            hasHeader={false}
            onCloseComplete={() => setOpenModal(false)}
            width={'40vw'}
          >
            <NewCourseForm
              onSubmit={(data) => {
                saveNewCourse(data);
              }}
              onCancel={() => setOpenModal(false)}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;

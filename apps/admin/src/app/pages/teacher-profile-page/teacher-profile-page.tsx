import { Button, ColorsButton } from '@ltpx-frontend-apps/shared-ui';
import styles from './teacher-profile-page.module.scss';
import { Avatar } from 'evergreen-ui';

/* eslint-disable-next-line */
export interface TeacherProfilePageProps {}

export function TeacherProfilePage(props: TeacherProfilePageProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['wrap-content']}>
        <div className={styles['profile-image']}>
          <div className={styles['general-information']}>
            <Avatar name={'T N'} src={''} size={150} />
            <h3>{'Teacher Name'}</h3>
            <h4>{'Email'}</h4>
          </div>
        </div>
        <div className={styles['profile-information']}>
          <div className={styles['title-content']}>
            <h4 className={styles['title']}>Perfil de Profesor</h4>
          </div>
          <div className={styles['information-teacher']}>
            <div className={styles['info']}>
              <div className={styles['item']}>
                <h4>Nombre de profesor: </h4>
                <div className={styles['text']}>
                  {/* <NavLink to={`/teacher/web-profile/${profile.slug}`}>
                    {profile.teacher_name}
                  </NavLink> */}
                </div>
              </div>
              <div className={styles['item']}>
                <h4>Habilidades: </h4>
                <h4 className={styles['text']}>a</h4>
              </div>
            </div>
          </div>
          <div className={styles['title-content']}>
                <h4 className={styles['title']}>Sobre mi</h4>
              </div>
              <p className={styles['biography']}>lorem imput</p>
              <div className={styles['title-content']}>
                <h4 className={styles['title']}>Video de Presentación</h4>
              </div>
              <div className={styles['video-content']}>
                <video width="100%" height="300" src={''} controls></video>
              </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfilePage;

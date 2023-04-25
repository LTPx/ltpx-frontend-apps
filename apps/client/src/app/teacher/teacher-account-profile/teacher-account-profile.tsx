import { Button, ColorsButton } from '@ltpx-frontend-apps/shared-ui';
import { useTeacher, useUser } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import styles from './teacher-account-profile.module.scss';

/* eslint-disable-next-line */
export interface TeacherAccountProfileProps {}

export function TeacherAccountProfile(props: TeacherAccountProfileProps) {
  const { profile, getProfile } = useTeacher();
  const { user } = useUser();

  const fetchProfile = useCallback(async () => {
    const { success, data, error } = await getProfile();
    console.log('data: ', data);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className={styles['container']}>
      {profile.teacher_name && (
        <>
          <div className={styles['title-content']}>
            <h4 className={styles['title']}>Perfil de Profesor</h4>
            <Button
              className={styles['btn-edit']}
              title="Editar"
              color={ColorsButton.secondary}
              link="/teacher/account/profile-edit"
            />
          </div>
          <div className={styles['information-teacher']}>
            <div className={styles['info']}>
              <div className={styles['item']}>
                <h4>Nombre de profesor: </h4>
                <h4 className={styles['text']}>{profile.teacher_name}</h4>
              </div>
              <div className={styles['item']}>
                <h4>Habilidades: </h4>
                <h4 className={styles['text']}>{profile.skills}</h4>
              </div>
              <div className={styles['item']}>
                <h4>Correo Electrónico: </h4>
                <h4 className={styles['text']}>{user.email}</h4>
              </div>
            </div>
          </div>
          <div className={styles['title-content']}>
            <h4 className={styles['title']}>Sobre mi</h4>
            <Button
              className={styles['btn-edit']}
              title="Editar"
              color={ColorsButton.secondary}
              link="/teacher/account/profile-edit"
            />
          </div>
          <p className={styles['biography']}>{profile.biography} </p>
        </>
      )}
    </div>
  );
}

export default TeacherAccountProfile;

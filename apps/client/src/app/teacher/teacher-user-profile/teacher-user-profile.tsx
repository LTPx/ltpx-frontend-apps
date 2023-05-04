import { useUser } from '@ltpx-frontend-apps/store';
import styles from './teacher-user-profile.module.scss';
import { Button, ColorsButton } from '@ltpx-frontend-apps/shared-ui';

/* eslint-disable-next-line */
export interface TeacherUserProfileProps {}

export function TeacherUserProfile(props: TeacherUserProfileProps) {
  const { user } = useUser();
  return (
    <div className={styles['container']}>
      {user && (
        <>
          <div className={styles['title-content']}>
            <h4 className={styles['title']}>Perfil de Usuario</h4>
            <Button
              className={styles['btn-edit']}
              title="Editar"
              color={ColorsButton.secondary}
              link="/teacher/account/user-edit"
            />
          </div>
          <div className={styles['information-user']}>
            <div className={styles['info']}>
              <div className={styles['item']}>
                <h4>Nombre de Usuario: </h4>
                <h4 className={styles['text']}>{user.fullname}</h4>
              </div>
              <div className={styles['item']}>
                <h4>Correo Electrónico: </h4>
                <h4 className={styles['text']}>{user.email}</h4>
              </div>
              <div className={styles['item']}>
                <h4>Dirección: </h4>
                <h4 className={styles['text']}>{user.address}</h4>
              </div>
              <div className={styles['item']}>
                <h4>Teléfono: </h4>
                <h4 className={styles['text']}>{user.phone}</h4>
              </div>
              <div className={styles['item']}>
                <h4>País: </h4>
                <h4 className={styles['text']}>{user.country}</h4>
              </div>
              <div className={styles['item']}>
                <h4>Ciudad: </h4>
                <h4 className={styles['text']}>{user.city}</h4>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TeacherUserProfile;

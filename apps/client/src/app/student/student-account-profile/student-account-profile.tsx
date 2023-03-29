import { Icon } from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import styles from './student-account-profile.module.scss';

/* eslint-disable-next-line */
export interface StudentAccountProfileProps {}

export function StudentAccountProfile(props: StudentAccountProfileProps) {
  const { user } = useUser();
  return (
    <div className={styles['profile-container']}>
      <div className={styles['about-student']}>
        <div className={styles['title']}>
          <Icon icon={'pencil-square'} size={20}></Icon>
          <h3>Información General</h3>
        </div>
          <div className={styles['info']}>
            <div className={styles['row']}>
              <div className={styles['item']}>
                <h4>Nombre: </h4>
                <h4 className={styles['text']}>{user.fullname}</h4>
              </div>
              <div className={styles['item']}>
                <h4>Correo Electrónico: </h4>
                <h4 className={styles['text']}>{user.email}</h4>
              </div>
            </div>
            <div className={styles['row']}>
              <div className={styles['item']}>
                <h4>Teléfono: </h4>
                <h4 className={styles['text']}>+593 90611840</h4>
              </div>
              <div className={styles['item']}>
                <h4>Dirección: </h4>
                <h4 className={styles['text']}>Av. Gobernación de Mainas</h4>
              </div>
            </div>
            <div className={styles['row']}>
              <div className={styles['item']}>
                <h4>País: </h4>
                <h4 className={styles['text']}>Ecuador</h4>
              </div>
              <div className={styles['item']}>
                <h4>Ciudad: </h4>
                <h4 className={styles['text']}>Loja</h4>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAccountProfile;

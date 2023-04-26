import { Button, ColorsButton } from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import styles from './student-account-profile.module.scss';

export function StudentAccountProfile() {
  const { user } = useUser();
  return (
    <div className={styles['profile-container']}>
      <div className={styles['title-content']}>
        <h4 className={styles['title']}>Cuenta de Usuario</h4>
        <Button
          className={styles['btn-edit']}
          title="Editar"
          color={ColorsButton.secondary}
          outline={true}
          link="/student/account/account-edit"
        />
      </div>
      <div className={styles['information-student']}>
        <div className={styles['info']}>
          <div className={styles['item']}>
            <h4>Nombre: </h4>
            <h4 className={styles['text']}>{user.fullname}</h4>
          </div>
          <div className={styles['item']}>
            <h4>Correo Electrónico: </h4>
            <h4 className={styles['text']}>{user.email}</h4>
          </div>
          <div className={styles['item']}>
            <h4>Teléfono: </h4>
            <h4 className={styles['text']}>{user.phone}</h4>
          </div>
          <div className={styles['item']}>
            <h4>Dirección: </h4>
            <h4 className={styles['text']}>{user.address}</h4>
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
    </div>
  );
}

export default StudentAccountProfile;

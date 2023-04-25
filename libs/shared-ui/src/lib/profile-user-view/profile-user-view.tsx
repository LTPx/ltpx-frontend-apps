import Avatar from '../avatar/avatar';
import { AvatarSize } from '../avatar/avatar';
import styles from './profile-user-view.module.scss';

/* eslint-disable-next-line */
export interface ProfileUserViewProps {
  userId: number;
}

export function ProfileUserView(props: ProfileUserViewProps) {
  const { userId } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['head']}>
        <Avatar
          image="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGVhY2hlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          size={AvatarSize.large}
          outline={true}
        />
      </div>
      <div className={styles['information']}>
        <div className={styles['info']}>
          <div className={styles['item']}>
            <h4>Nombre de Usuario: </h4>
            <h4 className={styles['text']}>Angel Capa</h4>
          </div>
          <div className={styles['item']}>
            <h4>Tipo de Usuario: </h4>
            <h4 className={styles['text']}>Profesor</h4>
          </div>
          <div className={styles['item']}>
            <h4>Correo Electrónico: </h4>
            <h4 className={styles['text']}>example@gmail.com</h4>
          </div>
          <div className={styles['item']}>
            <h4>Teléfono: </h4>
            <h4 className={styles['text']}>0995733032</h4>
          </div>
          <div className={styles['item']}>
            <h4>Cuenta </h4>
            <h4 className={styles['text']}>usuario</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUserView;

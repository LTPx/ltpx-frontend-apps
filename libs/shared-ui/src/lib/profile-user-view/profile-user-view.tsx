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
        <div>
        <Avatar
          image="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGVhY2hlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          size={AvatarSize.large}
          outline={true}
        />
        </div>
        <div className={styles['head-information']}>
          <h4 className={styles['name']}>Angel Capa</h4>
          <h4 className={styles['text']}>Profesor</h4>
          <h4 className={styles['text']}>example@gmail.com</h4>
        </div>
      </div>
      <div className={styles['information']}>
        <div className={styles['info']}>
          <div className={styles['item']}>
            <h4>Fecha de Registro </h4>
            <h4 className={styles['text']}>usuario</h4>
          </div>
          <div className={styles['item']}>
            <h4>País: </h4>
            <h4 className={styles['text']}>Ecuador</h4>
          </div>
          <div className={styles['item']}>
            <h4>Ciudad: </h4>
            <h4 className={styles['text']}>Loja</h4>
          </div>
          <div className={styles['item']}>
            <h4>Dirección: </h4>
            <h4 className={styles['text']}>Av. Gobernacion de Mainas</h4>
          </div>
          <div className={styles['item']}>
            <h4>Teléfono: </h4>
            <h4 className={styles['text']}>0995733032</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUserView;

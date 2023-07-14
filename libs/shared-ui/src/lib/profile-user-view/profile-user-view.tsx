import { UserModel } from '@ltpx-frontend-apps/api';
import { AvatarSize } from '../avatar/avatar';
import styles from './profile-user-view.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useAdmin } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ProfileUserViewProps {
  userId: number;
}

export function ProfileUserView(props: ProfileUserViewProps) {
  const { userId } = props;
  const { _getUser } = useAdmin();
  const [users, setUsers] = useState<UserModel>();

  const fetchUsers = useCallback(async () => {
    const { success, data, error } = await _getUser(userId);
    if (success) {
      setUsers(data);
    } else {
      console.log('error: ', error);
    }
    console.log('resp....: ', data);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className={styles['container']}>
      <div className={styles['head']}>
        <div>
          {/* <Avatar
            image="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGVhY2hlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            size={AvatarSize.large}
            outline={true}
          /> */}
          <Avatar name={users?.fullname} size={80} />
        </div>
        <div className={styles['head-information']}>
          <h3 className={styles['name']}>{users?.fullname}</h3>
          <h4 className={styles['text']}>{users?.initial_register}</h4>
          <h4 className={styles['text']}>{users?.email}</h4>
        </div>
      </div>
      <div className={styles['information']}>
        <div className={styles['info']}>
          <div className={styles['item']}>
            <h4>Fecha de Registro </h4>
            <h4 className={styles['text']}>
              {moment(users?.created_at).format('D MMMM YYYY')}
            </h4>
          </div>
          <div className={styles['item']}>
            <h4>País: </h4>
            <h4 className={styles['text']}>{users?.country}</h4>
          </div>
          <div className={styles['item']}>
            <h4>Ciudad: </h4>
            <h4 className={styles['text']}>{users?.city}</h4>
          </div>
          <div className={styles['item']}>
            <h4>Dirección: </h4>
            <h4 className={styles['text']}>{users?.address}</h4>
          </div>
          <div className={styles['item']}>
            <h4>Teléfono: </h4>
            <h4 className={styles['text']}>{users?.phone}</h4>
          </div>
        </div>
        <NavLink to={`/admin/teacher/${userId}`}>
          <h4>Ir a perfil de Profesor</h4>
        </NavLink>
      </div>
    </div>
  );
}

export default ProfileUserView;

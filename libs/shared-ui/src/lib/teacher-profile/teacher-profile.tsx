import Avatar, { AvatarSize } from '../avatar/avatar';
import Icon from '../icon/icon';
import styles from './teacher-profile.module.scss';

/* eslint-disable-next-line */
export interface TeacherProfileProps {
  img: string;
  nameTeacher: string;
  profession: string;
  biography: string;
}

export function TeacherProfile(props: TeacherProfileProps) {
  const { img, nameTeacher, profession, biography } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>
        <div className={styles['head-profile']}>
          <Avatar image={img} size={AvatarSize.large} outline={true} />
          <h1>{nameTeacher}</h1>
          <h3>{profession}</h3>
        </div>
        <div className={styles['social-networks']}>
          <Icon className={styles['icon']} icon={'facebook'} size={25} />
          <Icon className={styles['icon']} icon={'twitter'} size={25} />
          <Icon className={styles['icon']} icon={'instagram'} size={25} />
        </div>
      </div>
      <div className={styles['information']}>
        <div className={styles['information-wrap']}>
          <div className={styles['information-content']}>
            <h2>Sobre mi</h2>
            <p>{biography}</p>
          </div>
          <div className={styles['news']}></div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;

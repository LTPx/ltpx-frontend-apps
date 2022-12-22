import Avatar, { AvatarSize } from '../avatar/avatar';
import Icon from '../icon/icon';
import styles from './teacher-overview.module.scss';

/* eslint-disable-next-line */
export interface TeacherOverviewProps {
  name: string;
  image: string;
  profession: string;
  rating: number;
  reviews: number;
  students: number;
  courses: number;
  bibliography: string;
}

export function TeacherOverview(props: TeacherOverviewProps) {
  const {
    name,
    profession,
    rating,
    reviews,
    students,
    courses,
    image,
    bibliography
  } = props;
  return (
    <div className={styles['container']}>
      <label className={styles['title']}>About the teacher</label>
      <div className={styles['teacher-photo-container']}>
        <Avatar image={image}
        size ={AvatarSize.large}></Avatar>
        <div className={styles['information-photo-container']}>
          <label className={styles['name-teacher']}>{name}</label>
          <label className={styles['profession-teacher']}>{profession}</label>
        </div>
      </div>
      <div className={styles['teacher-review-information']}>
        <div className={styles['review-information']}>
          <Icon className={styles['icon']} icon={'star'} size={18}></Icon>
          <label>{rating}</label>
          <label>teacher rating</label>
        </div>
        <div className={styles['review-information']}>
          <Icon className={styles['icon']} icon={'chat-dots'} size={18}></Icon>
          <label>{reviews}</label>
          <label>reviews</label>
        </div>
        <div className={styles['review-information']}>
          <Icon className={styles['icon']} icon={'user-group'} size={18}></Icon>
          <label>{students}</label>
          <label>students</label>
        </div>
        <div className={styles['review-information']}>
          <Icon className={styles['icon']} icon={'store'} size={18}></Icon>
          <label>{courses}</label>
          <label>courses</label>
        </div>
      </div>
      <div className={styles['teacher-information-container']}>
        <p>{bibliography}</p>
      </div>
    </div>
  );
}

export default TeacherOverview;

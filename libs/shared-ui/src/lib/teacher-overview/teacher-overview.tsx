import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
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
  biography: string;
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
    biography,
  } = props;
  const { t } = useTranslation();
  return (
    <div className={styles['container']}>
      <h3>{t('coursesDetails.teacherOverview.title')}</h3>
      <div className={styles['teacher-photo-container']}>
        <NavLink to="/teacher-profile">
          <Avatar image={image} size={AvatarSize.large} />
        </NavLink>
        <div className={styles['information-photo-container']}>
          <h4>{name}</h4>
          <h3 className={styles['profession-teacher']}>{profession}</h3>
        </div>
      </div>
      <div className={styles['teacher-review-information']}>
        <div className={styles['review-information']}>
          <Icon className={styles['icon']} icon={'star'} size={18}></Icon>
          <h4>{rating}</h4>
          <h4>{t('coursesDetails.teacherOverview.teacherRating')}</h4>
        </div>
        <div className={styles['review-information']}>
          <Icon className={styles['icon']} icon={'chat-dots'} size={18}></Icon>
          <h4>{reviews}</h4>
          <h4>{t('coursesDetails.teacherOverview.reviews')}</h4>
        </div>
        <div className={styles['review-information']}>
          <Icon className={styles['icon']} icon={'user-group'} size={18}></Icon>
          <h4>{students}</h4>
          <h4>{t('coursesDetails.teacherOverview.students')}</h4>
        </div>
        <div className={styles['review-information']}>
          <Icon className={styles['icon']} icon={'store'} size={18}></Icon>
          <h4>{courses}</h4>
          <h4>{t('coursesDetails.teacherOverview.courses')}</h4>
        </div>
      </div>
      <div className={styles['teacher-information-container']}>
        <p>{biography}</p>
      </div>
    </div>
  );
}

export default TeacherOverview;

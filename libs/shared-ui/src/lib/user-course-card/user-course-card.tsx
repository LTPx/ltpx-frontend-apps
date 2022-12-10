import ProgressBar from '../progress-bar/progress-bar';
import styles from './user-course-card.module.scss';

/* eslint-disable-next-line */
export interface UserCourseCardProps {
  image: string;
  startDate: string;
  title: string;
  progress: number;
}

export function UserCourseCard(props: UserCourseCardProps) {
  const {image, startDate, title, progress} = props;
  return (
    <div className={styles['container']}>
      <img src={image} alt="" />
      <div className={styles['content']}>
        <span className={styles['date']}>
          Started {startDate}
        </span>
        <h3 className={styles['title']}>{title}</h3>
        <ProgressBar text='Completed' percentage={40}/>
      </div>
    </div>
  );
}

export default UserCourseCard;

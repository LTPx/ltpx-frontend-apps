import { NavLink } from 'react-router-dom';
import ProgressBar from '../progress-bar/progress-bar';
import styles from './user-course-card.module.scss';
import { useMoment } from '../../hooks/useMoment';

/* eslint-disable-next-line */
export interface UserCourseCardProps {
  id?: string;
  image: string;
  startDate: string;
  title: string;
  progress: number;
  url: string;
}

export function UserCourseCard(props: UserCourseCardProps) {
  const { image, startDate, title, progress, url } = props;
  const { customFormatDate } = useMoment();
  return (
    <div className={styles['container']}>
      <NavLink to={url}>
        <div className={styles['warp-content']}>
          <div className={styles['head']}>
            <img src={image} alt="" />
          </div>
          <div className={styles['content']}>
            <h4 className={styles['date']}>
              Te subscribiste: {customFormatDate(startDate,'MMM D YYYY')}
            </h4>
            <h3 className={styles['title']}>{title}</h3>
            <ProgressBar text="Completado" percentage={progress} />
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default UserCourseCard;

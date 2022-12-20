import ProgressBar from '../progress-bar/progress-bar';
import Rating from '../rating/rating';
import styles from './rating-course.module.scss';

/* eslint-disable-next-line */
export interface RatingCourseProps {}

export function RatingCourse(props: RatingCourseProps) {
  return (
    <div className={styles['container']}>
      {/* <div className={styles['total-rating']}>
      </div> */}
      <div className={styles['rating-bar']}>
        <ProgressBar percentage={60} className={styles['bar']}/>
        <Rating stars={3}></Rating>
      </div>
      <div className={styles['rating-bar']}>
        <ProgressBar percentage={60} className={styles['bar']} />
        <Rating stars={3}></Rating>
      </div>
    </div>
  );
}

export default RatingCourse;

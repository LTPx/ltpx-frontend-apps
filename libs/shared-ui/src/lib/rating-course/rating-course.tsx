import ProgressBar from '../progress-bar/progress-bar';
import Rating from '../rating/rating';
import styles from './rating-course.module.scss';

/* eslint-disable-next-line */
export interface RatingCourseProps {
  ratings: Array<RatingOption>;
}

export interface RatingOption {
  starsNumber: number;
  reviewersNumber: number;
}

export function RatingCourse(props: RatingCourseProps) {
  const { ratings } = props;

  const calculateScore = () => {
    let totalStars = 0;
    let totalReviewers = 0;
    ratings.forEach((rating) => {
      totalReviewers = totalReviewers + rating.reviewersNumber;
      totalStars = totalStars + rating.reviewersNumber * rating.starsNumber;
    });
    const result = totalStars / totalReviewers;
    return result;
  };

  const roundStars = (starsNumber: number) => {
    return Math.round(starsNumber);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['total-rating']}>
        <label className={styles['score']}>{calculateScore().toFixed(2)}</label>
        <label>Course rating</label>
        <Rating stars={roundStars(calculateScore())}></Rating>
      </div>
      <div className={styles['rating-content']}>
        {ratings.map((rating, index) => (
          <div className={styles['rating-bar']} key={index}>
            <ProgressBar
              percentage={100}
              className={styles['bar']}
              withoutText={true}
            />
            <Rating
              stars={rating.starsNumber}
              text={rating.reviewersNumber.toString()}
            ></Rating>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingCourse;

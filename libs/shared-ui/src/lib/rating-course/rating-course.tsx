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

  const totalStars = () => {
    let total = 0;
    ratings.forEach((rating) => {
      total = total + rating.reviewersNumber * rating.starsNumber;
    });
    return total;
  };

  const roundStars = (starsNumber: number) => {
    return Math.round(starsNumber);
  };

  const buildOptions = () => {
    const stars = totalStars();
    return ratings.map((rating) => {
      return {
        percentage: (rating.starsNumber * rating.reviewersNumber * 100) / stars,
        starts: rating.starsNumber,
        text: rating.reviewersNumber.toString(),
      };
    });
  };

  const options = buildOptions();

  return (
    <div className={styles['container']}>
      <div className={styles['total-rating']}>
        <label className={styles['score']}>{calculateScore().toFixed(2)}</label>
        <label>Course rating</label>
        <Rating stars={roundStars(calculateScore())}></Rating>
      </div>
      <div className={styles['rating-content']}>
        {options.map((option, index) => (
          <div className={styles['rating-bar']} key={index}>
            <ProgressBar
              percentage={option.percentage}
              className={styles['bar']}
              withoutText={true}
            />
            <Rating stars={option.starts} text={option.text}></Rating>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingCourse;

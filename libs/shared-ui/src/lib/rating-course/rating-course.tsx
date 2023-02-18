import { useTranslation } from 'react-i18next';
import ProgressBar from '../progress-bar/progress-bar';
import Rating from '../rating/rating';
import styles from './rating-course.module.scss';

/* eslint-disable-next-line */
export interface RatingCourseProps {
  ratings: Array<RatingOption>;
}

export interface RatingOption {
  stars: number;
  reviewers: number;
}

export function RatingCourse(props: RatingCourseProps) {
  const { ratings } = props;

  const calculateScore = () => {
    let totalStars = 0;
    let totalReviewers = 0;
    ratings.forEach((rating) => {
      totalReviewers = totalReviewers + rating.reviewers;
      totalStars = totalStars + rating.reviewers * rating.stars;
    });
    const result = totalStars / totalReviewers;
    return result;
  };

  const totalStars = () => {
    let total = 0;
    ratings.forEach((rating) => {
      total = total + rating.reviewers * rating.stars;
    });
    return total;
  };

  const roundStars = (stars: number) => {
    return Math.round(stars);
  };

  const buildOptions = () => {
    const total = totalStars();
    return ratings.map((rating) => {
      return {
        percentage: (rating.stars * rating.reviewers * 100) / total,
        starts: rating.stars,
        text: rating.reviewers.toString(),
      };
    });
  };

  const options = buildOptions();
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <h3>{t('coursesDetails.ratingCourse.title')}</h3>
      <div className={styles['content']}>
        <div className={styles['total-rating']}>
          <h1>{calculateScore().toFixed(2)}</h1>
          <h4>{t('coursesDetails.ratingCourse.ratingCourse')}</h4>
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
    </div>
  );
}

export default RatingCourse;

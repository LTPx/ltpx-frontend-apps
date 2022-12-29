import Avatar, { AvatarSize } from '../avatar/avatar';
import Rating from '../rating/rating';
import styles from './comment-course.module.scss';

/* eslint-disable-next-line */
export interface CommentCourseProps {
  reviewTitle: string;
  name: string;
  comment: string;
  date: string;
  image: string;
}

export function CommentCourse(props: CommentCourseProps) {
  const { reviewTitle, name, comment, date, image } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['avatar-content']}>
        <Avatar image={image} size={AvatarSize.medium}></Avatar>
      </div>
      <div className={styles['comment-content']}>
        <div className={styles['head']}>
          <h3>{name}</h3>
          <Rating stars={5}></Rating>
        </div>
        <div className={styles['review-title']}>
          <h4>{reviewTitle}</h4>
          <h4>{date}</h4>
        </div>
        <div className={styles['comment']}>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentCourse;

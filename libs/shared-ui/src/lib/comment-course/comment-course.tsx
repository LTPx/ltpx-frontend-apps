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
          <label>{name}</label>
          <Rating stars={5}></Rating>
        </div>
        <div className={styles['review-title']}>
          <label>{reviewTitle}</label>
          <label>{date}</label>
        </div>
        <div className={styles['comment']}>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentCourse;

import Button from '../button/button';
import Icon from '../icon/icon';
import Rating from '../rating/rating';
import styles from './course-cart-item.module.scss';

/* eslint-disable-next-line */
export interface CourseCartItemProps {
  id: number;
  cover?: string;
  category: string;
  title: string;
  price: number;
  duration?: number;
  lessons?: number;
  stars?: number;
  children?: any;
  onClickRemove?: any;
}

export function CourseCartItem(props: CourseCartItemProps) {
  const {
    id,
    cover,
    category,
    title,
    price,
    duration,
    lessons,
    stars,
    children,
    onClickRemove
  } = props;

  const totalStarts = stars || 0;

  return (
    <div className={styles['container']}>
      <div className={styles['card-item']}>
        <img src={cover} alt="course-item" />
        <div className={styles['content']}>
          <span className={styles['category']}>
            {category}
          </span>
          <h3 className={styles['title']}>{title}</h3>
          <div className={styles['stars-rating']}>
            <Rating stars={totalStarts} />
          </div>
          <div className={styles['info']}>
            <div className={styles['info-item']}>
              <Icon icon={'university'} size={15} />
              {lessons} lessons
            </div>
            <div className={styles['info-item']}>
              <Icon icon={'clock'} size={15} />
              {duration} min
            </div>
          </div>
        </div>
      </div>
      <div className={styles['price-actions']}>
        <div className={styles['actions']}>
          <Button
            title='Remove'
            onClick={() => {onClickRemove(id)}}
            outline={true}
          />
          {/* <Button
            title='♥ Add to Favorites'
            onClick={onClickRemove}
            outline={true}
          /> */}
          {children}
        </div>
        <div className={styles['price']}>
          <h3>${price}</h3>
        </div>
      </div>
    </div>
  );
}

export default CourseCartItem;

import Icon from '../icon/icon';
import styles from './course-cart-item.module.scss';

/* eslint-disable-next-line */
export interface CourseCartItemProps {
  image?: string;
  category: string;
  title: string;
  price: number;
  duration?: number;
  lessons?: number;
  stars?: number;
  children?: any;
}

export function CourseCartItem(props: CourseCartItemProps) {
  const {
    image,
    category,
    title,
    price,
    duration,
    lessons,
    stars,
    children
  } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['card-item']}>
        <img src={image} alt="course-item" />
        <div className={styles['content']}>
          <span className={styles['category']}>
            {category}
          </span>
          <h3 className={styles['title']}>{title}</h3>
          <div className="stars">
            {Array.from(Array(stars).keys()).map((number, index)=>(
              <Icon key={index} icon={'star'} size={15} color='#eab308'/>
            ))}
            {Array.from(Array(5 - (stars || 0)).keys()).map((number, index)=>(
              <Icon icon={'star'} size={15} color='#888888'/>
            ))}
          </div>
          <div className={styles['info']}>
            <div className={styles['info-item']}>
              <Icon icon={'university'} size={15}/>
              {lessons} lessons
            </div>
            <div className={styles['info-item']}>
              <Icon icon={'clock'} size={15}/>
              {duration} min
            </div>
          </div>
        </div>
      </div>
      <div className={styles['price-actions']}>
        <div className={styles['actions']}>
          <h4>Remove</h4>
          <h4>Add to favorites</h4>
          {children}
        </div>
        <div className={styles['price']}>
          <h4>${price}</h4>
        </div>
      </div>
    </div>
  );
}

export default CourseCartItem;

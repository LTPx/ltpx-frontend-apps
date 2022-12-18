import Icon from '../icon/icon';
import styles from './course-card.module.scss';

/* eslint-disable-next-line */
export interface CourseCardProps {
  image?: string;
  category: string;
  title: string;
  price: number;
  duration?: number;
  lessons?: number;
  stars?: number;
}

export function CourseCard(props: CourseCardProps) {
  const {
    image,
    category,
    title,
    price,
    duration,
    lessons,
    stars
  } = props;

  return (
    <div className={styles['container']}>
      <img src={image} alt="" />
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
          <div className={styles['info-item']}></div>
          ${price}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;

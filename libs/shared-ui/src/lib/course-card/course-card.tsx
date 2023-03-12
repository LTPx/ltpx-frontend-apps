import { useCourseUtil } from '@ltpx-frontend-apps/store';
import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import styles from './course-card.module.scss';

/* eslint-disable-next-line */
export interface CourseCardProps {
  image?: string;
  category: string;
  title: string;
  price: string;
  duration?: number;
  achievements?: number;
  stars?: number;
  link?: string;
}

export function CourseCard(props: CourseCardProps) {
  const { image, category, title, price, duration, achievements, stars, link } =
    props;
  const { translateCategory } = useCourseUtil();

  const Card = () => (
    <div className={styles['container']}>
      <img loading="lazy" src={image} alt="" />
      <div className={styles['content']}>
        <span className={styles['category']}>
          {translateCategory(category)}
        </span>
        <h4 className={styles['title']}>{title}</h4>
        <div className="stars">
          {Array.from(Array(stars).keys()).map((number, index) => (
            <Icon key={index} icon={'star'} size={15} color="#eab308" />
          ))}
          {Array.from(Array(5 - (stars || 0)).keys()).map((number, index) => (
            <Icon key={index} icon={'star'} size={15} color="#888888" />
          ))}
        </div>
        <div className={styles['info']}>
          <div className={styles['info-item']}>
            <Icon icon={'trophy'} size={15} />
            {achievements} logros
          </div>
          {/* <div className={styles['info-item']}>
            <Icon icon={'clock'} size={15} />
            {duration} min
          </div> */}
          <div className={styles['price']}>
            {price}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles['container-wrapper']}>
      {link ? (
        <NavLink to={link}>
          <Card />
        </NavLink>
      ) : (
        <Card />
      )}
    </div>
  );
}

export default CourseCard;

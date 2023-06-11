import { useCourseUtil } from '@ltpx-frontend-apps/store';
import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import Tag, { ColorsTag } from '../tag/tag';
import styles from './course-row-card.module.scss';

/* eslint-disable-next-line */
export interface CourseRowCardProps {
  image?: string;
  category: string;
  title: string;
  price: string;
  language?: string;
  description?: string;
  achievements?: number;
  stars?: number;
  link?: string;
}

export function CourseRowCard(props: CourseRowCardProps) {
  const {
    image,
    category,
    title,
    description,
    price,
    language,
    achievements,
    stars,
    link,
  } = props;
  const { translateCategory, translateLanguage } = useCourseUtil();
  const Card = () => (
    <div className={styles['container']}>
      <div className={styles['image']}>
        <img src={image} />
      </div>
      <div className={styles['description-course']}>
        <div className={styles['header']}>
          <Tag
            className={styles['tag']}
            text={translateCategory(category)}
            color={ColorsTag.green}
          />
          <div className={styles['item']}>
            <Icon icon={'trophy'} size={14} color={'#fbbf24'}></Icon>{' '}
            {achievements}{' '}
            {achievements === 1 ? <h5>Logro</h5> : <h5>Logros</h5>}
          </div>
          <div className={styles['item']}>
            <Icon icon={'text-size'} size={14}></Icon>
            <h5>{translateLanguage(language || '')}</h5>
          </div>
        </div>
        <h3 className={styles['title']}>{title}</h3>
        {/* <div className="stars">
          {Array.from(Array(stars).keys()).map((number, index) => (
            <Icon key={index} icon={'star'} size={15} color="#eab308" />
          ))}
          {Array.from(Array(5 - (stars || 0)).keys()).map((number, index) => (
            <Icon key={index} icon={'star'} size={15} color="#888888" />
          ))}
        </div> */}
        {description && (
          <div>
            {description.length > 200 ? (
              <p className={styles['description']}>
                {description ? `${description.substring(0, 200)}...` : ''}
              </p>
            ) : (
              <p className={styles['description']}>{description}</p>
            )}
          </div>
        )}
        <div className={styles['price']}>
          <h3 className={styles['text-price']}>{price}</h3>
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

export default CourseRowCard;

import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import styles from './news-card.module.scss';

/* eslint-disable-next-line */
export interface NewsCardProps {
  image: string;
  name: string;
  date: string;
  title: string;
  link?: string;
}

export function NewsCard(props: NewsCardProps) {
  const { image, name, date, title, link } = props;

  const Card = () => (
    <div className={styles['container']}>
    <img
      className={styles['image']}
      src={image}
      alt="img-news"
      loading="lazy"
    />
    {/* <div className={styles['description']}>
      <div className={styles['item']}>
        <Icon icon={'user'} size={20} color={'#77838f'} />
        <h4>{name}</h4>
      </div>
      <div className={styles['item']}>
        <Icon icon={'calendar'} size={20} color={'#77838f'} />
        <h4>{date}</h4>
      </div>
    </div> */}
    <h3>{title}</h3>
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

export default NewsCard;

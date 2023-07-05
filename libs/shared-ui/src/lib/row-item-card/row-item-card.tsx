import Icon from '../icon/icon';
import styles from './row-item-card.module.scss';

/* eslint-disable-next-line */
export interface RowItemCardProps {
  image?: string;
  title: string;
  date: string;
  time: string;
  icon?: string;
}

export function RowItemCard(props: RowItemCardProps) {
  const { image, title, date, time, icon } = props;
  return (
    <div className={styles['rows']}>
      <div className={styles['content-achievement']}>
        {image && <img className={styles['img-achievement']} src={image} />}
        {icon && (
          <Icon className={`${styles['icon']}`} icon={icon} size={20}></Icon>
        )}
        <div className={styles['item']}>
          <h4 className={styles['title']}>Titulo</h4>
          <h4 className={styles['text']}>{title}</h4>
        </div>
      </div>
      <div className={styles['item']}>
        <h4 className={styles['title']}>Fecha</h4>
        <h4 className={styles['text']}>{date}</h4>
      </div>
      <div className={styles['item']}>
        <h4 className={styles['title']}>Tiempo</h4>
        <h4 className={styles['text']}>{time}</h4>
      </div>
    </div>
  );
}

export default RowItemCard;

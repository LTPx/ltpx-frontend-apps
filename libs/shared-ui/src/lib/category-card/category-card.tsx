import Icon from '../icon/icon';
import styles from './category-card.module.scss';

/* eslint-disable-next-line */
export interface CategoryCardProps {
  icon: string;
  title?: string;
  description?: string;
}

export function CategoryCard(props: CategoryCardProps) {
  const {
    icon,
    title,
    description
  } = props;
  return (
    <div className={styles['container']}>
      <Icon icon={icon} size={50} />
      <h1 className={styles['title']}>
          {title}
      </h1>
      <h2 className={styles['description']}>
        {description}
      </h2>
    </div>
  );
}

export default CategoryCard;

import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import styles from './category-card.module.scss';

/* eslint-disable-next-line */
export interface CategoryCardProps {
  id?: number;
  icon: string;
  title?: string;
  description?: string;
  link?: string;
}

export function CategoryCard(props: CategoryCardProps) {
  const { id, icon, title, description, link } = props;

  const Card = () => (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <img alt="cloud" src="../../../../assets/images/cloud.svg"></img>
        <Icon className={styles['icon']} icon={icon} size={50} />
      </div>
      <h4 className={styles['title']}>{title}</h4>
      <h5 className={styles['description']}>{description}</h5>
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

export default CategoryCard;

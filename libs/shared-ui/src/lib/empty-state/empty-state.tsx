import { ReactElement } from 'react';
import Icon from '../icon/icon';
import styles from './empty-state.module.scss';

/* eslint-disable-next-line */
export interface EmptyStateProps {
  img?: string;
  title?: string;
  description?: string;
  children?: ReactElement;
  classNameImage?: string;
  className?: string;
  icon?: string;
}

export function EmptyState(props: EmptyStateProps) {
  const { img, title, description, children, classNameImage, className, icon } =
    props;
  return (
    <div className={styles['container']}>
      <div className={`${styles['content']} ${className}`}>
        {icon && (
          <div className={styles['icon-content']}>
            <Icon className={styles['icon']} icon={icon} size={60} />
            <img
              className={styles['image-icon']}
              src="../../../../assets/images/bg-empty-state.svg"
            />
          </div>
        )}
        {img && (
          <img className={`${styles['image']} ${classNameImage}`} src={img} />
        )}
        <h3 className={styles['title']}>{title}</h3>
        <p className={styles['description']}>{description}</p>
        {children}
      </div>
    </div>
  );
}

export default EmptyState;

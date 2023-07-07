import { Position, Tooltip } from 'evergreen-ui';
import styles from './achievement-badge.module.scss';

/* eslint-disable-next-line */
export interface AchievementBadgeProps {
  title?: string;
  image: string;
}

export function AchievementBadge(props: AchievementBadgeProps) {
  const { title, image } = props;
  return (
    <div className={styles['achievement']}>
      <div className={styles['header']}>
        <img
          className={styles['img-background']}
          alt="cloud"
          src="../../../../assets/images/circle.png"
        ></img>
        <img className={styles['img-achievement']} src={image} />
      </div>
      <Tooltip content={title} position={Position.TOP}>
        {title && (
          <div>
            {title.length > 30 ? (
              <p className={styles['description']}>
                {title ? `${title.substring(0, 30)}...` : ''}
              </p>
            ) : (
              <p className={styles['description']}>{title}</p>
            )}
          </div>
        )}
      </Tooltip>
    </div>
  );
}

export default AchievementBadge;

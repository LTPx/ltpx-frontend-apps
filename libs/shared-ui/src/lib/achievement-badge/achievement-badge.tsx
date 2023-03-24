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
      <img src={image}/>
      <h4>{title}</h4>
    </div>
  );
}

export default AchievementBadge;

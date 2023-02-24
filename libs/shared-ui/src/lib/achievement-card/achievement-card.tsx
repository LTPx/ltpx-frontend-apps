import styles from './achievement-card.module.scss';

/* eslint-disable-next-line */
export interface AchievementCardProps {
  image: string;
  text: string;
  reached?: boolean;
}

export function AchievementCard(props: AchievementCardProps) {
  const { image, text, reached } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['achievement']}>
        <img src={image}/>
        <div className={styles['describe']}>
          <h3>{text}</h3>
          <h4>Nuevo Logro!</h4>
        </div>
      </div>
    </div>
  );
}

export default AchievementCard;

import Icon from '../icon/icon';
import ProgressBar from '../progress-bar/progress-bar';
import styles from './achievement-card.module.scss';

/* eslint-disable-next-line */
export interface AchievementCardProps {
  image : string;
  describe : string;
}

export function AchievementCard(props: AchievementCardProps) {
  const {
    image,
    describe
  } = props;
  return (
    <div className={styles['container']}>
      <h3>Badges</h3>
      <div className={styles['achievement']}>
        <img src={image}></img>
        <div className={styles['describe']}>
          <h4>Level</h4>
          <p>{describe}</p>
        </div>
      </div>
      <div className={styles['progress']}>
        <ProgressBar percentage={50}></ProgressBar>
        <Icon icon={''}></Icon>
      </div>
    </div>
  );
}

export default AchievementCard;

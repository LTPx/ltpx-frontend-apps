import { AchievementParamsUi } from '@ltpx-frontend-apps/api';
import Icon from '../icon/icon';
import styles from './achievements-list.module.scss';

/* eslint-disable-next-line */
export interface AchievementsListProps {
  achievements: AchievementParamsUi[];
}

export function AchievementsList(props: AchievementsListProps) {
  const { achievements } = props;
  return (
    <div className={styles['achievements']}>
      {achievements?.map((achievement, index) => (
        <div key={index}>
          <div className={styles['achievement']}>
            <div className={styles['summary']}>
              <img src={achievement.image} />
              <div className={styles['text']}>
                <h4>{achievement.title}</h4>
                <h5>{achievement.rule}</h5>
              </div>
            </div>
            <div className={styles['actions']}>
              <div className={styles['action']}>
                <h5>Precio: ${achievement.price}</h5>
              </div>
            </div>
          </div>
          <div className={styles['settings']}>
            {achievement.settings?.map((setting, index) => (
              <div className={styles['setting']} key={index}>
                <div className="s">Test: {setting.text}</div>
                <div className="s">Puntaje necesario: 100/{setting.score} pts</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AchievementsList;

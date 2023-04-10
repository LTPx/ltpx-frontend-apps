import { AchievementModel } from '@ltpx-frontend-apps/api';
import { useCourseUtil } from '@ltpx-frontend-apps/store';
import styles from './achievements-list.module.scss';

/* eslint-disable-next-line */
export interface AchievementsListProps {
  achievements: AchievementModel[];
}

export function AchievementsList(props: AchievementsListProps) {
  const { achievements } = props;
  const { translateAchievementType } = useCourseUtil();
  return (
    <div className={styles['achievements']}>
      {achievements?.map((achievement, index) => (
        <div key={index}>
          <div className={styles['achievement']}>
            <div className={styles['summary']}>
              <div className={styles['image']}>
                <img src={achievement.image} />
              </div>
              <div className={styles['text']}>
                <h4>{achievement.title}</h4>
                <h5>
                  El alumno debe: {translateAchievementType(achievement.rule)}
                </h5>
                {achievement.conditions_attributes.map((a) => (
                  <ul>
                    <li>{a.description}</li>
                  </ul>
                ))}
              </div>
            </div>
            <div className={styles['actions']}>
              <div className={styles['action']}>
                <h5>Precio: ${achievement.price}</h5>
              </div>
            </div>
          </div>
          <div className={styles['settings']}>
            {/* {achievement.settings?.map((setting, index) => (
              <div className={styles['setting']} key={index}>
                <div className="s">Test: {setting.text}</div>
                <div className="s">Puntaje necesario: {setting.score}/100 pts</div>
              </div>
            ))} */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AchievementsList;

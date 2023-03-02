import {
  AchievementParamsUi
} from '@ltpx-frontend-apps/api';
import { useCourseUtil } from '@ltpx-frontend-apps/store';
import { NavLink } from 'react-router-dom';
import styles from './achievement-details-card.module.scss';

/* eslint-disable-next-line */
export interface AchievementDetailsCardProps {
  achievements: AchievementParamsUi[];
  courseId?: number;
}

export function AchievementDetailsCard(props: AchievementDetailsCardProps) {
  const { achievements, courseId } = props;
  const { translateAchievementType } = useCourseUtil();

  return (
    <div className={styles['container']}>
      {achievements?.map((achievement, index) => (
        <div className={styles['content']} key={index}>
          <div className={styles['achievement-content']}>
            <img src={achievement.image} />
            <div className={styles['achievement']}>
              <h4 className={styles['title-achievement']}>
                {achievement.title}
              </h4>
              <h4 className={styles['text']}>
                Se debe: {translateAchievementType(achievement.rule)}
              </h4>
              <div className={styles['test']}>
                {achievement.settings.map((test, index) => (
                  <NavLink className={styles['link-quiz']} to={`/student/course/${courseId}/quiz/${test.entity_id}`}>
                    <h5 key={index} className={styles['quiz']}>
                      {test.text}
                    </h5>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className={styles['score-content']}>
            <h4>Progreso</h4>
            <h4 className={styles['score-color']}> {0} / 100 </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AchievementDetailsCard;

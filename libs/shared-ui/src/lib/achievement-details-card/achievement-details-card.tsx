import { TypeAchievement } from '@ltpx-frontend-apps/api';
import { useCourseUtil } from '@ltpx-frontend-apps/store';
import { NavLink } from 'react-router-dom';
import styles from './achievement-details-card.module.scss';

/* eslint-disable-next-line */
export interface AchievementDetailsCardProps {
  title: string;
  imageUrl: string;
  rule: TypeAchievement;
  currentPoints: number;
  totalPoints: number;
  quizzes: {
    name: string;
    url: string
  }[]
}

export function AchievementDetailsCard(props: AchievementDetailsCardProps) {
  const { title, imageUrl, currentPoints, totalPoints, quizzes, rule } = props;
  const { translateAchievementType } = useCourseUtil();

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['achievement-content']}>
          <img src={imageUrl} />
          <div className={styles['achievement']}>
            <h4 className={styles['title-achievement']}>
              {title}
            </h4>
            <h4 className={styles['text']}>
              {translateAchievementType(rule)}
            </h4>
            <div className={styles['test']}>
              {quizzes.map((quiz, index) => (
                <NavLink key={index}
                  className={styles['link-quiz']}
                  to={quiz.url}>
                  <h5 className={styles['quiz']}>
                    {quiz.name}
                  </h5>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className={styles['score-content']}>
          <h4>Progreso</h4>
          <h4 className={styles['score-color']}> {currentPoints} / {totalPoints} </h4>
        </div>
      </div>
    </div>
  );
}

export default AchievementDetailsCard;

import { TypeAchievement } from '@ltpx-frontend-apps/api';
import { useCourseUtil } from '@ltpx-frontend-apps/store';
import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import styles from './achievement-details-card.module.scss';

export enum AchievementType {
  Quiz = 'quiz',
  Task = 'task',
}

interface Quiz {
  type: AchievementType.Quiz;
  name: string;
  url: string;
  completed: boolean;
  points?: number;
}

interface Task {
  type: AchievementType.Task;
  name: string;
  completed: boolean;
  points?: number;
  onClick?: () => void;
}

export type Achievement = Quiz | Task;

/* eslint-disable-next-line */
export interface AchievementDetailsCardProps {
  title: string;
  imageUrl: string;
  rule: TypeAchievement;
  currentPoints: number;
  totalPoints: number;
  achievement: {
    type: AchievementType;
    data: Achievement[];
  }[];
}

export function AchievementDetailsCard(props: AchievementDetailsCardProps) {
  const { title, imageUrl, currentPoints, totalPoints, achievement, rule } =
    props;
  const { translateAchievementType } = useCourseUtil();

  return (
    <div className={styles['content']}>
      <div className={styles['achievement-content']}>
        <img
          className={`${
            currentPoints === totalPoints ? styles['completed'] : styles['img']
          }`}
          src={imageUrl}
        />
        <div className={styles['achievement']}>
          <h4 className={styles['title-achievement']}>{title}</h4>
          <h4 className={styles['text']}>{translateAchievementType(rule)}</h4>
          <div className={styles['test']}>
            {achievement.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {category.data.map((item, index) => (
                  <div key={index}>
                    {item.type === AchievementType.Quiz ? (
                      item.completed ? (
                        <div className={styles['link-quiz']}>
                          <h5 className={styles['quiz-completed']}>
                            <Icon icon="check" color="#fff" size={14} />{' '}
                            {item.name}
                          </h5>
                        </div>
                      ) : (
                        <NavLink
                          key={index}
                          className={styles['link-quiz']}
                          to={item.url}
                        >
                          <h5 className={styles['quiz']}>{item.name}</h5>
                          <h5 className={styles['quiz-points']}>
                            {rule === TypeAchievement.score &&
                              `${item.points} pts`}
                          </h5>
                        </NavLink>
                      )
                    ) : item.completed ? (
                      <div className={styles['link-quiz']}>
                        <h5 className={styles['quiz-completed']}>
                          <Icon icon="check" color="#fff" size={14} />{' '}
                          {item.name}
                        </h5>
                      </div>
                    ) : (
                      <h5 className={styles['quiz']} onClick={item.onClick}>
                        {item.name}
                      </h5>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles['score-content']}>
        <h4>Progreso</h4>
        <div className={styles['score-color']}>
          {currentPoints} / <strong>{totalPoints}</strong>
        </div>
      </div>
    </div>
  );
}

export default AchievementDetailsCard;

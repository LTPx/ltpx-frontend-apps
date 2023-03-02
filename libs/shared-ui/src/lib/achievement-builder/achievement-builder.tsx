import AchievementByQuizzesForm from '../achievement-by-quizzes-form/achievement-by-quizzes-form';
import AchievementByScoreForm from '../achievement-by-score-form/achievement-by-score-form';
import AchievementTaskForm from '../achievement-task-form/achievement-task-form';
import styles from './achievement-builder.module.scss';
import {
  QuizModel,
  TypeAchievement,
  AchievementParams,
} from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface AchievementBuilderProps {
  quizzes: QuizModel[];
  typeAchievement?: TypeAchievement;
  achievement?: AchievementParams;
  onSubmit: (achievement: AchievementParams) => void;
  onCancel?: () => void;
}

export function AchievementBuilder(props: AchievementBuilderProps) {
  const { onSubmit, onCancel, quizzes, typeAchievement, achievement } = props;
  return (
    <div className={styles['container']}>
      {typeAchievement && (
        <div className={styles['achievement-form']}>
          {typeAchievement === TypeAchievement.multiple && (
            <AchievementByQuizzesForm
              achievement={achievement}
              quizzes={quizzes}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          )}
          {typeAchievement === TypeAchievement.single && (
            <AchievementByQuizzesForm
              achievement={achievement}
              singleSelection={true}
              quizzes={quizzes}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          )}
          {typeAchievement === TypeAchievement.score && (
            <AchievementByScoreForm
              achievement={achievement}
              quizzes={quizzes}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          )}
          {typeAchievement === TypeAchievement.task && (
            <AchievementTaskForm
              achievement={achievement}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default AchievementBuilder;

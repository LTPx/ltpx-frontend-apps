import AchievementByQuizzesForm from '../achievement-by-quizzes-form/achievement-by-quizzes-form';
import AchievementByScoreForm from '../achievement-by-score-form/achievement-by-score-form';
import AchievementTaskForm from '../achievement-task-form/achievement-task-form';
import styles from './achievement-builder.module.scss';
import {
  QuizModel,
  TypeAchievement,
  NewAchievementParams,
  EditAchievementParams,
} from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface AchievementBuilderProps {
  quizzes: QuizModel[];
  typeAchievement?: TypeAchievement;
  achievement?: EditAchievementParams;
  onSubmit: (achievement: NewAchievementParams | EditAchievementParams) => void;
  onCancel?: () => void;
}

export function AchievementBuilder(props: AchievementBuilderProps) {
  const { onSubmit, onCancel, quizzes, typeAchievement, achievement } = props;

  const saveNewAchievement = (achievementForm: any) => {
    // onSubmit({...achievementForm, ...{id: achievement?.id}});
  };
  console.log('achievement: ', achievement);

  return (
    <div className={styles['container']}>
      {typeAchievement && (
        <div className={styles['achievement-form']}>
          {typeAchievement === TypeAchievement.multiple && (
            <AchievementByQuizzesForm
              achievement={achievement}
              quizzes={quizzes}
              onSubmit={(data) => {
                saveNewAchievement(data);
              }}
              onCancel={onCancel}
            />
          )}
          {typeAchievement === TypeAchievement.single && (
            <AchievementByQuizzesForm
              achievement={achievement}
              singleSelection={true}
              quizzes={quizzes}
              onSubmit={(data) => {
                saveNewAchievement(data);
              }}
              onCancel={onCancel}
            />
          )}
          {typeAchievement === TypeAchievement.score && (
            <AchievementByScoreForm
              achievement={achievement}
              quizzes={quizzes}
              onSubmit={(data) => {
                saveNewAchievement(data);
              }}
              onCancel={onCancel}
            />
          )}
          {typeAchievement === TypeAchievement.task && (
            <AchievementTaskForm
              achievement={achievement}
              onSubmit={(data) => {
                console.log('data: ', data);
                // saveNewAchievement(data);
              }}
              onCancel={onCancel}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default AchievementBuilder;

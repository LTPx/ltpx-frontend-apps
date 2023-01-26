import { useState } from 'react';
import { Dialog } from 'evergreen-ui';
import AchievementByQuizzesForm from '../achievement-by-quizzes--form/achievement-by-quizzes--form';
import AchievementByScoreForm from '../achievement-by-score-form/achievement-by-score-form';
import AchievementTaskForm from '../achievement-task-form/achievement-task-form';
import Button, { ColorsButton } from '../button/button';
import styles from './achievement-builder.module.scss';
import { AchievementModel, NewAchievementParams, QuizModel, TypeAchievement } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface AchievementBuilderProps {
  onSubmit?: (achievement: NewAchievementParams) => void;
  quizzes: QuizModel[];
}

export function AchievementBuilder(props: AchievementBuilderProps) {
  const { onSubmit, quizzes } = props;
  const [achievementSelected, setAchievementSelected] =
    useState<TypeAchievement | null>();

  const achievementsForms = [
    {
      kind: TypeAchievement.multiple,
      text: 'Aprobar varios tests',
    },
    {
      kind: TypeAchievement.single,
      text: 'Aprobar un test',
    },
    {
      kind: TypeAchievement.score,
      text: 'Obtener una calificación',
    },
    {
      kind: TypeAchievement.task,
      text: 'Cumplir una tarea',
    },
  ];

  const saveNewAchievement = async(achievement: NewAchievementParams) => {
    onSubmit && onSubmit(achievement);
  }

  return (
    <div className={styles['container']}>
      <label>Asignar logro por:</label>
      <div className={styles['achievements']}>
        {achievementsForms.map((form, index) => (
          <div
            className={styles['achievement']}
            key={index}
            onClick={() => setAchievementSelected(form.kind)}
          >
            <h4>{form.text}</h4>
          </div>
        ))}
      </div>
      <div className={styles['achievement-form']}>
        {achievementSelected === TypeAchievement.multiple && (
          <AchievementByQuizzesForm
            quizzes={quizzes}
            onSubmit={(data) => {
              saveNewAchievement(data);
            }}
          />
        )}
        {achievementSelected === TypeAchievement.single && (
          <AchievementByQuizzesForm
            singleSelection={true}
            quizzes={quizzes}
            onSubmit={() => {
            }}
          />
        )}
        {achievementSelected === TypeAchievement.score && (
          <AchievementByScoreForm
            quizzes={quizzes}
            onSubmit={(data) => {
              saveNewAchievement(data);
            }}
          />
        )}
        {achievementSelected === TypeAchievement.task && (
          <AchievementTaskForm
            onSubmit={(data) => {
              saveNewAchievement(data);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AchievementBuilder;

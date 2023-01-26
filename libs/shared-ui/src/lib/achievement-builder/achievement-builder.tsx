import { useState } from 'react';
import AchievementByQuizzesForm from '../achievement-by-quizzes--form/achievement-by-quizzes--form';
import AchievementByScoreForm from '../achievement-by-score-form/achievement-by-score-form';
import AchievementTaskForm from '../achievement-task-form/achievement-task-form';
import Button, { ColorsButton } from '../button/button';
import styles from './achievement-builder.module.scss';
import {
  NewAchievementParams,
  QuizModel,
  TypeAchievement,
} from '@ltpx-frontend-apps/api';
import Dropdown from '../dropdown/dropdown';
import Icon from '../icon/icon';

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

  const saveNewAchievement = async (achievement: NewAchievementParams) => {
    onSubmit && onSubmit(achievement);
  };

  return (
    <div className={styles['container']}>
      {!achievementSelected && (
        <div className={styles['control-questions']}>
          <label>Crear logro por:</label>
          <Dropdown>
            <div className={styles['select-questions']}>
              <h4>Tipo de logro</h4>
              <Icon icon="caret-down" size={18} />
            </div>
            <div className={`${styles['menu']} card`}>
              {achievementsForms.map((form, index) => (
                <div
                  className={styles['menu-option']}
                  key={index}
                  onClick={() => {
                    setAchievementSelected(form.kind);
                  }}
                >
                  <h4>{form.text}</h4>
                </div>
              ))}
            </div>
          </Dropdown>
        </div>
      )}
      {achievementSelected && (
        <div className={styles['achievement-form']}>
          {achievementSelected === TypeAchievement.multiple && (
            <AchievementByQuizzesForm
              quizzes={quizzes}
              onSubmit={(data) => {
                saveNewAchievement(data);
              }}
              onCancel={() => {
                setAchievementSelected(null);
              }}
            />
          )}
          {achievementSelected === TypeAchievement.single && (
            <AchievementByQuizzesForm
              singleSelection={true}
              quizzes={quizzes}
              onSubmit={(data) => {
                saveNewAchievement(data);
              }}
              onCancel={() => {
                setAchievementSelected(null);
              }}
            />
          )}
          {achievementSelected === TypeAchievement.score && (
            <AchievementByScoreForm
              quizzes={quizzes}
              onSubmit={(data) => {
                saveNewAchievement(data);
              }}
              onCancel={() => {
                setAchievementSelected(null);
              }}
            />
          )}
          {achievementSelected === TypeAchievement.task && (
            <AchievementTaskForm
              onSubmit={(data) => {
                saveNewAchievement(data);
              }}
              onCancel={() => {
                setAchievementSelected(null);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default AchievementBuilder;

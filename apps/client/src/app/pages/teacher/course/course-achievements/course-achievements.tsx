import styles from './course-achievements.module.scss';
import { AchievementParams, TypeAchievement } from '@ltpx-frontend-apps/api';
import {
  AchievementBuilder,
  Button,
  ColorsButton,
  Icon,
  Menu,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse } from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResponseRequest } from '../../teacher-edit-course/teacher-edit-course';

/* eslint-disable-next-line */
export interface CourseAchievementsProps {
  onSubmit?: (data: ResponseRequest) => void;
}

export function CourseAchievements(props: CourseAchievementsProps) {
  const { onSubmit } = props;
  const [achievement, setAchievement] = useState<AchievementParams>();
  const [selectedType, setSelectedType] = useState<TypeAchievement>();
  const { addNewAchievement, removeAchievement, updateAchievement, course } =
    useCourse();
  const { achievements, quizzes } = course;
  const { t } = useTranslation();

  const achievementsForms = [
    {
      onClick: () => {
        setSelectedType(TypeAchievement.multiple);
      },
      text: 'Cuando el alumno apruebe varios tests',
    },
    {
      onClick: () => {
        setSelectedType(TypeAchievement.single);
      },
      text: 'Cuando el alumno apruebe un test',
    },
    {
      onClick: () => {
        setSelectedType(TypeAchievement.score);
      },
      text: 'Por calificación',
    },
    {
      onClick: () => {
        setSelectedType(TypeAchievement.task);
      },
      text: 'Al cumplir una tarea',
    },
  ];

  const handleSaveAchievement = async (achievement: AchievementParams) => {
    console.log('handleSaveAchievement: ', achievement);
    try {
      const { data } = achievement
        ? await updateAchievement(achievement, 1)
        : await addNewAchievement(achievement);
      onSubmit &&
        onSubmit({
          success: true,
          data: data,
        });
      setSelectedType(undefined);
    } catch (error) {
      onSubmit &&
        onSubmit({
          success: false,
          error: error,
        });
    }
  };

  const handleRemoveAchievement = async (id: number) => {
    try {
      const { data } = await removeAchievement(id);
      onSubmit &&
        onSubmit({
          success: true,
          data: data,
        });
    } catch (error) {
      onSubmit &&
        onSubmit({
          success: false,
          error: error,
        });
    }
  };
  const ButtonAddAchievement = ({
    color,
    className,
    title,
  }: {
    color: ColorsButton;
    className?: string;
    title: string;
  }) => (
    <div className={className}>
      <Menu items={achievementsForms}>
        <Button color={color} title={title} />
      </Menu>
    </div>
  );

  return (
    <div className="achievements-section">
      <div className={styles['header-text']}>
        <h2>{t('courseAchievements.title')}</h2>
        <h4 className="muted">{t('courseAchievements.subtitle')}</h4>
      </div>
      {!selectedType && (
        <div className={styles['achievements']}>
          {achievements?.map((achievement, index) => (
            <div className={styles['achievement']} key={index}>
              <div className={styles['summary']}>
                <img src={achievement.image} />
                <div className={styles['text']}>
                  <h4>{achievement.title}</h4>
                  <h5>Precio: ${achievement.price}</h5>
                </div>
              </div>
              <div className={styles['actions']}>
                <div
                  className={styles['action']}
                  onClick={() => {
                    setAchievement({
                      ...achievement,
                      ...{
                        condition_quizzes_attributes:
                          achievement.condition_quizzes,
                        condition_tasks_attributes: achievement.condition_tasks,
                      },
                    });
                    setSelectedType(achievement.rule);
                  }}
                >
                  <Icon icon="pencil" size={15} />
                </div>
                <div
                  className={styles['action']}
                  onClick={() => {
                    handleRemoveAchievement(achievement.id);
                  }}
                >
                  <Icon icon="trash" size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!selectedType && achievements && achievements.length === 0 && (
        <SetupCard
          onClick={() => {
            setSelectedType(TypeAchievement.multiple);
          }}
          icon={'trophy'}
          text={t('courseAchievements.text')}
        >
          <ButtonAddAchievement
            color={ColorsButton.primary}
            title={t('buttons.addAchievement')}
          />
        </SetupCard>
      )}
      {!selectedType && achievements && achievements.length > 0 && (
        <ButtonAddAchievement
          color={ColorsButton.secondary}
          className={styles['add-button']}
          title={t('buttons.addNewAchievement')}
        />
      )}
      {selectedType && selectedType && (
        <AchievementBuilder
          quizzes={quizzes || []}
          type={selectedType}
          achievement={achievement}
          onSubmit={(achievement) => {
            handleSaveAchievement(achievement);
          }}
          onCancel={() => {
            setSelectedType(undefined);
            setAchievement(undefined);
          }}
        />
      )}
    </div>
  );
}

export default CourseAchievements;

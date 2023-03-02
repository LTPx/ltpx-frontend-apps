import {
  AchievementParams,
  TypeAchievement,
} from '@ltpx-frontend-apps/api';
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
import styles from './course-achievements.module.scss';

/* eslint-disable-next-line */
export interface CourseAchievementsProps {
  onSubmit?: (data: ResponseRequest) => void;
}

export function CourseAchievements(props: CourseAchievementsProps) {
  const { onSubmit } = props;
  const [achievementEdit, setAchievementEdit] =
    useState<AchievementParams>();
  const [showAchievementType, setShowAchievementType] =
    useState<TypeAchievement | null>();
  const { addNewAchievement, removeAchievement, updateAchievement, course } =
    useCourse();
  const { achievements, quizzes } = course;
  const { t } = useTranslation();

  const achievementsForms = [
    {
      onClick: () => {
        setShowAchievementType(TypeAchievement.multiple);
      },
      text: 'Cuando el alumno apruebe varios tests',
    },
    {
      onClick: () => {
        setShowAchievementType(TypeAchievement.single);
      },
      text: 'Cuando el alumno apruebe un test',
    },
    {
      onClick: () => {
        setShowAchievementType(TypeAchievement.score);
      },
      text: 'Por calificación',
    },
    {
      onClick: () => {
        setShowAchievementType(TypeAchievement.task);
      },
      text: 'Al cumplir una tarea',
    },
  ];

  const handleSaveAchievement = async (
    achievement: AchievementParams
  ) => {
    console.log('handleSaveAchievement: ', achievement);
    // try {
    //   const { data } = achievement.id
    //     ? await updateAchievement({ ...achievement, ...{ id: achievement.id } })
    //     : await addNewAchievement(achievement);
    //   onSubmit &&
    //     onSubmit({
    //       success: true,
    //       data: data,
    //     });
    //   setShowAchievementType(null);
    // } catch (error) {
    //   onSubmit &&
    //     onSubmit({
    //       success: false,
    //       error: error,
    //     });
    // }
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
    <div className={styles['achievement-btn']}>
      <Menu items={achievementsForms}>
        <Button title={'Agregar Logro'} />
      </Menu>
    </div>
  );

  return (
    <div className="achievements-section">
      <div className={styles['header-text']}>
        <h2>{t('courseAchievements.title')}</h2>
        <h4 className="muted">{t('courseAchievements.subtitle')}</h4>
      </div>
      {!showAchievementType && (
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
                    setAchievementEdit({
                      ...achievement,
                      ...{
                        condition_quizzes_attributes: achievement.condition_quizzes,
                        condition_tasks_attributes: achievement.condition_tasks
                      }
                    });
                    setShowAchievementType(achievement.rule);
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
      {!showAchievementType && achievements && achievements.length === 0 && (
        <SetupCard
          onClick={() => {
            setShowAchievementType(TypeAchievement.multiple);
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
      {!showAchievementType && achievements && achievements.length > 0 && (
        <ButtonAddAchievement
          color={ColorsButton.secondary}
          className={styles['add-button']}
          title={t('buttons.addNewAchievement')}
        />
      )}
      {showAchievementType && showAchievementType && (
        <AchievementBuilder
          quizzes={quizzes || []}
          type={showAchievementType}
          achievement={achievementEdit}
          onSubmit={(achievement) => {
            handleSaveAchievement(achievement);
          }}
          onCancel={() => {
            setShowAchievementType(null);
            setAchievementEdit(undefined);
          }}
        />
      )}
    </div>
  );
}

export default CourseAchievements;

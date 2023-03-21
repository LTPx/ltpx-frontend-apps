import styles from './course-achievements.module.scss';
import {
  AchievementModel,
  AchievementParams,
  TypeAchievement,
} from '@ltpx-frontend-apps/api';
import {
  AchievementBuilder,
  BasicRow,
  Button,
  ColorsButton,
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
  const [achievement, setAchievement] = useState<AchievementModel>();
  const [selectedType, setSelectedType] = useState<TypeAchievement>();
  const { _addAchievement, _removeAchievement, _updateAchievement, course } =
    useCourse();
  const { achievements, quizzes } = course;
  const { t } = useTranslation();

  const achievementsForms = [
    {
      onClick: () => {
        setSelectedType(TypeAchievement.multiple);
      },
      text: 'Al aprobar uno o varios tests',
    },
    // {
    //   onClick: () => {
    //     setSelectedType(TypeAchievement.single);
    //   },
    //   text: 'Cuando el alumno apruebe un test',
    // },
    // {
    //   onClick: () => {
    //     setSelectedType(TypeAchievement.score);
    //   },
    //   text: 'Por calificación',
    // },
    {
      onClick: () => {
        setSelectedType(TypeAchievement.task);
      },
      text: 'Al cumplir una tarea',
    },
  ];

  const handleSaveAchievement = async (params: AchievementParams) => {
    console.log('handleSaveAchievement: ', params);
    try {
      const { data } = achievement
        ? await _updateAchievement(params, achievement.id)
        : await _addAchievement(params);
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
      const { data } = await _removeAchievement(id);
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
    outline,
  }: {
    color: ColorsButton;
    className?: string;
    title: string;
    outline?: boolean;
  }) => (
    <div className={className}>
      <Menu items={achievementsForms}>
        <Button outline={outline} color={color} title={title} />
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
            <BasicRow
              key={index}
              image={achievement.image}
              title={achievement.title}
              subtitle={'Precio: ' + achievement.price}
              remove={() => {
                handleRemoveAchievement(achievement.id);
              }}
              onClick={() => {
                setAchievement({
                  ...achievement,
                  ...{},
                });
                setSelectedType(achievement.rule);
              }}
            />
          ))}
        </div>
      )}
      {!selectedType && achievements && achievements.length === 0 && (
        <SetupCard
          onClick={() => {
            setSelectedType(TypeAchievement.multiple);
          }}
          icon={'trophy-outline'}
          text={t('courseAchievements.text')}
        >
          <ButtonAddAchievement
            color={ColorsButton.primary}
            title={t('buttons.addAchievement')}
          />
        </SetupCard>
      )}
      {!selectedType && achievements && achievements.length > 0 && (
        <div className={styles['button-content']}>
          <ButtonAddAchievement
            color={ColorsButton.secondary}
            className={styles['add-button']}
            title={t('buttons._addAchievement')}
            outline={true}
          />
        </div>
      )}
      {selectedType && selectedType && (
        <AchievementBuilder
          quizzes={quizzes || []}
          type={selectedType}
          achievement={
            achievement
              ? {
                  ...achievement,
                }
              : undefined
          }
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

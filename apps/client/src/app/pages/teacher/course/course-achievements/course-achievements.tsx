import {
  AchievementModel,
  AchievementParamsUi,
  TypeAchievement,
} from '@ltpx-frontend-apps/api';
import {
  AchievementBuilder,
  Button,
  ColorsButton,
  Dropdown,
  Icon,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse } from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import { ResponseRequest } from '../../teacher-edit-course/teacher-edit-course';
import styles from './course-achievements.module.scss';

/* eslint-disable-next-line */
export interface CourseAchievementsProps {
  onSubmit?: (data: ResponseRequest) => void;
}

export function CourseAchievements(props: CourseAchievementsProps) {
  const { onSubmit } = props;
  const [ achievementEdit, setAchievementEdit ] = useState<AchievementModel>();
  const [ showAchievementType, setShowAchievementType ] = useState<TypeAchievement | null>();
  const { addNewAchievement, removeAchievement, updateAchievement, course } = useCourse();
  const { achievements, quizzes } = course;

  const achievementsForms = [
    {
      kind: TypeAchievement.multiple,
      text: 'Cuando el alumno apruebe varios tests',
    },
    {
      kind: TypeAchievement.single,
      text: 'Cuando el alumno apruebe un test',
    },
    {
      kind: TypeAchievement.score,
      text: 'Por calificación',
    },
    {
      kind: TypeAchievement.task,
      text: 'Al cumplir una tarea',
    },
  ];

  const handleSaveAchievement = async (achievement: AchievementParamsUi) => {
    try {
      const { data } = achievement.id
        ? await updateAchievement({ ...achievement, ...{ id: achievement.id } })
        : await addNewAchievement(achievement);
      onSubmit &&
        onSubmit({
          success: true,
          data: data,
        });
        setShowAchievementType(null);
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
  }
  const ButtonAddAchievement = ({color, className, title}: {color: ColorsButton, className?: string, title:string}) => (
    <Dropdown>
      <div className={styles['select-questions']}>
        <Button
          title={title}
          className={className}
          color={color}
        />
      </div>
      <div className={`${styles['menu']} card`}>
        {achievementsForms.map((form, index) => (
          <div
            className={styles['menu-option']}
            key={index}
            onClick={() => {
              setShowAchievementType(form.kind);
            }}
          >
            <h4>{form.text}</h4>
          </div>
        ))}
      </div>
    </Dropdown>
  )

  return (
    <div className="achievements-section">
      <div className={styles['header-text']}>
        <h2>Logros</h2>
        <h4 className="muted">
          El estudiante alcanzara logros al superar ciertas reglas
        </h4>
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
                    setAchievementEdit(achievement);
                    setShowAchievementType(achievement.rule)
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
            setShowAchievementType(TypeAchievement.multiple)
          }}
          icon={'trophy'}
          text={'Agrega logros que los estudiantes puedan alcanzar'}
        >
          <ButtonAddAchievement color={ColorsButton.primary} title={'Crear un logro'}/>
        </SetupCard>
      )}
      {!showAchievementType && achievements && achievements.length > 0 && (
        <ButtonAddAchievement color={ColorsButton.secondary} className={styles['add-button']} title={'Agregar nuevo logro'}/>
      )}
      {showAchievementType && showAchievementType && (
        <AchievementBuilder
          quizzes={quizzes || []}
          typeAchievement={showAchievementType}
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

import {
  NewAchievementParams,
  QuizModel,
  TypeAchievement,
} from '@ltpx-frontend-apps/api';
import {
  AchievementBuilder,
  Button,
  ColorsButton,
  Dropdown,
  Icon,
  SetupCard,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
} from '@ltpx-frontend-apps/shared-ui';
import { useTeacher } from 'apps/client/src/app/store';
import { useState } from 'react';
import styles from './course-achievements.module.scss';

/* eslint-disable-next-line */
export interface CourseAchievementsProps {
  courseId: number;
  initialAchievements: NewAchievementParams[];
  quizzes: QuizModel[];
}

export function CourseAchievements(props: CourseAchievementsProps) {
  const { courseId, initialAchievements, quizzes } = props;
  const [showNotification, setShowNotification] = useState(false);
  const [achievements, setAchievements] =
    useState<NewAchievementParams[]>(initialAchievements);
  const [showAchievementFormType, setShowAchievementFormType] =
    useState<TypeAchievement | null>();
  const { createAchievement } = useTeacher();

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

  const handleSaveAchievement = async (achievement: NewAchievementParams) => {
    const newAchievement = {
      ...achievement,
      ...{
        course_id: courseId,
      },
    };
    const { success, error } = await createAchievement(newAchievement);
    if (success) {
      setAchievements(achievements.concat([achievement]));
      setShowNotification(true);
      setShowAchievementFormType(null);
    } else {
      console.log(error);
    }
  };
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
              setShowAchievementFormType(form.kind);
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
      {!showAchievementFormType && (
        <div className={styles['achievements']}>
          {achievements.map((achievement, index) => (
            <div className={styles['achievement']} key={index}>
              <div className={styles['summary']}>
                <img src={achievement.image} />
                <div className={styles['text']}>
                  <h4>{achievement.title}</h4>
                  <h5>{achievement.rule}</h5>
                </div>
              </div>
              <div className={styles['actions']}>
                <div
                  className={styles['action']}
                  onClick={() => console.log('remove')}
                >
                  <Icon icon="pencil" size={15} />
                </div>
                <div
                  className={styles['action']}
                  onClick={() => console.log('remove')}
                >
                  <Icon icon="trash" size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!showAchievementFormType && achievements.length === 0 && (
        <SetupCard
          onClick={() => {
            setShowAchievementFormType(TypeAchievement.multiple)
          }}
          icon={'trophy'}
          text={'Agrega logros que los estudiantes puedan alcanzar'}
        >
          <ButtonAddAchievement color={ColorsButton.primary} title={'Crear un logro'}/>
        </SetupCard>
      )}
      {!showAchievementFormType && achievements.length > 0 && (
        <ButtonAddAchievement color={ColorsButton.secondary} className={styles['add-button']} title={'Agregar nuevo logro'}/>
      )}
      {showAchievementFormType && showAchievementFormType && (
        <>
          <AchievementBuilder
            quizzes={quizzes}
            typeAchievement={showAchievementFormType}
            onSubmit={(achievement) => {
              handleSaveAchievement(achievement);
            }}
            onCancel={() => {
              setShowAchievementFormType(null);
            }}
          />
        </>
      )}
      <Snackbar
        position={SnackbarPosition.centerBottom}
        open={showNotification}
        title={'Cambios guardados'}
        typeSnackbar={SnackbarType.success}
        date={''}
      />
    </div>
  );
}

export default CourseAchievements;
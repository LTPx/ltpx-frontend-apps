import { NewAchievementParams, QuizModel } from '@ltpx-frontend-apps/api';
import {
  AchievementBuilder,
  Button,
  ColorsButton,
  Icon,
  SetupCard,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import { useTeacher } from '../../../store';
import styles from './achievement.module.scss';

/* eslint-disable-next-line */
export interface AchievementProps {
  courseId: number;
  initialAchievements: NewAchievementParams[];
  quizzes: QuizModel[];
}

export function Achievement(props: AchievementProps) {
  const { courseId, initialAchievements, quizzes } = props;
  const [showNotification, setShowNotification] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [achievements, setAchievements] =
    useState<NewAchievementParams[]>(initialAchievements);
  const { createQuiz } = useTeacher();

  return (
    <div className="achievements-section">
      <div className={styles['header-text']}>
        <h2>Logros</h2>
        <h4 className="muted">
          El estudiante alcanzara logros al superar ciertas reglas
        </h4>
      </div>
      {!showForm && (
        <div className={styles['achievements']}>
          {achievements.map((achievement, index) => (
            <div className={styles['achievement']} key={index}>
              <div className={styles['summary']}>
                <Icon icon={'trophy'} size={20} />
                <div className="d">
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
      {!showForm && achievements.length === 0 && (
        <SetupCard
          onClick={() => {
            setShowForm(true);
          }}
          icon={'trophy'}
          text={'Agregar un logro'}
          titleButton={'Configurar Ahora'}
        />
      )}
      {!showForm && achievements.length > 0 && (
        <Button
          title="Crear Nuevo Test"
          className={styles['add-button']}
          color={ColorsButton.accent}
          onClick={() => {
            setShowForm(true);
          }}
        />
      )}
      {showForm && (
        <>
          <AchievementBuilder
            quizzes={quizzes}
            onSubmit={(achievement) => {
              setShowForm(false);
              setAchievements(achievements.concat([achievement]));
            }}
          />
          <Button
            title="Cancelar"
            className={styles['add-button']}
            color={ColorsButton.accent}
            onClick={() => {
              setShowForm(false);
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
    // <div className="achievements">
    //   <div className={styles['header-text']}>
    //     <h2>Logros</h2>
    //     <h4 className="muted">
    //       El estudiante alcanzara logros al superar ciertas reglas
    //     </h4>
    //   </div>
    //   <div className={styles['achievement-form']}>
    //     <SetupCard
    //       onClick={() => {
    //         setOpenModal(true);
    //       }}
    //       icon={'trophy'}
    //       text={'Añadir Achievement'}
    //       titleButton={'Configurar Ahora'}
    //     />
    //     <AchievementBuilder
    //       open={openModal}
    //       onClose={() => setOpenModal(false)}
    //       onSubmit={() => {
    //         setOpenModal(false);
    //       }}
    //     />
    //   </div>
    // </div>
  );
}

export default Achievement;

import {
  AchievementBuilder,
  SetupCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './achievement.module.scss';

/* eslint-disable-next-line */
export interface AchievementProps {}

export function Achievement(props: AchievementProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="achievements">
      <div className={styles['header-text']}>
        <h2>Logros</h2>
        <h4 className="muted">
          El estudiante alcanzara logros al superar ciertas reglas
        </h4>
      </div>
      <div className={styles['achievement-form']}>
        <SetupCard
          onClick={() => {
            setOpenModal(true);
          }}
          icon={'trophy'}
          text={'Añadir Achievement'}
          titleButton={'Configurar Ahora'}
        />
        <AchievementBuilder
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={() => {
            setOpenModal(false);
          }}
        />
      </div>
    </div>
  );
}

export default Achievement;

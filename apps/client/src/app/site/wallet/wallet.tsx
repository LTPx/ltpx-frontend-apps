import { AchievementBadge } from '@ltpx-frontend-apps/shared-ui';
import styles from './wallet.module.scss';

/* eslint-disable-next-line */
export interface WalletProps {}

export function Wallet(props: WalletProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['achievements-content']}>
        <AchievementBadge
          title="Completa un test"
          image={
            'https://png.pngtree.com/png-clipart/20220213/original/pngtree-achievements-icon-png-image_7268312.png'
          }
        />
        <AchievementBadge
          title="Resuelve el test el Universo y las Estrellas"
          image={
            'https://png.pngtree.com/png-clipart/20220213/original/pngtree-achievements-icon-png-image_7268312.png'
          }
        />
        <AchievementBadge
          title="Cumple con la tarea de Estrellas y Galaxias"
          image={
            'https://png.pngtree.com/png-clipart/20220213/original/pngtree-achievements-icon-png-image_7268312.png'
          }
        />
        <AchievementBadge
          title="Obtén un puntaje mayor a 70 puntos en todos los test del curso"
          image={
            'https://png.pngtree.com/png-clipart/20220213/original/pngtree-achievements-icon-png-image_7268312.png'
          }
        />
      </div>
    </div>
  );
}

export default Wallet;

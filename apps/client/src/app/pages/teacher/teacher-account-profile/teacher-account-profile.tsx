import { Icon } from '@ltpx-frontend-apps/shared-ui';
import styles from './teacher-account-profile.module.scss';

/* eslint-disable-next-line */
export interface TeacherAccountProfileProps {}

export function TeacherAccountProfile(props: TeacherAccountProfileProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['about-teacher']}>
        <div className={styles['title']}>
          <Icon icon={'person'} size={20}></Icon>
          <h3>Sobre mi</h3>
        </div>
        <p>
          Marques Keith Brownlee, también conocido profesionalmente como MKBHD,
          es un YouTuber estadounidense y un jugador profesional de frisbee,
          mejor conocido por sus videos centrados en la tecnología, así como por
          su podcast, Waveform: The MKBHD Podcast. Marques publicó sus primeros
          videos de YouTube mientras estaba en la escuela secundaria, analizando
          el funcionamiento interno de una computadora portátil HP Pavilion que
          compró con su asignación ahorrada. Su canal despegó y desde entonces
          ha hecho videos de YouTube en teléfonos inteligentes, auriculares,
          videocámaras, relojes inteligentes, tabletas, parlantes, las botas que
          se atan solas de Nike y el Cybertruck de Tesla. Más recientemente,
          entrevistó a líderes de opinión como el presidente Barack Obama, Bill
          Gates y Mark Zuckerberg.
        </p>
      </div>
      {/* <div className={styles['about-teacher']}>
        <div className={styles['title']}>
          <Icon icon={'pencil-square'} size={20}></Icon>
          <h3>Información de Usuario</h3>
        </div>
      </div> */}
      <div className={styles['bank']}>
        <div className={styles['title']}>
          <Icon icon={'bank'} size={20}></Icon>
          <h3>Cuenta Bancaria</h3>
        </div>
        <div className={styles['info-bank']}>
          <div className={styles['row']}>
            <div className={styles['item']}>
              <h4>Nombre del Banco: </h4>
              <h4 className={styles['text']}>Banco Pichincha</h4>
            </div>
            <div className={styles['item']}>
              <h4>Propietario de la cuenta: </h4>
              <h4 className={styles['text']}>Angel Capa</h4>
            </div>
          </div>
          <div className={styles['row']}>
            <div className={styles['item']}>
              <h4>Número de cuenta: </h4>
              <h4 className={styles['text']}>21170809654</h4>
            </div>
            <div className={styles['item']}>
              <h4>Tipo de cuenta: </h4>
              <h4 className={styles['text']}>Cuenta de Ahorros</h4>
            </div>
          </div>
          <div className={styles['row']}>
            <div className={styles['item']}>
              <h4>Número de identificación: </h4>
              <h4 className={styles['text']}>1150869368</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherAccountProfile;

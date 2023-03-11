import styles from './about-us.module.scss';

/* eslint-disable-next-line */
export interface AboutUsProps {}

export function AboutUs(props: AboutUsProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['mission']}>
          <div className={styles['mission-text']}>
            <h1>OpenMind</h1>
            <p>
              En OpenMind creemos en el potencial de las personas grandes y
              pequeñas. Creemos que cuando los incentivos se alinean, el flujo
              de información beneficia a todos los participantes sin tapones,
              censura ni desperdicio. El aprendizaje es un intercambio de
              estímulos en donde solo los más persistentes llegan a la meta; en
              donde el camino al éxito está marcado con sonrisas y cicatrices.
              El crecimiento sostenido necesita de modelos motivados, libres de
              límites heredados del pasado. OpenMind es el vehículo para que
              todas las personas que quieren ayudar a aprender lo hagan y sean
              recompensadas dignamente por ello. Aplica para ser profesor hoy o
              registra a tu niño para tomar una clase. En OpenMind, no hay
              límite a tu potencial.
            </p>
          </div>
          <div className={styles['mission-image']}>
            <img
              alt="mission-img"
              src="https://cdni.iconscout.com/illustration/premium/thumb/group-therapy-3163255-2655841.png?f=webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

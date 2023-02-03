import styles from './long-term-potentiation.module.scss';

/* eslint-disable-next-line */
export interface LongTermPotentiationProps {}

export function LongTermPotentiation(props: LongTermPotentiationProps) {
  return (
    <div className={styles['content']}>
      <img
        alt="cover"
        src="https://plus.unsplash.com/premium_photo-1665203434005-3c40f570146f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVhcm5pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
      />
      <div className={styles['information']}>
        <h1>
          ¿Qué es y Cómo generar la Potenciación de Larga Duración (Long-Term
          Potentiation)?
        </h1>
        <p>
          La Potenciación de Larga Duración es el santo grial de la educación.
          Es el nombre técnico que se le da al aprendizaje duradero. Ocurre
          cuando un estímulo fuerte es sostenido y repetido a través del tiempo.
          Algunos ejemplos son:
        </p>
        <ul>
          <li>Andar en bicicleta o conducir un vehículo.</li>
          <li>La habilidad musical.</li>
          <li>Caminar, correr y las habilidades corporales en general.</li>
          <li>Las habilidades lingüísticas y los segundos idiomas.</li>
        </ul>
        <p>
          Podemos identificar que la Potenciación de Larga Duración ha ocurrido
          porque una vez que lo has aprendido, ya no lo olvidas más. Lo has
          aprendido para toda la vida.
        </p>
        <h4>¿Cómo se genera la Potenciación de Larga Duración?</h4>
        <p>
          La Potenciación de Larga Duración requiere de niveles de atención
          personalizada y tiempo de práctica que no están disponibles en el
          sistema escolar convencional.
        </p>
        <p>
          El Protocolo de Transferencia de Aprendizaje ha sido creado para
          facilitar la generación de Potenciación de Larga Duración. A través de
          motivar el uso del Aprendizaje Basado en Juegos y eliminar las
          distracciones innecesarias, el Protocolo de Transferencia de
          Aprendizaje estimula la generación de Potenciación de Larga Duración.
        </p>
        <h4>Con este propósito:</h4>
        <ul>
          <li>
            Los docentes son remunerados por los objetivos obtenidos y no por el
            tiempo gastado en lecciones o cátedra.
          </li>
          <li>
            Los alumnos tienen el control de su progreso y pueden avanzar rápido
            o lento según sus preferencias y habilidades.
          </li>
          <li>
            Los certificados contienen toda la información de la actividad
            sostenida para validaciones posteriores de otras instituciones y los
            registros de los padres.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LongTermPotentiation;

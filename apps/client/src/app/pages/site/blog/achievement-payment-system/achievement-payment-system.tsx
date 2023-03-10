import styles from './achievement-payment-system.module.scss';

/* eslint-disable-next-line */
export interface AchievementPaymentSystemProps {}

export function AchievementPaymentSystem() {
  return (
    <div className={styles['content']}>
      <img
        alt="cover"
        src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGF5bWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
      />
      <div className={styles['information']}>
        <h1>¿Cómo funciona el sistema de cobro por logros de OpenMind?</h1>
        <p>
          Al crear un curso, el docente deberá establecer las validaciones que
          el alumno deberá realizar para aprobar el mismo. El curso puede
          consistir de un solo logro o puede tener varios. El docente recibirá
          un pago en su cuenta por cada logro obtenido satisfactoriamente por el
          alumno.
        </p>
        <p>
          Cuando el alumno se inscribe en el curso, el representante entrega el
          dinero correspondiente al pago de todos los logros (todo el curso) a
          OpenMind que lo sostiene hasta que los logros sean cumplidos y se
          realice el pago al docente. En caso de fracaso, o incumplimiento, Open          Minds devolverá el dinero al representante.
        </p>
        <p>
          En ciertos casos especiales en que se cumplen todos los requisitos
          para ejecutar el pago y el alumno no logre superar la prueba final,
          esta puede ser retomada o el docente puede realizar un reporte que
          será evaluado por el equipo de OpenMind que considerará si debe ser
          ejecutado el pago o no.
        </p>
      </div>
    </div>
  );
}

export default AchievementPaymentSystem;

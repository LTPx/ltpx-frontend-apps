import styles from './achievement-payment-system.module.scss';

/* eslint-disable-next-line */
export interface AchievementPaymentSystemProps {}

export function AchievementPaymentSystem(props: AchievementPaymentSystemProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <img
          alt="cover"
          src="https://plus.unsplash.com/premium_photo-1661919585183-9656936b6fc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fG1pbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        />
        <div className={styles['information']}>
          <h1>¿Cómo funciona el sistema de cobro por logros de Open Mind?</h1>
          <p>
            Al crear un curso, el docente deberá establecer las validaciones que
            el alumno deberá realizar para aprobar el mismo. El curso puede
            consistir de un solo logro o puede tener varios. El docente recibirá
            un pago en su cuenta por cada logro obtenido satisfactoriamente por
            el alumno.
          </p>
          <p>
          Cuando el alumno se inscribe en el curso, el representante entrega el
          dinero correspondiente al pago de todos los logros (todo el curso) a
          Open Mind que lo sostiene hasta que los logros sean cumplidos y se
          realice el pago al docente. En caso de fracaso, o incumplimiento, Open
          Minds devolverá el dinero al representante.
          </p>
          <p>
            En ciertos casos especiales en que se cumplen todos los requisitos
            para ejecutar el pago y el alumno no logre superar la prueba final,
            esta puede ser retomada o el docente puede realizar un reporte que
            será evaluado por el equipo de Open Mind que considerará si debe ser
            ejecutado el pago o no.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AchievementPaymentSystem;

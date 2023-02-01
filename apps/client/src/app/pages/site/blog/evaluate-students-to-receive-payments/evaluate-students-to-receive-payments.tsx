import styles from './evaluate-students-to-receive-payments.module.scss';

/* eslint-disable-next-line */
export interface EvaluateStudentsToReceivePaymentsProps {}

export function EvaluateStudentsToReceivePayments(
  props: EvaluateStudentsToReceivePaymentsProps
) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <img
          alt="cover"
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGV4YW18ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        />
        <div className={styles['information']}>
          <h1>¿Como evaluar a mis alumnos para recibir pagos en Open Mind?</h1>
          <p>
            Open Mind provee un escritorio (dashboard) de docente completo en
            donde podrás administrar tus cursos y alumnos. Como los objetivos
            del curso y sus validaciones están establecidas desde el inicio,
            deberás revisar el trabajo del alumno, validar sus respuestas y
            adjuntar el material que valida su aprobación de los objetivos. Este
            material puede ser trabajos enviados, pruebas orales, videos o
            evaluaciones. Las validaciones siempre serán revisadas por el equipo
            de Open Mind y posteriormente auditadas para asegurar su veracidad.
          </p>
          <p>
            Bajo ningún concepto será tolerado ningún tipo de trampa o ayudas
            que perjudiquen la calidad del aprendizaje y de los resultados
            obtenidos. Si se encuentra que un docente ha hecho trampa de
            cualquier forma, será expulsado de la plataforma sin opción a
            recibir pagos por el trabajo realizado.
          </p>
          <p>
          Existirán ocasiones en las que a pesar de haber realizado todo el
          curso adecuadamente y ayudado al alumno de la mejor manera, este no
          logre aprobar el curso. En estos casos, el docente deberá indicar la
          situación (dentro de la plataforma) al equipo Open Mind y este
          revisará y aprobará el pago. El representante podrá luego solicitar
          una nueva evaluación o incluso tomar la clase completa de nuevo a
          cambio de un nuevo valor.
          </p>
          <p>
            Todos los docentes son calificados por los alumnos en función de su
            desempeño y los docentes mejor calificados serán promocionados más y
            normalmente tienen más interesados en sus clases, además de poder
            cobrar más (según demanda).
          </p>
        </div>
      </div>
    </div>
  );
}

export default EvaluateStudentsToReceivePayments;

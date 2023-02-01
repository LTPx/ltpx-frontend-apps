import styles from './how-open-mind-works.module.scss';

/* eslint-disable-next-line */
export interface HowOpenMindWorksProps {}

export function HowOpenMindWorks(props: HowOpenMindWorksProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <img
          alt="cover"
          src="https://plus.unsplash.com/premium_photo-1661919585183-9656936b6fc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fG1pbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        />
        <div className={styles['information']}>
          <h1>¿Cómo funciona Open Mind?</h1>
          <h4>Open Mind tiene un par de funciones únicas:</h4>
          <ol>
            <li>
              Cuando contratas una clase en Open Mind, deberás pagar todo el
              valor de la misma, sin embargo, este valor no es entregado al
              docente de inmediato. Open Mind sostiene el valor hasta que el
              docente obtiene los objetivos predeterminados para el curso y
              entrega el pago al docente una vez que él logra que el alumno
              consiga sus objetivos de aprendizaje. Esto hace que:
              <ol>
                <li>
                  El docente está motivado únicamente a ayudar al alumno a
                  conseguir sus objetivos y no a consumir el tiempo de clase.
                </li>
                <li>
                  El alumno esté en total control de cuando recibe el pago el
                  docente
                </li>
                <li>
                  El representante tenga la confianza de que su inversión está
                  segura y será devuelta si el docente no cumple con los
                  objetivos predeterminados
                </li>
              </ol>
            </li>
            <li>
              Al completar una clase en Open Mind, el alumno recibirá
              automáticamente un certificado de cumplimiento que incluye todas
              las actividades realizadas para obtener el mismo.
            </li>
            <li>
              Open Mind provee un currículo guía que posiciona cada clase
              ofrecida en él. Los alumnos son libres de contratar cursos y
              docentes, o avanzar por sí mismos y solicitar validaciones
              únicamente cuando están listos para pasar al siguiente nivel.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default HowOpenMindWorks;

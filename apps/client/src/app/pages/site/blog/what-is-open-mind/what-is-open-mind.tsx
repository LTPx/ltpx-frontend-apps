import styles from './what-is-open-mind.module.scss';

/* eslint-disable-next-line */
export interface WhatIsOpenMindProps {}

export function WhatIsOpenMind() {
  return (
    <div className={styles['content']}>
      <img
        alt="cover"
        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8b25saW5lJTIwY2xhc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
      />
      <div className={styles['information']}>
        <h1>
          ¿Qué es Open Mind, que es el protocolo LTP y porque debo usarlos?
        </h1>
        <p>
          Open Mind es el nombre del marketplace que construimos sobre el
          protocolo de transferencia de aprendizaje LTP. LTP significa Learning
          Transfer Protocol, Learning Through Play y Long Term Potentiation; los
          tres conceptos que el protocolo hace posible. Ha sido creado para:
        </p>
        <ol>
          <li>
            Dar libertad a docentes para dar clases desde cualquier lugar
            estableciendo sus propios precios y métodos para ayudar a sus
            alumnos a conseguir sus metas de aprendizaje (transferir
            aprendizaje).
          </li>
          <li>
            Dar el control a los alumnos de sus resultados, permitiéndoles
            avanzar a su propio ritmo con la ayuda de un tutor personal
            dedicado, para que puedan conseguir sus objetivos de aprendizaje
            (aprender jugando/potenciación de larga duración).
          </li>
          <li>
            Facilitar el establecimiento de relaciones de confianza entre
            profesores y alumnos gracias al protocolo LTP.
          </li>
          <ol type="a">
            <li>
              LTP se encarga de cobrar el costo de la clase a los
              representantes, pero solo entrega el pago una vez que el docente
              ayuda con éxito al alumno a obtener sus objetivos (alinear
              incentivos).
            </li>
            <li>
              *Excepto en casos particulares donde el docente recibe el pago aún
              cuando el alumno no apruebe la validación de aprendizaje.
            </li>
          </ol>
          <li>
            Permitir a todas las personas con experiencia ofrecer y dar clases
            estableciendo sus propias reglas y recibir pagos de alumnos en todo
            el mundo.
          </li>
        </ol>
        <p>
          Al usar Open Mind como docente podrás crear tus propios cursos y dar
          clases fácilmente a alumnos de todo el mundo. Tu rol como docente en
          Open Mind varía levemente del que tienes en una escuela tradicional.
          Tus pagos no dependen de cumplir un cierto número de horas, sino de
          validar que tus alumnos han cumplido sus objetivos preestablecidos.
          Open Mind promociona tus clases y los docentes con las mejores
          calificaciones y resultados serán promocionados aún más. Si tus clases
          tienen alta demanda, podrás subir su costo, tener más alumnos y ganar
          más dinero. Tus resultados dependen de la calidad de tu trabajo y nada
          más.
        </p>
        <p>
          Al usar Open Mind como alumno podrás avanzar a tu propio ritmo,
          asistir a clases grupales en línea, consultar a tu docente de manera
          ilimitada y obtener tus objetivos a tu propia velocidad. No estarás
          obligado a ir al ritmo del más lento ni a aprender cosas inútiles. Tu
          representante sólo pagará al docente una vez que cumplas tus objetivos
          motivando de esa manera al docente a enfocarse en lo que más importa;
          tu éxito. Podrás ver tus objetivos desde el inicio y completarlos a tu
          propio ritmo. Una vez que los completes, puedes avanzar de inmediato
          al siguiente nivel.
        </p>
      </div>
    </div>
  );
}

export default WhatIsOpenMind;

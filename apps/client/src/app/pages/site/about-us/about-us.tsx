import styles from './about-us.module.scss';

/* eslint-disable-next-line */
export interface AboutUsProps {}

export function AboutUs(props: AboutUsProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <h1 className={styles['title']}>Acerca de Nosotros</h1>
        <div className={styles['information-ltp']}>
          <h3>
            ¿Qué es Open Mind, que es el protocolo LTP y porque debo usarlos?{' '}
          </h3>
          <p>
            Open Mind es el nombre del marketplace que construimos sobre el
            protocolo de transferencia de aprendizaje LTP. LTP significa
            Learning Transfer Protocol, Learning Through Play y Long Term
            Potentiation; los tres conceptos que el protocolo hace posible. Ha
            sido creado para:
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
                  representantes, pero solo entrega el pago una vez que el
                  docente ayuda con éxito al alumno a obtener sus objetivos
                  (alinear incentivos).
                </li>
                <li>
                  *Excepto en casos particulares donde el docente recibe el pago
                  aún cuando el alumno no apruebe la validación de aprendizaje.
                </li>
              </ol>
              <li>
                Permitir a todas las personas con experiencia ofrecer y dar
                clases estableciendo sus propias reglas y recibir pagos de
                alumnos en todo el mundo.
              </li>
            </ol>
            Al usar Open Mind como docente podrás crear tus propios cursos y dar
            clases fácilmente a alumnos de todo el mundo. Tu rol como docente en
            Open Mind varía levemente del que tienes en una escuela tradicional.
            Tus pagos no dependen de cumplir un cierto número de horas, sino de
            validar que tus alumnos han cumplido sus objetivos preestablecidos.
            Open Mind promociona tus clases y los docentes con las mejores
            calificaciones y resultados serán promocionados aún más. Si tus
            clases tienen alta demanda, podrás subir su costo, tener más alumnos
            y ganar más dinero. Tus resultados dependen de la calidad de tu
            trabajo y nada más.
            <br />
            Al usar Open Mind como alumno podrás avanzar a tu propio ritmo,
            asistir a clases grupales en línea, consultar a tu docente de manera
            ilimitada y obtener tus objetivos a tu propia velocidad. No estarás
            obligado a ir al ritmo del más lento ni a aprender cosas inútiles.
            Tu representante sólo pagará al docente una vez que cumplas tus
            objetivos motivando de esa manera al docente a enfocarse en lo que
            más importa; tu éxito. Podrás ver tus objetivos desde el inicio y
            completarlos a tu propio ritmo. Una vez que los completes, puedes
            avanzar de inmediato al siguiente nivel.
          </p>
        </div>
        <br />
        <div className={styles['operating-information']}>
          <h3>¿Cómo funciona Open Mind?</h3>
          <p>
            Open Mind tiene un par de funciones únicas:
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
          </p>
        </div>
        <br />
        <div className={styles['information']}>
          <h3>¿Cómo funciona el sistema de cobro por logros de Open Mind?</h3>
          <p>
            Al crear un curso, el docente deberá establecer las validaciones que
            el alumno deberá realizar para aprobar el mismo. El curso puede
            consistir de un solo logro o puede tener varios. El docente recibirá
            un pago en su cuenta por cada logro obtenido satisfactoriamente por
            el alumno.
            <br />
            Cuando el alumno se inscribe en el curso, el representante entrega
            el dinero correspondiente al pago de todos los logros (todo el
            curso) a Open Mind que lo sostiene hasta que los logros sean
            cumplidos y se realice el pago al docente. En caso de fracaso, o
            incumplimiento, Open Minds devolverá el dinero al representante.
            <br />
            En ciertos casos especiales en que se cumplen todos los requisitos
            para ejecutar el pago y el alumno no logre superar la prueba final,
            esta puede ser retomada o el docente puede realizar un reporte que
            será evaluado por el equipo de Open Mind que considerará si debe ser
            ejecutado el pago o no.
          </p>
        </div>
      </div>
{/* 
      <div>
        <h3>¿Como evaluar a mis alumnos para recibir pagos en Open Mind?</h3>
        <p>
          Open Mind provee un escritorio (dashboard) de docente completo en
          donde podrás administrar tus cursos y alumnos. Como los objetivos del
          curso y sus validaciones están establecidas desde el inicio, deberás
          revisar el trabajo del alumno, validar sus respuestas y adjuntar el
          material que valida su aprobación de los objetivos. Este material
          puede ser trabajos enviados, pruebas orales, videos o evaluaciones.
          Las validaciones siempre serán revisadas por el equipo de Open Mind y
          posteriormente auditadas para asegurar su veracidad.
          <br />
          Bajo ningún concepto será tolerado ningún tipo de trampa o ayudas que
          perjudiquen la calidad del aprendizaje y de los resultados obtenidos.
          Si se encuentra que un docente ha hecho trampa de cualquier forma,
          será expulsado de la plataforma sin opción a recibir pagos por el
          trabajo realizado.
          <br />
          Existirán ocasiones en las que a pesar de haber realizado todo el
          curso adecuadamente y ayudado al alumno de la mejor manera, este no
          logre aprobar el curso. En estos casos, el docente deberá indicar la
          situación (dentro de la plataforma) al equipo Open Mind y este
          revisará y aprobará el pago. El representante podrá luego solicitar
          una nueva evaluación o incluso tomar la clase completa de nuevo a
          cambio de un nuevo valor.
          <br />
          Todos los docentes son calificados por los alumnos en función de su
          desempeño y los docentes mejor calificados serán promocionados más y
          normalmente tienen más interesados en sus clases, además de poder
          cobrar más (según demanda).
        </p>
      </div>
      <div>
        <h3>Pautas para el perfil de docente</h3>
        <p>
          Cómo crear un excelente perfil de docente y video de introducción para
          tu página de perfil de Open Mind.
          <br />
          Tu perfil de profesor te presenta a padres y alumnos. Debe utilizar un
          tono profesional. Aparecerá en tus clases y servirá como tu página de
          maestro personal. Tener un gran perfil les dará a los padres más
          confianza para inscribirse en tus clases. Tu video de perfil de
          maestro es una herramienta que puedes usar para promocionarte con los
          padres, mostrando tu profesionalismo y personalidad.
          <br />
          Requerimientos generales
          <ul>
            <li>
              Nombre: Es el nombre que verán las familias y nuestro personal. Tu
              nombre para mostrar en Open Mind no necesita ser tu nombre
              completo, pero debe incluir al menos alguna variante de tu nombre
              legal. Te invitamos a incluir detalles sobre tus servicios o
              especialidades, como el tema que enseñas, o sufijos estándar como
              'PhD', o 'Magister', para ayudar a construir tu negocio en Open
              Mind. No se permite el uso de contenido de marca, nombres de
              universidades u otros términos de marca registrada en tu nombre
              para mostrar. Ten en cuenta que este campo tiene una restricción
              de 50 caracteres y debe estar libre de caracteres especiales y
              emojis.
            </li>
            <li>
              Titular: Es una frase corta que aparece junto a tu nombre. Usa tu
              titular para mostrar tus puntos fuertes de enseñanza a las
              familias. Por ejemplo, ”'Ex profesor de química de escuela
              secundaria”
            </li>
            <li>
              País (no obligatorio): Se refiere a un banner de ubicación debajo
              de tu nombre. Compartir tu país de residencia en tu perfil de
              maestro puede ayudar a las familias a encontrar clases en la zona
              horaria adecuada.
            </li>
            <li>Foto: Una foto clara y directa de tu cara.</li>
            <li>
              Acerca de mí: Un párrafo (100-200 palabras) que describa tus
              antecedentes, experiencia docente e intereses. Las familias
              utilizan tu sección "Acerca de mí" para ayudarse en el proceso de
              búsqueda de clases, por lo que no debe tener errores ortográficos
              ni gramaticales. Esta sección no debe incluir enlaces a cuentas de
              redes sociales u otros sitios web (recuerde mantener toda la
              comunicación con las familias a través Open Mind).
            </li>
            <li>
              URL de perfil: la URL de su perfil es un enlace único que conduce
              a tu perfil, por ejemplo:
              growopenminds.com/docentes/profematematicas. Todos los maestros
              tienen una "URL de perfil" automática. Tenga en cuenta que el URL
              único se crea automáticamente a partir del nombre que Ud. elige
              para su perfil.
            </li>
          </ul>
        </p>
      </div>  */}
    </div>
  );
}

export default AboutUs;

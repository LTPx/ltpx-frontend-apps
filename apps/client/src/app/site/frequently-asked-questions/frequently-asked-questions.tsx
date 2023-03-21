import {
  Button,
  PanelAccordion,
  SectionInformation,
} from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './frequently-asked-questions.module.scss';

/* eslint-disable-next-line */
export interface FrequentlyAskedQuestionsProps {}

export function FrequentlyAskedQuestions(props: FrequentlyAskedQuestionsProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <h1 className={styles['title']}>Preguntas Frecuentes</h1>
        <NavLink className={styles['to-home']} to="/home">
          Ir a inicio
        </NavLink>
        <h2 className={styles['subtitle']}>OpenMind</h2>
        <PanelAccordion title={'1. ¿Qué es Open Mind y cómo funciona?'}>
          <p>
            OpenMind es una plataforma de oferta de cursos y tutorías por parte
            de profesores independientes. OpenMind ha sido construido sobre el
            protocolo de transferencia de aprendizaje LTP que hace que los
            profesores solo reciban los pagos acordados por el servicio una vez
            que cumplen los logros acordados. Las familias/estudiantes pagan el
            valor completo del curso al inicio, pero OpenMind lo retiene y lo
            transfiere al profesor únicamente cuando se valida que el logro de
            aprendizaje ha sido conseguido.
          </p>
        </PanelAccordion>
        <PanelAccordion
          title={
            '2. ¿Por qué es OpenMind mejor que otras plataformas de aprendizaje en línea?'
          }
        >
          <p>
            OpenMind es mejor que otras plataformas de aprendizaje porque
            gracias al protocolo de transferencia de aprendizaje LTP
          </p>
          <ul>
            <li>
              Da libertad a docentes para dar clases desde cualquier lugar
              estableciendo sus propios precios y métodos para ayudar a sus
              alumnos a conseguir sus metas de aprendizaje (transferir
              aprendizaje).
            </li>
            <li>
              Da el control a los alumnos de sus resultados, permitiéndoles
              avanzar a su propio ritmo con la ayuda de un tutor personal
              dedicado, para que puedan conseguir sus objetivos de aprendizaje
              (aprender jugando/potenciación de larga duración).
            </li>
            <li>
              Facilita el establecimiento de relaciones de confianza entre
              profesores y alumnos gracias al protocolo LTP.
              <ul>
                <li>
                  LTP se encarga de cobrar el costo de la clase a los
                  representantes, pero solo entrega el pago una vez que el
                  docente ayuda con éxito al alumno a obtener sus objetivos
                  (alinear incentivos).
                </li>
              </ul>
            </li>
            <li>
              Permite a todas las personas con experiencia ofrecer y dar clases
              estableciendo sus propias reglas y recibir pagos de alumnos en
              todo el mundo.
            </li>
          </ul>
          <p>
            De esta manera, OpenMind consigue mejores resultados a menor costo
            para las familias que otras plataformas de aprendizaje en línea y la
            educación tradicional.
          </p>
        </PanelAccordion>
        <PanelAccordion title={'3. ¿Qué significa que OpenMind está en beta?'}>
          <p>
            OpenMind es una plataforma en desarrollo. De momento estamos
            lanzando la oferta de cursos grupales de apoyo al aprendizaje
            convencional y cursos independientes.
          </p>
        </PanelAccordion>
        <PanelAccordion
          title={'4. ¿Se puede hacer un grado completo en OpenMind?'}
        >
          <p>
            En los próximos meses seguiremos mejorando la plataforma y agregando
            nuevos productos que completen los servicios que necesitan las
            familias para hacer todo el aprendizaje de sus hijos desde casa.{' '}
          </p>
        </PanelAccordion>
        <PanelAccordion
          title={'5. ¿Puedo tomar varias clases al mismo tiempo en OpenMind?'}
        >
          <p>
            Si. Organiza tu agenda y puedes tomar todas las clases que quieras.{' '}
          </p>
        </PanelAccordion>
        <PanelAccordion
          title={
            '6. ¿Cómo verifican las credenciales de los docentes en OpenMind?'
          }
        >
          <p>
            Todos los profesores que son aprobados para enseñar en OpenMind
            deben proveer sus credenciales de educadores, diplomas y demostrar
            su experiencia y aptitudes. Además deben proveer su record policial
            actualizado.{' '}
          </p>
        </PanelAccordion>
        <PanelAccordion
          title={'7. ¿Cómo protege OpenMind la seguridad de los alumnos?'}
        >
          <p>
            Nuestra principal preocupación es la seguridad de los alumnos, y
            abordamos esto de varias maneras, tal como se describe en nuestra
            política de seguridad. Este artículo describe su responsabilidad por
            la seguridad como maestro en OpenMind. Por favor revise{' '}
            <a href="/blog/student-safety-privacy">
              seguridad y privacidad del alumno
            </a>{' '}
            para conocer todas las maneras cómo protegemos la seguridad de los
            alumnos.{' '}
          </p>
        </PanelAccordion>
        <PanelAccordion
          title={
            '8. ¿Cómo controla OpenMind la calidad de los cursos ofrecidos?'
          }
        >
          <p>
            Todos los cursos que se publican en OpenMind son revisados y
            aprobados por nuestro equipo pedagógico. La actividad dentro de los
            cursos puede ser auditada por nuestro personal para controlar la
            calidad del servicio provisto. En caso de no estar contento con la
            calidad del servicio que recibiste, por favor comuníquese con{' '}
            <a target="_blank" href="mailto:mail@growopenminds.com">
              mail@growopenminds.com
            </a>
          </p>
        </PanelAccordion>
        <h2 className={styles['subtitle-two']}>Pagos</h2>
        <PanelAccordion
          title={'9. ¿Cómo funciona el sistema de pago por logros de OpenMind?'}
        >
          <p>
            Al comprar un curso en OpenMind, su costo no se entrega
            inmediatamente al profesor contratado. Los valores son guardados por
            OpenMind y entregados a los profesores una vez que se comprueba que
            los objetivos de aprendizaje han sido obtenidos.
            <br />
            Cada curso tiene una serie de logros, cada uno con un valor
            específico. Una vez que se verifica a través de las pruebas en la
            plataforma y la evaluación del profesor, el pago se entrega
            automáticamente.
          </p>
        </PanelAccordion>
        <PanelAccordion
          title={
            '10. ¿Cómo me devuelven mi dinero si no se obtienen los logros educativos acordados?'
          }
        >
          <p>
            En el caso de que los objetivos de aprendizaje no se consigan por
            motivos relacionados con el desempeño del profesor, los valores
            depositados serán inmediatamente devueltos a las
            familias/estudiantes.
            <br />
            *Pueden existir tarifas de procesamiento de los servicios de
            transferencia de dinero.
          </p>
        </PanelAccordion>
        <p>
          Si tienes una pregunta adicional contacta a{' '}
          <a target="_blank" href="mailto:mail@growopenminds.com">
            mail@growopenminds.com
          </a>
        </p>
      </div>
      <SectionInformation
        className={styles['section-content']}
        title={'Obtén recomendaciones personales de aprendizaje'}
        imgUrl={'../../../../assets/images/bg_shape.svg'}
        description={'Mejora tus habilidades con los mejores cursos en línea'}
      >
        <div className={styles['btn']}>
          <Button title={'Empieza Ahora'} link={'/courses'} />
        </div>
      </SectionInformation>
    </div>
  );
}

export default FrequentlyAskedQuestions;

import styles from './great-experience--open-mind.module.scss';

/* eslint-disable-next-line */
export interface GreatExperienceOpenMindProps {}

export function GreatExperienceOpenMind(props: GreatExperienceOpenMindProps) {
  return (
    <div className={styles['content']}>
      <img
        alt="cover"
        src="https://images.unsplash.com/photo-1604872441539-ef1db9b25f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGV4YW18ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
      />
      <div className={styles['information']}>
        <h1>
          ¿Como asegurarse de entregar una gran experiencia en vivo en Open
          Mind?
        </h1>
        <p>
          Antes de su primera clase, siga los siguientes pasos para asegurarse
          de estar preparado para enseñar el plan de estudios de aprendizaje
          virtual que ha diseñado. Estas tareas deben realizarse días o semanas
          antes de que comience su clase, y no deben guardarse hasta el último
          minuto.
        </p>
        <p>
          Pruebe todos sus enlaces y herramientas tecnológicas para asegurarse
          de que funcionan. Los percances tecnológicos inevitablemente sucederán
          de vez en cuando, pero haga todo lo posible para asegurarse de que
          tiene listos sus materiales en línea.
          <br />
          Familiaricese con el aula virtual y las funciones de video. Para
          obtener comentarios y sugerencias en vivo, agende una sesión con el
          equipo de soporte donde puede practicar la enseñanza en vivo de un
          pequeño segmento de su clase con un especialista.
          <br />
          Verifique que tenga permiso para usar cualquier imagen, video u otro
          contenido que planee presentar en su clase. En caso de duda, déjelo
          fuera.
        </p>
        <h4>Configura tu espacio</h4>
        <p>
          Imagina que eres un alumno que se encuentra con su educador virtual
          por primera vez. ¿Qué te gustaría que vieran en su pantalla? La forma
          en que configure su espacio de enseñanza ayudará a establecer el tono
          de su clase y desempeñará un papel importante para mantener a los
          alumnos interesados. Evalúe los siguientes aspectos de su espacio de
          enseñanza:
        </p>
        <h4>Iluminación</h4>
        <p>
          Su rostro y fondo deben estar bien iluminados sin exceso de luz. Si
          usa luz artificial para iluminar su espacio (como una lámpara o un
          anillo de luz), pruebe diferentes configuraciones usando la función de
          vista previa de video hasta que encuentre una que reduzca las sombras
          e ilumine adecuadamente su rostro y fondo. Recuerde que la luz debe
          provenir de frente a usted, no de atrás, para evitar que la pantalla
          se oscurezca.
        </p>
        <h4>Sonido</h4>
        <p>
          ¡Tus alumnos deben poder escucharte! Y será mejor que no escuchen
          ruido adicional a su alrededor. Cosas como televisores, conversaciones
          y mascotas pueden distraer si los alumnos pueden escucharlas de fondo,
          así que elige un espacio donde no te molesten durante la clase.
        </p>
        <h4>Fondo</h4>
        <p>
          Al contrario de lo que pueda suponer, enseñar frente a un fondo
          completamente simple puede dificultar que los alumnos se concentren en
          su instrucción. Considere cómo puede agregar algunas decoraciones u
          objetos apropiados detrás de usted para ayudar a los alumnos a
          mantenerse enfocados en la pantalla. Con eso en mente, también debe
          echar un vistazo para asegurarse de que no haya nada que no quiera que
          los alumnos vean en la vista de la cámara. Camas o platos
          desordenados, arte u objetos inapropiados para la edad del alumno, o
          artículos religiosos personales, todos caen en la categoría de
          “manténgalo fuera de la pantalla”.
        </p>
        <h4>Decidir sobre las normas del aula</h4>
        <p>
          Es importante estar preparado para establecer expectativas para su
          aula en línea desde el principio, tal como lo haría en un aula física.
          Los límites claros y definidos son importantes, ya que muchos de sus
          alumnos habrán participado en clases en línea que utilizan una
          variedad de formatos o currículos. Algunas normas populares entre los
          educadores en línea que quizás desee incluir en su clase son:
        </p>
        <ul>
          <li>
            Sea respetuoso con los demás alumnos permaneciendo en silencio
            cuando otros hablan y usando un lenguaje inclusivo y amable en
            clase.
          </li>
          <li>
            Guarde otros dispositivos (como teléfonos, tabletas o consolas de
            videojuegos portátiles) durante la lección.
          </li>
          <li>
            Use el chat solo para discusiones/actividades de clase, en lugar de
            conversaciones sociales o fuera del tema.
          </li>
          <li>Prepárese para llegar a todos los alumnos</li>
        </ul>
        <p>
          En los momentos previos a que una nueva clase se reúna por primera
          vez, puede sentirse lleno de anticipación por conocer virtualmente a
          estudiantes desconocidos. Puede ayudar a calmar esos nervios haciendo
          un esfuerzo por conocer a sus alumnos con anticipación. Planifique
          cómo aprenderá más sobre los niños que se unirán a su clase, cómo
          diseñar una pregunta de discusión para iniciar la clase que lo ayudará
          a comprender las metas, habilidades y/o razones de sus alumnos para
          inscribirse en su curso.
          <br />
          Tomarse este tiempo adicional para comprender a sus alumnos inscritos
          es lo que puede diferenciarlo como un instructor estelar y ayudar a
          que cada persona se sienta bienvenida, segura y valorada en su clase.
        </p>
        <h4>¡Emocionese!</h4>
        <p>
          Si es un educador aprobado en Open Mind, ya nos ha demostrado que
          tiene lo que se necesita para involucrar a los niños con sus pasiones
          compartidas e inspirar el amor por el aprendizaje. ¡Así que haz un
          plan, prepárate y entra allí! Tu primera clase de estudiantes está
          ansiosa por conocerte.
        </p>
      </div>
    </div>
  );
}

export default GreatExperienceOpenMind;

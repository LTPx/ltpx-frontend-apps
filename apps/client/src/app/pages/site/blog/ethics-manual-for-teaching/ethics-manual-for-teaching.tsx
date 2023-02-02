import styles from './ethics-manual-for-teaching.module.scss';

/* eslint-disable-next-line */
export interface EthicsManualForTeachingProps {}

export function EthicsManualForTeaching() {
  return (
    <div className={styles['content']}>
      <img
        alt="cover"
        src="https://plus.unsplash.com/premium_photo-1661919585183-9656936b6fc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fG1pbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
      />
      <div className={styles['information']}>
        <h1>Manual de ética para dar clases en Open Mind</h1>
        <h4>Normas comunitarias</h4>
        <h4>Directrices para los miembros de Open Mind</h4>
        <p>
          Open Mind es una comunidad abierta de estudiantes, padres y maestros.
          Estamos conectados por la tecnología y unidos por el deseo de ayudar a
          los estudiantes a amar el aprendizaje. Todas nuestras clases son
          ofrecidas por profesores independientes, quienes determinan el
          contenido y formato de sus propias clases.
        </p>
        <p>
          Si bien nuestra comunidad abierta es nuestra mayor fuente de
          fortaleza, también presenta desafíos. Para nosotros es importante que
          Open Mind sea un espacio seguro para nuestros usuarios. Nuestros
          miembros deben tratarse entre sí sin sesgos ni prejuicios en todos los
          pilares de la diversidad, incluidos, entre otros, la raza, el origen
          étnico, la nacionalidad, la orientación sexual, la religión y la
          identidad de género. Aquí hay algunas pautas que les pedimos a
          nuestros miembros que observen.{' '}
          <strong>
            Los miembros de Open Mind que no cumplan con estas pautas serán
            eliminados del sitio.
          </strong>
        </p>
        <h4>Código de conducta del maestro</h4>
        <h4>
          Ofrezca clases solo cuando tenga los antecedentes o la experiencia
          adecuados
        </h4>
        <ul>
          <li>Impartir clases de forma profesional.</li>
          <li>
            Esté preparado, comience a tiempo y trate a todos los alumnos con
            respeto.
          </li>
          <li>
            No enseñe mientras esté bajo la influencia del alcohol o las drogas,
            y no modele ningún comportamiento que un estudiante de 18 años o
            menor no pueda realizar.
          </li>
          <li>
            Responda con prontitud a las preguntas y solicitudes de los padres.
          </li>
          <li>
            Comuníquese con los padres y los alumnos de manera profesional,
            tanto en mensajes como en clase.
          </li>
          <li>
            Mantenga todas las comunicaciones en nuestra plataforma; nunca
            proporcione información de contacto personal a los padres o alumnos
            para comunicaciones "fuera de la plataforma" o reuniones en persona
            (prohibido a menos que sea un evento patrocinado por Open Mind).
          </li>
          <li>
            Adhiérase a nuestra política de contenido de clase ofreciendo solo
            clases seculares, objetivas y apropiadas para la edad.
          </li>
          <li>
            Cree un espacio seguro y acogedor para estudiantes y familias de
            todos los orígenes, creencias y ubicaciones.
          </li>
        </ul>
        <h4>Código de conducta de los padres</h4>
        <ul>
          <li>
            Los alumnos solo deben asistir a clases bajo su propia inscripción,
            como ellos mismos. La política de Open Mind no permite que un alumno
            use la inscripción de su hermano o de otro alumno para asistir a
            clase.
          </li>
          <li>
            Haz preguntas a los maestros para aclarar cualquier detalle faltante
            sobre las clases.
          </li>
          <li>
            Asiste a tu clase; muchas clases dependen de la conversación en
            grupo, y la ausencia de un solo estudiante puede tener un gran
            impacto
          </li>
          <li>
            Proporciona comentarios constructivos sobre tu experiencia en clase,
            en beneficio del maestro y otros padres.
          </li>
          <li>
            Participa en conversaciones civilizadas y habla y actúa con respeto
            por las diferentes opiniones.
          </li>
          <li>
            Ayude a mantener Open Mind un espacio seguro para estudiantes,
            familias y maestros de todos los orígenes, creencias y ubicaciones.
            Con ese fin, te alentamos a leer nuestro artículo sobre el Código de
            ética para dar clases en Open Mind.
          </li>
        </ul>
        <h4>Código de conducta del alumno</h4>
        <ul>
          <li>
            Se amable: ayuda a todos los alumnos a sentirse bienvenidos e
            incluidos.
          </li>
          <li>
            Mantente seguro: mantén tu información personal privada y nunca
            preguntes a otros alumnos por la suya (por ejemplo, dirección de
            correo electrónico, dirección postal, número de teléfono, etiquetas
            de jugador, etc.).
          </li>
          <li>
            Sé respetuoso: trata a los demás como quieres que te traten a ti.
            Vístete de manera apropiada para la clase; por favor asiste
            completamente vestido con la parte de arriba y la parte de abajo
            puestas.
          </li>
        </ul>
        <h4>Código de conducta de Open Mind</h4>
        <ul>
          <li>
            Damos la bienvenida a miembros de todos los orígenes, creencias y
            ubicaciones y estamos comprometidos a crear un espacio seguro para
            nuestros usuarios en todos los pilares de la diversidad.
          </li>
          <li>
            Escucharemos los comentarios de los padres, maestros y alumnos, y
            haremos los cambios correspondientes.
          </li>
          <li>
            Crearemos y aplicaremos políticas para crear una comunidad segura,
            confiable y de alta calidad para el aprendizaje. Esto puede incluir
            la eliminación de contenido o usuarios de la plataforma.
          </li>
          <li>
            Responderemos con prontitud a las preguntas y problemas que surjan.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EthicsManualForTeaching;

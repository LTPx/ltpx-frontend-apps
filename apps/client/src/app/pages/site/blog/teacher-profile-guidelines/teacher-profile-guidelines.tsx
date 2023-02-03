import styles from './teacher-profile-guidelines.module.scss';

/* eslint-disable-next-line */
export interface TeacherProfileGuidelinesProps {}

export function TeacherProfileGuidelines() {
  return (
    <div className={styles['content']}>
      <img
        alt="cover"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      />
      <div className={styles['information']}>
        <h1>Pautas para la imagen de perfil del docente</h1>
        <h4>
          A continuación, te damos unos consejos para tomar una gran foto para
          tu perfil de docente en Open Mind ,la imagen de tu perfil de docente
          debe cumplir con los siguientes estándares.
        </h4>
        <ul>
          <li>La foto debe haber sido tomada en el último año.</li>
          <li>Eres la única persona en la foto.</li>
          <li>La foto muestra tu cara claramente y de manera frontal.</li>
          <li>
            Usa un fondo simple y profesional que no distrae de tu rostro.
          </li>
          <li>Estás vestido de manera profesional.</li>
          <li>¡Estás sonriendo!</li>
        </ul>
        <h4>Requisitos del vídeo de perfil</h4>
        <p>
          También se le pedirá que suba un video de perfil de entre 10 segundos
          y 3 minutos de duración. Se recomienda que la duración sea entre 30 y
          90 segundos. Puede crear fácilmente un video profesional de alta
          calidad usando su computadora o teléfono inteligente y subir el
          archivo grabado en la plataforma. Open Mind admite cargas de video de
          hasta 100 MB; si su archivo es más grande, deberá comprimirlo antes de
          cargarlo. Tenga en cuenta que el propósito del video de perfil es
          presentarse como maestro y no pretende ser una clase de demostración.
        </p>
        <h4>
          <strong>Qué incluir</strong>
        </h4>
        <h4>
          Crea un guión corto y léalo en voz alta antes de grabar. Esto te
          ayudará a sonar más natural en cámara.
        </h4>
        <ol>
          <li>Preséntese por su nombre.</li>
          <li>
            Describa brevemente su trayectoria profesional. Mencione cualquier
            experiencia o educación que le ayude a construir su credibilidad
            como maestro. Siéntase libre de incluir información sobre su estilo
            y/o filosofía de enseñanza.
          </li>
          <li>
            Menciona los temas que enseñarás y qué te califica para enseñarlos.
            Sea agradable y conéctese con las familias. Cuenta un hecho
            divertido sobre ti o lo que te interesa.
          </li>
        </ol>
        <h4>
          Los videos de perfil no deben tener información de contacto del
          educador, incluidos los sitios web personales y los identificadores de
          redes sociales.
        </h4>
        <h4>
          No tienes que hacerlo bien en la primera toma. Date algunas
          oportunidades para sentirte cómodo. Mira tu video para comprobar cómo
          se ve y suena antes de enviarlo.
        </h4>
        <h4>Consejos visuales y de audio</h4>
        <ul>
          <li>
            <strong>Audio:</strong> asegúrate de que se te escucha claramente y
            sin ruido de fondo. Por lo general, los auriculares o un micrófono
            externo producirán un sonido de mejor calidad que el micrófono
            integrado de su computadora.
          </li>
          <li>
            <strong>Video:</strong> Recomendamos usar QuickTime (Mac) o Cámara
            (PC) para grabar su video. Si desea editar su video para agregar
            fotos, música o cualquier otra cosa, puede hacerlo, sin embargo, no
            es obligatorio. Puede usar iMovie (Mac) o Video Editor para Windows
            (PC) para armar varios clips.
          </li>
          <li>
            <strong>Encuadre:</strong> Coloca tu cámara o dispositivo a la
            altura de los ojos en una superficie estable para capturar tu rostro
            y cabeza completos. Si no tienes un trípode, usa una pila de libros
            o una caja para lograr la altura deseada. No sostengas tu teléfono o
            cámara en la mano, ya que producirá un video inestable. Asegúrate de
            grabar tu video horizontalmente si estás filmando en tu teléfono
            para que el video resultante no sea demasiado angosto.
          </li>
          <li>
            <strong>Iluminación:</strong> Tu rostro debe estar bien iluminado ya
            sea por luz natural o por lámparas. Si puede mover su lámpara,
            colóquela directamente frente a usted, a menos de un metro de
            distancia. Evite sentarse delante de una ventana u otra luz
            brillante para evitar la retroiluminación.
          </li>
          <li>
            <strong>Entorno:</strong> Muestre su "aula de origen" donde
            impartirá clases; esto establecerá las expectativas para la
            experiencia de la clase. Asegúrese de no tener desorden ni nada poco
            profesional detrás o a su alrededor. Está bien presentar múltiples
            configuraciones si eliges editar tu video.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TeacherProfileGuidelines;

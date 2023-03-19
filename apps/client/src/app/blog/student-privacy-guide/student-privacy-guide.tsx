import styles from './student-privacy-guide.module.scss';

/* eslint-disable-next-line */
export interface StudentPrivacyGuideProps {}

export function StudentPrivacyGuide() {
  return (
    <div className={styles['content']}>
      <img
        alt="cover"
        src="https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cnVsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
      />
      <div className={styles['information']}>
        <h1>Guía de privacidad del alumno</h1>
        <p>
          OpenMind se toma muy en serio la privacidad, ¡y tú también deberías
          hacerlo!
          <br />
          ¡Estamos muy emocionados de que te hayas unido a nuestra comunidad!
          Nos tomamos en serio tu privacidad y queremos que comprendas qué
          información tuya recopilamos y de sus padres, familiares u otros
          adultos que crearon tu cuenta (a quien llamaremos el "adulto de
          confianza"), por qué la recopilamos y qué hacemos con eso.
        </p>
        <h4>¿Qué es la privacidad y por qué es importante?</h4>
        <p>
          Si alguna vez has tenido un diario o has querido pasar tiempo a solas,
          probablemente ya sepas algo sobre la privacidad. La privacidad es la
          idea de que parte de tu información se mantiene en secreto para las
          personas que no deseas que la conozcan. Cuando usamos la palabra
          privacidad, nos referimos a cómo usamos y compartimos información
          sobre ti cuando tomas nuestras clases. También estamos hablando de
          cómo mantenemos la información sobre ti en secreto de otras personas.
        </p>
        <h4>¿Qué información recopilamos de sus adultos de confianza?</h4>
        <p>
          Cuando tu adulto de confianza crea una cuenta en OpenMind, nos brinda
          información sobre ti, como tu nombre y tu edad. También pueden
          compartir otra información sobre ti. Tu(s) adulto(s) de confianza
          también pueden enviar por correo electrónico cualquier pregunta o
          información sobre ti a su maestro o a alguien que podría ser su
          maestro.
        </p>
        <h4>¿Qué información recopilamos de ti?</h4>
        <p>
          Una vez que te registres en tu clase de OpenMind, puedes ingresar a tu
          propio espacio de aprendizaje y conectarte con otros alumnos de tu
          clase, así como con tu maestro. Cuando estás en tu espacio de
          aprendizaje, puedes crear y compartir cosas como mensajes privados,
          publicaciones, comentarios y otras cosas. Durante la clase, las cosas
          que haces y dices se muestran en vivo y se graban en video, solo con
          estar en clase. También obtenemos datos sobre cómo usas OpenMind, como
          las nuevas clases que consultas o las palabras que usas cuando busca
          nuevas clases.
        </p>
        <h4>¿Cómo usamos tu información?</h4>
        <p>
          Usamos la información que tú y tus adultos de confianza nos brindan
          para ayudar a mantener OpenMind seguro y mejorar OpenMind para ti y
          todos los demás. Por ejemplo, grabamos sus clases para asegurarnos de
          que la clase transcurrió sin problemas; también queremos que puedas
          ver la grabación después de clase si te perdiste la clase o
          simplemente quieres volver a verla. Analizamos las clases que has
          tomado y las cosas que buscas para poder informarte sobre otras clases
          que creemos que te gustarían.
        </p>
        <h4>¿Qué información compartimos y con quién?</h4>
        <p>
          Como nos preocupamos por tu privacidad, tomamos medidas para proteger
          la información que compartes cuando estás en clase. Lo que eso
          significa es que solo sus compañeros de clase, tus adultos de
          confianza y los maestros que también están en su clase, pueden ver tus
          publicaciones, videos y archivos adjuntos. Pero siempre debes tener
          cuidado con lo que compartes en clase o en línea. No compartas cosas
          que debes mantener en privado sobre ti, como la dirección de tu casa o
          tu dirección de correo electrónico. No compartas cosas privadas sobre
          otras personas como tus amigos o tu familia. Si no estás seguro,
          pregúntale a tu adulto de confianza.
        </p>
        <p>
          Podemos compartir su información si tus adultos de confianza dicen que
          está bien, o si es necesario debido a la ley. <br />
          Tus adultos de confianza pueden ver qué clases te gustan y la
          información que compartes en OpenMind. Por ejemplo, los adultos de
          confianza pueden ver los mensajes privados entre tu y tu maestro.
        </p>
      </div>
    </div>
  );
}

export default StudentPrivacyGuide;

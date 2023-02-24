import styles from './social-media-policy.module.scss';

/* eslint-disable-next-line */
export interface SocialMediaPolicyProps {}

export function SocialMediaPolicy() {
  return (
    <div className={styles['content']}>
      <img
        alt="cover"
        src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c29jaWFsJTIwbmV0d29ya3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
      />
      <div className={styles['information']}>
        <h1>Política de redes sociales para maestros</h1>
        <h4>
          Requisitos de Open Mind para el comportamiento de los maestros en las
          redes sociales.
        </h4>
        <p>
          Cuando te unes a la comunidad de Open Mind, aceptas seguir nuestras
          políticas, incluidos los estándares de nuestra comunidad. Esas
          expectativas incluyen comunicaciones reflexivas y profesionales con
          nuestra comunidad (colegas, padres, niños), modelar el comportamiento
          apropiado para nuestros alumnos y actuar profesionalmente.
        </p>
        <p>
          Este contrato social para tratar a su comunidad con respeto, no
          termina cuando se quita el sombrero de maestro y cierra la sesión de
          sus clases en Open Mind. Su contrato continúa con su uso de las redes
          sociales, blogs y otros foros en línea, en los que lo alentamos a que
          participe. Pueden brindar excelentes oportunidades para compartir
          recursos educativos, comercializar sus clases, conectarse en red y
          compartir información y puntos de vista privados y personales. Si bien
          ciertamente no le diremos cómo vivir su mejor vida como influencer o a
          qué grupos de Facebook unirse, le pedimos que continúe usando su mejor
          criterio y tenga en cuenta que su audiencia puede incluir a sus
          compañeros de Open Mind, comunidad, y estudiantes.
        </p>
        <p>
          Debido a que nuestro objetivo es crear y salvaguardar nuestra
          comunidad de confianza, la política de redes sociales de Open Mind
          establece parámetros, así como ejemplos específicos de comportamiento
          inaceptable en línea. ¡Estos comportamientos inapropiados no deberían
          ser noticia para usted! Aquí hay algunas reglas de oro que debe seguir
          cuando participe en grupos afiliados a Open Mind y en cualquier foro
          en línea:
        </p>
        <ul>
          <li>
            <strong>
              Mantenga el diálogo de nuestra comunidad seguro y acogedor:
            </strong>{' '}
            no provoque, intimide ni cree conflictos innecesarios: el debate
            solo es bienvenido cuando es saludable y está invitado.
          </li>
          <li>
            <strong> Sea respetuoso:</strong> no haga comentarios despectivos o
            irrespetuosos sobre los estudiantes, los maestros, los padres o el
            personal de Open Mind, incluso si no los identifica por su nombre.
          </li>
          <li>
            <strong> Sea amable:</strong> no comparta contenido que contenga o
            promueva discursos de odio, amenazas de violencia o peligro para los
            niños.
          </li>
          <li>
            <strong> Siga nuestra Política de privacidad:</strong> no comparta
            ninguna información de identificación personal o imágenes sobre
            padres o alumnos, que incluyen descripciones de ellos, voces,
            nombres, conversaciones.
          </li>
        </ul>
        <p>
          Además, si le preocupa su privacidad, asegúrese de configurar la
          visibilidad en sus páginas personales. Si bien esto puede ayudarlo a
          mantener separada su vida personal, también le advertimos que
          cualquier cosa que se comparta en línea podría terminar en el ámbito
          público. Nuestro consejo no solicitado: ¡trate todo lo que comparta en
          las redes sociales como público!
        </p>
        <p>
          Si Open Mind se da cuenta de un comportamiento en línea (ya sea en un
          foro afiliado a Open Mind o en una cuenta personal de redes sociales)
          que viola esta política o nuestros estándares comunitarios, podemos
          eliminar a docentes de la plataforma. Además, Open Mind se reserva el
          derecho de controlar y eliminar cualquier contenido publicado en un
          foro afiliado a Open Mind por cualquier motivo.
        </p>
        <p>
          Si tiene inquietudes sobre el comportamiento en línea de otro miembro
          de la comunidad, informe a seguridad@growOpenMinds.com. Tenga en
          cuenta que si bien Open Mind investigará y determinará un curso de
          acción apropiado, no participaremos en discusiones sobre el resultado
          ni discutiremos ningún otro contexto en el que implementemos esta
          política.
        </p>
      </div>
    </div>
  );
}

export default SocialMediaPolicy;

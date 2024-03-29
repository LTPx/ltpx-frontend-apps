import styles from './rules-teacher-profile.module.scss';

/* eslint-disable-next-line */
export interface RulesTeacherProfileProps {}

export function RulesTeacherProfile() {
  return (
    <div className={styles['content']}>
      <img
        alt="cover"
        src="https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJlc2VudGF0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
      />
      <div className={styles['information']}>
        <h1>Pautas para el perfil de docente</h1>
        <h4>
          Cómo crear un excelente perfil de docente y video de introducción para
          tu página de perfil de Open Mind.
        </h4>
        <p>
          Tu perfil de profesor te presenta a padres y alumnos. Debe utilizar un
          tono profesional. Aparecerá en tus clases y servirá como tu página de
          maestro personal. Tener un gran perfil les dará a los padres más
          confianza para inscribirse en tus clases. Tu video de perfil de
          maestro es una herramienta que puedes usar para promocionarte con los
          padres, mostrando tu profesionalismo y personalidad.
          <br />
          Requerimientos generales
        </p>
        <ul>
          <li>
            <strong>Nombre:</strong> Es el nombre que verán las familias y
            nuestro personal. Tu nombre para mostrar en Open Mind no necesita
            ser tu nombre completo, pero debe incluir al menos alguna variante
            de tu nombre legal. Te invitamos a incluir detalles sobre tus
            servicios o especialidades, como el tema que enseñas, o sufijos
            estándar como 'PhD', o 'Magister', para ayudar a construir tu
            negocio en Open Mind. No se permite el uso de contenido de marca,
            nombres de universidades u otros términos de marca registrada en tu
            nombre para mostrar. Ten en cuenta que este campo tiene una
            restricción de 50 caracteres y debe estar libre de caracteres
            especiales y emojis.
          </li>
          <li>
            <strong>Titular:</strong> Es una frase corta que aparece junto a tu
            nombre. Usa tu titular para mostrar tus puntos fuertes de enseñanza
            a las familias. Por ejemplo, ”'Ex profesor de química de escuela
            secundaria”
          </li>
          <li>
            <strong>País (no obligatorio):</strong> Se refiere a un banner de
            ubicación debajo de tu nombre. Compartir tu país de residencia en tu
            perfil de maestro puede ayudar a las familias a encontrar clases en
            la zona horaria adecuada.
          </li>
          <li>
            <strong>Foto:</strong> Una foto clara y directa de tu cara.
          </li>
          <li>
            <strong>Acerca de mí:</strong> Un párrafo (100-200 palabras) que
            describa tus antecedentes, experiencia docente e intereses. Las
            familias utilizan tu sección "Acerca de mí" para ayudarse en el
            proceso de búsqueda de clases, por lo que no debe tener errores
            ortográficos ni gramaticales. Esta sección no debe incluir enlaces a
            cuentas de redes sociales u otros sitios web (recuerde mantener toda
            la comunicación con las familias a través Open Mind).
          </li>
          <li>
            <strong>URL de perfil:</strong> la URL de su perfil es un enlace
            único que conduce a tu perfil, por ejemplo:
            growopenminds.com/docentes/profematematicas. Todos los maestros
            tienen una "URL de perfil" automática. Tenga en cuenta que el URL
            único se crea automáticamente a partir del nombre que Ud. elige para
            su perfil.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RulesTeacherProfile;

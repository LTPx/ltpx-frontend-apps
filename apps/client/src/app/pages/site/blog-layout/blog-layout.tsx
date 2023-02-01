import styles from './blog-layout.module.scss';

/* eslint-disable-next-line */
export interface BlogLayoutProps {}

export function BlogLayout(props: BlogLayoutProps) {
  const linksOpenMind = [
    { link: '¿Qué es Open Mind, que es el protocolo LTP y porque debo usarlos?'},
    { link: '¿Cómo funciona Open Mind?'},
    { link: '¿Cual es el beneficio de aprender de manera más eficiente en Open Mind?'},
    { link: '¿Cómo funciona el sistema de cobro por logros de Open Mind?'},
    { link: '¿Qué es y Cómo generar la Potenciación de Larga Duración (Long-Term Potentiation)?'},

  ]

  const linksTeacher = [
    { link: 'Manual de ética para dar clases en la plataforma Open Mind'},
    { link: 'Pautas para el perfil de docente'},
    { link: ' ¿Como evaluar a mis alumnos para recibir pagos en Open Mind?'},
    { link: 'Pautas para la imagen de perfil del docente'},
    { link: 'Política de redes sociales para maestros'},
    { link: 'Seguridad y privacidad del alumno: para profesores'},
  ]


  const linksStudent = [
    { link: 'Guía de privacidad del alumno'},
  ]


  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <img
          src="../../../../assets/images/illustration-cover.svg"
          alt="cover"
        />
        <div className={styles['information']}>
          <h1>Bienvenido al blog de Open Mind</h1>
          <p>
            Un directorio rápido de los blogs más populares de Open Mind sobre
            crianza de los hijos, educación en el hogar, plan de estudios, cómo
            complementar la educación de sus hijos y más.
            <br />
            Ya sea que esté educando en el hogar o buscando complementar la
            educación tradicional, tiene el poder de brindarles a sus hijos los
            recursos que necesitan.
          </p>
          <div className={styles['information-blog']}>
            <h2>Open Mind</h2>
            <p>
              {linksOpenMind.map((list) => (
                <ul>
                  <li>
                    <a>{list.link}</a>
                  </li>
                </ul>
              ))}
            </p>
            <h2>Profesores</h2>
            <p>
              {linksTeacher.map((list) => (
                <ul>
                  <li>
                    <a>{list.link}</a>
                  </li>
                </ul>
              ))}
            </p>
            <h2>Alumnos</h2>
            <p>
              {linksStudent.map((list) => (
                <ul>
                  <li>
                    <a>{list.link}</a>
                  </li>
                </ul>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogLayout;

import { NavLink } from 'react-router-dom';
import styles from './blog-home.module.scss';

export function BlogHome() {
  const linksOpenMind = [
    {
      text: '¿Qué es Open Mind, que es el protocolo LTP y porque debo usarlos?',
      url: '/blog/what-is-openMind',
    },
    { text: '¿Cómo funciona Open Mind?', url: '/blog/how-openMind-works' },
    {
      text: '¿Cual es el beneficio de aprender de manera más eficiente en Open Mind?',
      url: '/blog/learning-in-openMind',
    },
    {
      text: '¿Cómo funciona el sistema de cobro por logros de Open Mind?',
      url: '/blog/achievement-payment-system',
    },
    {
      text: '¿Qué es y Cómo generar la Potenciación de Larga Duración (Long-Term Potentiation)?',
      url: '/blog/long-term-potentiation',
    },
  ];

  const linksTeacher = [
    {
      text: 'Manual de ética para dar clases en la plataforma Open Mind',
      url: '/blog/ethics-manual-for-teaching',
    },
    {
      text: 'Pautas para el perfil de docente',
      url: '/blog/guidelines-teacher-profile',
    },
    {
      text: ' ¿Como evaluar a mis alumnos para recibir pagos en Open Mind?',
      url: '/blog/evaluate-to-receive-payments',
    },
    {
      text: 'Pautas para la imagen de perfil del docente',
      url: '/blog/teacher-profile-guidelines',
    },
    {
      text: 'Política de redes sociales para maestros',
      url: '/blog/social-media-policy',
    },
    {
      text: 'Seguridad y privacidad del alumno: para profesores',
      url: '/blog/student-safety-privacy',
    },
  ];

  const linksStudent = [
    {
      text: 'Guía de privacidad del alumno',
      url: '/blog/student-privacy-guide',
    },
  ];

  return (
    <div className={styles['content']}>
      <img src="../../../../assets/images/illustration-cover.svg" alt="cover" />
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
            {linksOpenMind.map((link) => (
              <ul>
                <li>
                  <NavLink to={link.url}>{link.text}</NavLink>
                </li>
              </ul>
            ))}
          </p>
          <h2>Profesores</h2>
          <p>
            {linksTeacher.map((link) => (
              <ul>
                <li>
                  <NavLink to={link.url}>{link.text}</NavLink>
                </li>
              </ul>
            ))}
          </p>
          <h2>Alumnos</h2>
          <p>
            {linksStudent.map((link) => (
              <ul>
                <li>
                  <NavLink to={link.url}>{link.text}</NavLink>
                </li>
              </ul>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogHome;

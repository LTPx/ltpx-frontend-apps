import { NavLink } from 'react-router-dom';
import { useBlog } from '../useBlog';
import styles from './blog-home.module.scss';

export function BlogHome() {
  const {
    linksOpenMind,
    linksStudent,
    linksTeacher
  } = useBlog();

  return (
    <div className={styles['content']}>
      <img src="https://res.cloudinary.com/dslqbzdfy/image/upload/v1675456150/openmind/openmide-blog-bg_b8mstr.jpg" alt="cover" />
      <div className={styles['information']}>
        <h1>Bienvenido al blog de Openmind</h1>
        <p>
          Un directorio rápido de los blogs más populares de Openmind acerca de
          la educación en el hogar, planes de estudios, cómo complementar la
          educación de sus hijos y más.
          <br />
          Ya sea que esté educando en el hogar o buscando complementar la
          educación tradicional, tiene el poder de brindarles a sus hijos los
          recursos que necesitan.
        </p>
        <div className={styles['information-blog']}>
          <h2>Openmind</h2>
          <ul >
            {linksOpenMind.map((link, key) => (
                <li key={key}>
                  <NavLink to={link.url}>{link.text}</NavLink>
                </li>
            ))}
          </ul>
          <h2>Profesores</h2>
          <ul>
            {linksTeacher.map((link, key) => (
              <li key={key}>
                <NavLink to={link.url}>{link.text}</NavLink>
              </li>
            ))}
          </ul>
          <h2>Alumnos</h2>
          <ul>
            {linksStudent.map((link, key) => (
              <li key={key}>
                <NavLink to={link.url}>{link.text}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BlogHome;

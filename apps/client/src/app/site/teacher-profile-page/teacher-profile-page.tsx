import { TeacherProfile } from '@ltpx-frontend-apps/shared-ui';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import ProfileUser from 'libs/shared-ui/src/lib/profile-user/profile-user';

import styles from './teacher-profile-page.module.scss';

/* eslint-disable-next-line */
export interface TeacherProfilePageProps {}

export function TeacherProfilePage(props: TeacherProfilePageProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <TeacherProfile
          img={'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGVhY2hlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60'}
          nameTeacher={'Katherine Causbie'}
          profession={'Fotógrafa'}
          biography={'¡Hola! ¡Soy una profesora en Openmind a la que le encanta compartir clases de fotografía artística y psicología humano-animal! Mi objetivo es ofrecer experiencias de aprendizaje de alta calidad que apoyen la curiosidad, la inspiración y la comprensión. Todas las clases se llevan a cabo en línea en Openmind. Como maestro, me baso en muchas experiencias profesionales y académicas diferentes, junto con una experiencia trabajando y enseñando a niños y adolescentes en una variedad de entornos: programas de enriquecimiento, iniciativas comunitarias, exploración, cooperativas de educación en el hogar, escuelas públicas, aulas Montessori y cuidado de la salud mental. Tengo una licenciatura de la Universidad de Wittenberg con una doble especialización en Studio Art (Fotografía) y Psicología Social Crítica, y una especialización en Historia del Arte.'}
          rating={4} reviews={23} students={10} courses={4}        />
      </div>
    </div>
  );
}

export default TeacherProfilePage;

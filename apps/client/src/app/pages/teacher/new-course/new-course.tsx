import { Button, ColorsButton, Input, Select } from '@ltpx-frontend-apps/shared-ui';
import CourseGeneralInformation from '../course/course-general-information/course-general-information';
import styles from './new-course.module.scss';

/* eslint-disable-next-line */
export interface NewCourseProps {}

const optionsSave = [
  {value: 'draff', text: 'Borrador'},
  {value: 'public', text: 'Publicar'},
];

export function NewCourse(props: NewCourseProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h3>Crear Curso</h3>
        <div className={styles['actions']}>
          <h5 className='muted'>Creado: Diciembre 21 2022</h5>
          <Button title='Preview' outline={true}/>
          <Select options={optionsSave} />
          <Button title='Guardar' color={ColorsButton.primary}/>
        </div>
      </div>
      <div className={styles['content']}>
        <div className={styles['course-sections']}>
          <section>
            Informacion General
          </section>
          <section>
            Contenidos
          </section>
          <section>
            Tests
          </section>
          <section>
            Logros
          </section>
        </div>
        <div className={styles['course-section-content']}>
          <CourseGeneralInformation/>
        </div>
      </div>
    </div>
  );
}

export default NewCourse;

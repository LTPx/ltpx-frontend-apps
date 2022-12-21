import { Button, ColorsButton, Input, Select, Tabs } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import Achievement from '../achievement/achievement';
import CourseContents from '../course/course-contents/course-contents';
import CourseGeneralInformation from '../course/course-general-information/course-general-information';
import Quiz from '../quiz/quiz';
import styles from './new-course.module.scss';

/* eslint-disable-next-line */
export interface NewCourseProps {}

const optionsSave = [
  {value: 'draff', text: 'Borrador'},
  {value: 'public', text: 'Publicar'},
];

const tabs = [
  {text: 'Informacion General'},
  {text: 'Contenidos'},
  {text: 'Test'},
  {text: 'Logros'},
];

export function NewCourse(props: NewCourseProps) {
  const [indexViewSelected, setIndexViewSelected] = useState(0);

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
          <Tabs
            tabs={tabs}
            vertical={true}
            onClickTab={(index)=>{setIndexViewSelected(index)}}
          />
        </div>
        <div className={styles['course-section-content']}>
          <section>
            { indexViewSelected === 0 && (
              <CourseGeneralInformation/>
            )}
            { indexViewSelected === 1 && (
              <CourseContents/>
            )}
            { indexViewSelected === 2 && (
              <Quiz/>
            )}
            { indexViewSelected === 3 && (
              <Achievement/>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default NewCourse;

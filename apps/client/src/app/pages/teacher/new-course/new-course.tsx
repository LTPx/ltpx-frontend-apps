import { Button, ColorsButton, Input, Select, Tabs, TypeButton } from '@ltpx-frontend-apps/shared-ui';
import { useFormik } from 'formik';
import { useState } from 'react';
import Achievement from '../achievement/achievement';
import CourseContents from '../course/course-contents/course-contents';
import CourseGeneralInformation from '../course/course-general-information/course-general-information';
import CourseSettings from '../course/course-settings/course-settings';
import Quiz from '../quiz/quiz';
import TeacherClasses from '../teacher-classes/teacher-classes';
import styles from './new-course.module.scss';
import * as Yup from 'yup';

/* eslint-disable-next-line */
export interface NewCourseProps {}

const optionsSave = [
  {value: 'draff', text: 'Borrador'},
  {value: 'public', text: 'Publicar'},
];

const tabs = [
  {text: 'Informacion General'},
  {text: 'Contenidos'},
  {text: 'Agendar Clases'},
  {text: 'Test'},
  {text: 'Logros'},
  {text: 'Settings'},
];

export function NewCourse(props: NewCourseProps) {
  const [indexViewSelected, setIndexViewSelected] = useState(0);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      language: '',
      level: '',
      goals: '',
      requirements: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('es obligatorio'),
      description: Yup.string().required('es obligatorio'),
      category: Yup.string().required('es obligatorio'),
      language: Yup.string().required('es obligatorio'),
      level: Yup.string().required('es obligatorio'),
      goals: Yup.string().required('es obligatorio'),
      requirements: Yup.string().required('es obligatorio'),
    }),
    onSubmit: async formData => {
      console.log(formData);
    }
  });

  return (
    <div className={styles['container']}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles['header']}>
          <h3>Crear Curso</h3>
          <div className={styles['actions']}>
            <h5 className='muted'>Creado: Diciembre 21 2022</h5>
            <Button title='Preview' outline={true}/>
            <Select options={optionsSave} />
            <Button
              title='Guardar'
              color={ColorsButton.primary}
              type={TypeButton.submit}
            />
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
                <CourseGeneralInformation formik={formik}/>
              )}
              { indexViewSelected === 1 && (
                <CourseContents/>
              )}
              { indexViewSelected === 2 && (
                <TeacherClasses/>
              )}
              { indexViewSelected === 3 && (
                <Quiz/>
              )}
              { indexViewSelected === 4 && (
                <Achievement/>
              )}
              { indexViewSelected === 5 && (
                <CourseSettings/>
              )}
            </section>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewCourse;

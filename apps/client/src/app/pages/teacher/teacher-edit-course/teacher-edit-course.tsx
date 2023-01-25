import { CourseLanguage, CourseLevel, getTeacherCourse, TeacherCourse } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, CourseContents, Select, Tabs, TypeButton } from '@ltpx-frontend-apps/shared-ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourse } from '../../../store';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './teacher-edit-course.module.scss';
import CourseGeneralInformation from '../course/course-general-information/course-general-information';
import TeacherClasses from '../teacher-classes/teacher-classes';
import Quiz from '../quiz/quiz';
import Achievement from '../achievement/achievement';


const optionsSave = [
  { value: 'draff', text: 'Borrador' },
  { value: 'public', text: 'Enviar a Revision' },
];

const linksEditCourse = [
  { selected: true, text: 'Detalles' },
  { selected: false, text: 'Contenidos' },
  { selected: false, text: 'Test' },
  { selected: false, text: 'Logros' },
  { selected: false, text: 'Configuraciones' },
];

/* eslint-disable-next-line */
export interface TeacherEditCourseProps {}

export function TeacherEditCourse(props: TeacherEditCourseProps) {
  const [ course, setCourse ] = useState<TeacherCourse>();
  const [ indexSelectedView, setIndexSelectedView ] = useState(0);

  const params = useParams();

  useEffect(() => {
    let mounted = true;
    try {
      const { courseId } = params;
      if (courseId) {
        getTeacherCourse(courseId).then((course) => {
          if (mounted) {
            setCourse(course);
            console.log('course: ', course);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      mounted = false;
    };
  }, []);


  const formik = useFormik({
    initialValues: {
      cover: null,
      title: '',
      description: '',
      category: '',
      language: CourseLanguage.es,
      level: CourseLevel.begging,
      learn_goals: '',
      requirements: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('es obligatorio'),
      description: Yup.string().required('es obligatorio'),
    }),
    onSubmit: async (formData) => {
      console.log('formData: ', formData);
      // const courseData = {
      //   ...formData,
      //   ...{
      //     contents: contents,
      //     classroom: classroomData,
      //   },
      // };
      // console.log('courseData: ', courseData);
      // const { saved, data } = await createCourse(courseData);
      // if (saved) {
      //   navigate('/teacher/courses/all');
      // } else {
      //   console.log('error: ', data);
      // }
    },
  });


  return (
    <div className={styles['container']}>
      { course && (
        <div className={styles['container']}>
          <div className={styles['header']}>
            <h3>{course.title}</h3>
            <div className={styles['actions']}>
              <h5 className="muted">Creado: Diciembre 21 2022</h5>
              <Button
                title="Preview"
                outline={true}
                color={ColorsButton.secondary}
              />
              <Select options={optionsSave} />
              <Button
                title="Guardar"
                color={ColorsButton.primary}
                type={TypeButton.submit}
                onClick={formik.submitForm}
              />
            </div>
          </div>
          <div className={styles['content']}>
            <Tabs tabs={linksEditCourse} onClickTab={(index)=>{
              setIndexSelectedView(index);
            }}/>
            <div className={styles['course-section-content']}>
              <section className={`${styles['section']} ${indexSelectedView === 0 ? styles['selected'] : ''}`}>
                <CourseGeneralInformation />
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 1 ? styles['selected'] : ''}`}>
                {/* <CourseContents
                  onChange={(forms: any) => {
                    // setContents(forms);
                  }}
                /> */}
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 2 ? styles['selected'] : ''}`}>
                <TeacherClasses
                  onSubmit={(data) => {
                    // handleClasses(data);
                  }}
                />
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 3 ? styles['selected'] : ''}`}>
                <Quiz />
              </section>
              <section className={`${styles['section']} ${indexSelectedView === 4 ? styles['selected'] : ''}`}>
                <Achievement />
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherEditCourse;

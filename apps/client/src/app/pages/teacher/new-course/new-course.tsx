import {
  Button,
  ColorsButton,
  QuizBuilder,
  Select,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import { useFormik } from 'formik';
import { useState } from 'react';
import Achievement from '../achievement/achievement';
import CourseContents from '../course/course-contents/course-contents';
import CourseGeneralInformation from '../course/course-general-information/course-general-information';
import Quiz from '../quiz/quiz';
import TeacherClasses from '../teacher-classes/teacher-classes';
import styles from './new-course.module.scss';
import * as Yup from 'yup';
import { useTeacher } from '../../../store';
import {
  ContentCourse,
  CourseLanguage,
  CourseLevel,
} from '@ltpx-frontend-apps/api';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface NewCourseProps {}

const optionsSave = [
  { value: 'draff', text: 'Borrador' },
  { value: 'public', text: 'Enviar a Revision' },
];

export function NewCourse(props: NewCourseProps) {
  const [classroomData, setClassroomData] = useState();
  const [contents, setContents] = useState<ContentCourse[]>([]);
  const { createCourse } = useTeacher();
  const navigate = useNavigate();

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
      const courseData = {
        ...formData,
        ...{
          contents: contents,
          classroom: classroomData,
        },
      };
      console.log('courseData: ', courseData);
      const { saved, data } = await createCourse(courseData);
      if (saved) {
        navigate('/teacher/courses/all');
      } else {
        console.log('error: ', data);
      }
    },
  });

  const handleClasses = (formClasses: any) => {
    console.log('formClasses: ', formClasses);
    setClassroomData(formClasses);
  };

  return (
    <div className={styles['container']}>
      <form>
        <div className={styles['header']}>
          <h3>Crear Curso</h3>
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
          <div className={styles['course-section-content']}>
            <section className={styles['section']}>
              <CourseGeneralInformation formik={formik} />
            </section>
            <section className={styles['section-gray']}>
              <CourseContents
                onChange={(forms: any) => {
                  setContents(forms);
                }}
              />
            </section>
            <section className={styles['section']}>
              <TeacherClasses
                onSubmit={(data) => {
                  handleClasses(data);
                }}
              />
            </section>
            <section className={styles['section-gray']}>
              <Quiz />
            </section>
            <section className={styles['section']}>
              <Achievement />
            </section>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewCourse;

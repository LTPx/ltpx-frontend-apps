import { CourseLanguage, CourseLevel } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, FileUpload, Input, Select, TextArea, TypeButton } from '@ltpx-frontend-apps/shared-ui';
import { useCourse } from 'apps/client/src/app/store/hooks/useCourse';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './course-general-information.module.scss';

/* eslint-disable-next-line */
export interface CourseGeneralInformationProps {
  // formik: FormikValues;
}

export function CourseGeneralInformation(props: CourseGeneralInformationProps) {
  const { categories, languages, levels } = useCourse();
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
    },
  });

  return (
    <form className={styles['container']} onSubmit={formik.handleSubmit}>
      {/* <div className={styles['header-text']}>
        <h2>Información General</h2>
        <h4 className='muted'>Esta información atraerá usuarios a tomar este curso</h4>
      </div> */}
      <section className={styles['text']}>
        <h3>Portada del curso</h3>
        <div className={styles['upload-media']}>
          <FileUpload
            onChange={(file)=>{ formik.setFieldValue('cover', file)}}
            name='cover'
          />
        </div>
      </section>
      <div className={styles['text']}>
        <Input
          label='Nombre del curso'
          placeholder='Evita nombres confusos'
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          onBlur={formik.handleBlur}
          errorMessage={formik.errors.title}
        />
        <TextArea
          label='Descripción del curso'
          placeholder='Un breve resumen de lo que trata este curso'
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
          rows={8}
        />
      </div>
      <div className={styles['selects-form']}>
        <Select
          label='Categoría'
          options={categories}
          onChange={option => formik.setFieldValue('category', option.value)}
        />
        <Select
          label='Nivel'
          options={levels}
          onChange={option => formik.setFieldValue('level', option.value)}
        />
        <Select
          label='Idioma'
          options={languages}
          onChange={option => formik.setFieldValue('language', option.value)}
        />
      </div>
      <div className={styles['text']}>
        <TextArea
          placeholder='Pueden se puntos claves del curso'
          label='Que aprenderán los estudiantes?'
          name="learn_goals"
          onChange={formik.handleChange}
          value={formik.values.learn_goals}
          onBlur={formik.handleBlur}
          rows={5}
        />
        <TextArea
          label='Requerimientos'
          placeholder='Los estudiantes necesitan algún recurso antes de tomar este curso'
          name="requirements"
          onChange={formik.handleChange}
          value={formik.values.requirements}
          onBlur={formik.handleBlur}
          rows={5}
        />
      </div>
      <div className={styles['footer']}>
        <Button
          title='Cancelar'
          color={ColorsButton.white}
        />
        <Button
          title='Actualizar información'
          color={ColorsButton.secondary}
          type={TypeButton.submit}
        />
      </div>
    </form>
  );
}

export default CourseGeneralInformation;

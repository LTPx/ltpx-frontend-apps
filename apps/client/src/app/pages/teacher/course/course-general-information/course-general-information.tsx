import { FileUpload, Input, Select, TextArea } from '@ltpx-frontend-apps/shared-ui';
import { FormikValues } from 'formik';
import styles from './course-general-information.module.scss';

const categories = [
  {value: 'design', text: 'Diseño'},
  {value: 'business', text: 'Negocios'},
  {value: 'software_development', text: 'Desarrollo de Software'},
  {value: 'personal_development', text: 'Desarrollo Personal'},
  {value: 'photography', text: 'Fotografía'},
  {value: 'audio', text: 'Audio + Música'},
  {value: 'marketing', text: 'Marketing'},
  {value: 'finance', text: 'Finanzas'},
  {value: 'other', text: 'Otros'},
];

const levels = [
  {value: 'beginner', text: 'Básico'},
  {value: 'medium', text: 'Intermedio'},
  {value: 'advance', text: 'Avanzado'},
  {value: 'all', text: 'Todos los niveles'},
];

const languages = [
  {value: 'es', text: 'Español'},
  {value: 'en', text: 'Ingles'},
];

/* eslint-disable-next-line */
export interface CourseGeneralInformationProps {
  formik: FormikValues;
}

export function CourseGeneralInformation(props: CourseGeneralInformationProps) {
  const { formik } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>Información General</h2>
        <h4 className='muted'>Esta información atraerá usuarios a tomar este curso</h4>
      </div>
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
          onChange={(e: any) => { formik.handleChange(e); }}
          value={formik.values.title}
          onBlur={formik.handleBlur}
        />
        <TextArea
          label='Descripcion del curso'
          placeholder='Un breve resumen de lo que trata este curso'
          name="description"
          onChange={(e: any) => { formik.handleChange(e); }}
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
          onChange={(e: any) => { formik.handleChange(e); }}
          value={formik.values.learn_goals}
          onBlur={formik.handleBlur}
          rows={5}
        />
        <TextArea
          label='Requerimientos'
          placeholder='Los estudiantes necesitan algún recurso antes de tomar este curso'
          name="requirements"
          onChange={(e: any) => { formik.handleChange(e); }}
          value={formik.values.requirements}
          onBlur={formik.handleBlur}
          rows={5}
        />
      </div>
    </div>
  );
}

export default CourseGeneralInformation;

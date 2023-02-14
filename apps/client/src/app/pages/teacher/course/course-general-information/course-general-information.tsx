import { CourseLanguage, CourseLevel } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  FileUpload,
  Input,
  Select,
  TextArea,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse, useCourseUtil } from '@ltpx-frontend-apps/store';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { ResponseRequest } from '../../teacher-edit-course/teacher-edit-course';
import styles from './course-general-information.module.scss';

/* eslint-disable-next-line */
export interface CourseGeneralInformation {
  title: string;
  cover?: string;
  description?: string;
  category?: string;
  language?: CourseLanguage;
  level?: CourseLevel;
  learn_goals?: string;
  requirements?: string;
}
export interface CourseGeneralInformationProps
  extends CourseGeneralInformation {
  onSubmit?: (data: ResponseRequest) => void;
}

export function CourseGeneralInformation(props: CourseGeneralInformationProps) {
  const {
    cover,
    title,
    description,
    category,
    language,
    level,
    learn_goals,
    requirements,
    onSubmit,
  } = props;
  const { categories, languages, levels } = useCourseUtil();
  const { updateCourse } = useCourse();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title: title,
      cover: cover,
      description: description || '',
      category: category,
      language: language,
      level: level,
      learn_goals: learn_goals || '',
      requirements: requirements || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('es obligatorio'),
    }),
    onSubmit: async (formData) => {
      try {
        const isFile = typeof formData.cover !== 'string';
        if (!isFile) {
          // could be a url img
          delete formData.cover;
        }
        const { data } = await updateCourse(formData);
        onSubmit &&
          onSubmit({
            success: true,
            data,
          });
      } catch (error) {
        onSubmit &&
          onSubmit({
            success: false,
            error,
          });
      }
    },
  });

  return (
    <form className={styles['container']} onSubmit={formik.handleSubmit}>
      <section className={styles['text']}>
        <h3>{t('courseInformation.cover')}</h3>
        <div className={styles['upload-media']}>
          <FileUpload
            image={cover}
            onChange={(file) => {
              formik.setFieldValue('cover', file);
            }}
            name="cover"
          />
        </div>
      </section>
      <div className={styles['text']}>
        <Input
          label={t('courseInformation.title') || ''}
          placeholder="Evita nombres confusos"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          onBlur={formik.handleBlur}
          errorMessage={formik.errors.title}
        />
        <TextArea
          label={t('courseInformation.description') || ''}
          placeholder="Un breve resumen de lo que trata este curso"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
          rows={8}
        />
      </div>
      <div className={styles['selects-form']}>
        <Select
          label={t('courseInformation.category') || ''}
          options={categories}
          onChange={(option) => formik.setFieldValue('category', option.value)}
        />
        <Select
          label={t('courseInformation.level') || ''}
          options={levels}
          onChange={(option) => formik.setFieldValue('level', option.value)}
        />
        <Select
          label={t('courseInformation.language') || ''}
          options={languages}
          onChange={(option) => formik.setFieldValue('language', option.value)}
        />
      </div>
      <div className={styles['text']}>
        <TextArea
          placeholder="Pueden se puntos claves del curso"
          label={t('courseInformation.learn_goals') || ''}
          name="learn_goals"
          onChange={formik.handleChange}
          value={formik.values.learn_goals}
          onBlur={formik.handleBlur}
          rows={5}
        />
        <TextArea
          label={t('courseInformation.requirements') || ''}
          placeholder="Los estudiantes necesitan algún recurso antes de tomar este curso"
          name="requirements"
          onChange={formik.handleChange}
          value={formik.values.requirements}
          onBlur={formik.handleBlur}
          rows={5}
        />
      </div>
      <div className={styles['footer']}>
        <Button title={t('buttons.cancel')} color={ColorsButton.white}
        link={'/teacher/courses/all'} />
        <Button
          title={t('buttons.updateInformation')}
          color={ColorsButton.secondary}
          type={TypeButton.submit}
        />
      </div>
    </form>
  );
}

export default CourseGeneralInformation;

import {
  CourseLanguage,
  CourseLevel,
  FormatResponse,
} from '@ltpx-frontend-apps/api';
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
import styles from './course-general-information.module.scss';
import { useCallback, useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface CourseGeneralInformation {
  title: string;
  cover?: string;
  description?: string;
  category_id?: string;
  language?: CourseLanguage;
  level?: CourseLevel;
  learn_goals?: string;
  requirements?: string;
  sendDataToParent?: (isDirty: boolean) => void;
}
export interface CourseGeneralInformationProps
  extends CourseGeneralInformation {
  onSubmit?: (data: FormatResponse) => void;
}

export function CourseGeneralInformation(props: CourseGeneralInformationProps) {
  const {
    cover,
    title,
    description,
    category_id,
    language,
    level,
    learn_goals,
    requirements,
    onSubmit,
    sendDataToParent
  } = props;
  const { languages, levels } = useCourseUtil();
  const { _updateCourse, cleanCourse, _getAllCategories, allCategories } =
    useCourse();
  const { t } = useTranslation();
  const [isFormDirty, setIsFormDirty] = useState(false);


  const fetchData = useCallback(async () => {
    await _getAllCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: title,
      cover: cover,
      description: description || '',
      category_id: category_id,
      language: language,
      level: level,
      learn_goals: learn_goals || '',
      requirements: requirements || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('es obligatorio'),
      cover: Yup.mixed().test(
        'cover',
        'El archivo debe ser menor o igual a 2mb',
        (value) => {
          if (value && value.size) {
            const fileSize = value.size;
            const fileMb = fileSize / 1024 ** 2;
            return fileMb <= 2;
          } else {
            return true;
          }
        }
      ),
    }),
    onSubmit: async (formData) => {
      try {
        const isFile = typeof formData.cover !== 'string';
        if (!isFile) {
          // could be a url img
          delete formData.cover;
        }
        const { data } = await _updateCourse(formData);
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

  useEffect(() => {
    if (sendDataToParent && isFormDirty) {
      sendDataToParent(formik.dirty);
    }
  }, [formik.dirty, isFormDirty, sendDataToParent]);

  useEffect(() => {
    const data = 'Hola, soy un dato desde el componente hijo';
    setIsFormDirty(true);
    fetchData();
  }, [fetchData]);

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
            errorMessage={
              formik.touched.cover && formik.errors.cover
                ? formik.errors.cover
                : null
            }
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
          selected={category_id}
          options={allCategories}
          onChange={(option) =>
            formik.setFieldValue('category_id', option.value)
          }
        />
        <Select
          label={t('courseInformation.level') || ''}
          selected={level}
          options={levels}
          onChange={(option) => formik.setFieldValue('level', option.value)}
        />
        <Select
          label={t('courseInformation.language') || ''}
          selected={language}
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
        <Button
          title={t('buttons.cancel')}
          color={ColorsButton.white}
          link={'/teacher/courses/all'}
          onClick={() => {
            cleanCourse();
          }}
        />
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

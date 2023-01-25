import styles from './new-course-form.module.scss';
import {
  Button,
  ColorsButton,
  Input,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
/* eslint-disable-next-line */
export interface NewCourseFormProps {
  onSubmit: (data: {title: string}) => void;
}

export function NewCourseForm(props: NewCourseFormProps) {
  const { onSubmit } = props;

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Titulo es obligatorio'),
    }),
    onSubmit: (data) => {
      console.log(data);
      onSubmit(data);
    },
  });

  return (
    <form className={styles['form']}>
      <Input
        label="Nombre del curso"
        name="title"
        placeholder="myemail@example.com"
        onChange={(e: any) => {
          formik.handleChange(e);
        }}
        value={formik.values.title}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.title}
      />
      <Button
        className={styles['btn-submit']}
        color={ColorsButton.primary}
        title="Crear Curso"
        full={true}
        type={TypeButton.submit}
        onClick={formik.handleSubmit}
      />
    </form>
  );
}

export default NewCourseForm;

import Input from '../input/input';
import styles from './category-form.module.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Category } from '@ltpx-frontend-apps/api';
import Button, { ColorsButton, TypeButton } from '../button/button';

/* eslint-disable-next-line */
export interface CategoryFormProps {
  onClose?: () => void;
  category?: Category;
  onSave?: (category: Category) => void;
}

export function CategoryForm(props: CategoryFormProps) {
  const { category, onSave, onClose } = props;

  const formik = useFormik({
    initialValues: {
      name: category?.name || '',
      slug: category?.slug || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Se debe asignar un nombre a la categoría'),
      slug: Yup.string()
        .required('Se debe asignar un slug a la categoría')
        .matches(/^\S*$/, 'No se permiten espacios en blanco'),
    }),
    onSubmit: (form) => {
      if (form.name && form.slug) {
        onSave && onSave(form);
      }
      onClose && onClose();
    },
  });

  return (
    <form className={styles['add-category']}>
      <div className={styles['category']}>
        <Input
          label="Nombre de Categoría"
          type="text"
          name="name"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          errorMessage={formik.errors.name}
        />
        <Input
          label="Slug"
          type="text"
          name="slug"
          value={formik.values.slug}
          onBlur={formik.handleBlur}
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          errorMessage={formik.errors.slug}
        />
      </div>
      <div className={styles['footer']}>
        <Button
          title="Cancelar"
          color={ColorsButton.white}
          onClick={() => {
            onClose && onClose();
          }}
        />
        <Button
          title="Guardar"
          type={TypeButton.submit}
          onClick={formik.handleSubmit}
        />
      </div>
    </form>
  );
}

export default CategoryForm;

import Input from '../input/input';
import styles from './category-form.module.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Category } from '@ltpx-frontend-apps/api';
import Button, { ColorsButton, TypeButton } from '../button/button';
import SelectIcons from '../select-icons/select-icons';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';

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
      icon: category?.icon || '',
    },
    validationSchema: Yup.object({
      icon: Yup.string().required('Se debe asignar un icono a la categoría'),
      name: Yup.string().required('Se debe asignar un nombre a la categoría'),
      slug: Yup.string()
        .required('Se debe asignar un slug a la categoría')
        .matches(/^\S*$/, 'No se permiten espacios en blanco'),
    }),
    onSubmit: (form) => {
      if (form.name && form.slug && form.icon) {
        onSave && onSave(form);
      }
      onClose && onClose();
    },
  });

  return (
    <form className={styles['add-category']}>
      <div className={styles['category']}>
        <div className={styles['category-inputs']}>
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
        <div className={styles['select-icons']}>
          <h4 className={styles['title-icons']}>Seleccionar Icono</h4>
          <div className={styles['section-error']}>
            {formik.errors.icon && (
              <InputTextStatus
                status={StatusInputText.error}
                text={formik.errors.icon}
              />
            )}
          </div>
          <SelectIcons
            selected={formik.values.icon}
            onChange={(icon) => {
              formik.setFieldValue('icon', icon);
            }}
          />
        </div>
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

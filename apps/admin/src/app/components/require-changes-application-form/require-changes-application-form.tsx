import {
  Button,
  ColorsButton,
  TextArea,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './require-changes-application-form.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/* eslint-disable-next-line */
export interface RequireChangesApplicationFormProps {
  onCancel: () => void;
  onSubmit: (data: { comment: string }) => void;
}

export function RequireChangesApplicationForm(
  props: RequireChangesApplicationFormProps
) {
  const { onCancel, onSubmit } = props;

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(
        'No se puede enviar observaciones en blanco'
      ),
    }),
    onSubmit: async (formData) => {
      console.log(formData);
      onSubmit(formData);
    },
  });

  return (
    <div className={styles['container']}>
      <TextArea
        label="Observaciones"
        rows={8}
        placeholder="Describe los cambios que el usuario necesita realizar"
        name="comment"
        value={formik.values.comment}
        onChange={(e: any) => {
          formik.handleChange(e);
        }}
      />
      <div className={styles['footer']}>
        <Button
          title="Cancelar"
          color={ColorsButton.white}
          onClick={onCancel}
        />
        <Button
          title="Solicitar cambios"
          type={TypeButton.submit}
          onClick={formik.handleSubmit}
        />
      </div>
    </div>
  );
}

export default RequireChangesApplicationForm;

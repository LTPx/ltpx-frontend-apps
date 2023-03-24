import { useFormik } from 'formik';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Drawer from '../drawer/drawer';
import Input from '../input/input';
import Select from '../select/select';
import * as Yup from 'yup';
import styles from './new-class-form.module.scss';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';

/* eslint-disable-next-line */
export interface NewClassFormProps {
  open?: boolean;
  onClose?: () => void;
}

export function NewClassForm(props: NewClassFormProps) {
  const { open, onClose } = props;
  const formik = useFormik({
    initialValues: {
      date_time: '',
      course_select: '',
    },
    validationSchema: Yup.object({
      date_time: Yup.string().required('fecha y hora es obligatorio'),
      course_select: Yup.string().required('Seleccionar curso es obligatorio'),
    }),
    onSubmit: (data) => {
      console.log(data);
    },
  });
  const sortByOptions = [
    { value: 'price', text: 'Price' },
    { value: 'level', text: 'level' },
    { value: 'rating', text: 'Rating' },
  ];
  return (
    <Drawer
      open={open}
      onClose={() => {
        onClose && onClose();
      }}
      title={"Crear Nueva Clase"}
    >
      <div className={styles['content']}>
        <form className={styles['form']}>
          <Input
            label="Elegir fecha y hora"
            type="datetime-local"
            name="date_time"
            value={formik.values.date_time}
            onBlur={formik.handleBlur}
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            errorMessage={formik.errors.date_time}
          />
          <div className={styles['field-form']}>
            <label className={styles['subtitle']}>Selecciona el curso</label>
            <div className={styles['select']}>
              <Select
                options={sortByOptions}
                onChange={(e) => {
                  formik.setFieldValue('course_select', e.value);
                }}
              />
              {formik.touched.course_select && formik.errors.course_select ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.course_select}
                />
              ) : null}
            </div>
          </div>
        </form>
        <div className={styles['btn-submit']}>
          <Button
            color={ColorsButton.white}
            title="Cancelar"
            onClick={() => {
              onClose && onClose();
            }}
          />
          <Button
            color={ColorsButton.primary}
            title="Guardar Clase"
            type={TypeButton.submit}
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
    </Drawer>
  );
}

export default NewClassForm;

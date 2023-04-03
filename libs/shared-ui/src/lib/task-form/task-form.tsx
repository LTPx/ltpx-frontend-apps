import styles from './task-form.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button, { ColorsButton, TypeButton } from '../button/button';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import Input from '../input/input';
import TextArea from '../text-area/text-area';
import FilesUploaded, { TypeFile } from '../files-uploaded/files-uploaded';
import { NewTaskParams } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface TaskFormProps {
  onClose?: () => void;
  task?: NewTaskParams;
  onSubmit?: (task: NewTaskParams) => void;
}

export function TaskForm(props: TaskFormProps) {
  const { onClose, onSubmit, task } = props;
  const formik = useFormik({
    initialValues: {
      title: task?.title || '',
      description: task?.description || '',
      file: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Titulo de tarea es obligatorio'),
    }),
    onSubmit: (data) => {
      onSubmit && onSubmit(data);
      onClose && onClose();
    },
  });

  return (
    <form className={styles['form']}>
      <Input
        label={'Titulo de la Tarea'}
        type="text"
        name="title"
        placeholder="Titulo de la tarea"
        onChange={(e: any) => {
          formik.handleChange(e);
        }}
        value={formik.values.title}
        onBlur={formik.handleBlur}
      />
      {formik.touched.title && formik.errors.title ? (
        <InputTextStatus
          status={StatusInputText.error}
          text={formik.errors.title}
        />
      ) : null}
      <TextArea
        label={'Descripción'}
        type="text"
        name="description"
        rows={4}
        placeholder="Agregar descripción sobre la tarea"
        onChange={(e: any) => {
          formik.handleChange(e);
        }}
        value={formik.values.description}
        onBlur={formik.handleBlur}
      />
      {formik.touched.description && formik.errors.description ? (
        <InputTextStatus
          status={StatusInputText.error}
          text={formik.errors.description}
        />
      ) : null}
      <div className={styles['field-upload']}>
        <label>{'Subir tarea que debe cumplir el alumno'}</label>
        <FilesUploaded
          className={styles['uploader']}
          type={TypeFile.specific}
          onChange={(value) => {
            formik.setFieldValue('file', value);
          }}
        />
      </div>
      <div className={styles['btn']}>
        <Button
          className={styles['btn-submit']}
          color={ColorsButton.white}
          title={'Cancelar'}
          onClick={() => {
            onClose && onClose();
          }}
        />
        <Button
          className={styles['btn-submit']}
          color={ColorsButton.primary}
          title={'Guardar'}
          type={TypeButton.submit}
          onClick={formik.handleSubmit}
        />
      </div>
    </form>
  );
}

export default TaskForm;

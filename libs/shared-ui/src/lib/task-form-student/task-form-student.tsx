import styles from './task-form-student.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button, { ColorsButton, TypeButton } from '../button/button';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import TextArea from '../text-area/text-area';
import FilesUploaded, { TypeFile } from '../files-uploaded/files-uploaded';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface TaskFormStudentProps {
  description?: string;
  onClose?: () => void;
  onSubmit?: (title: string) => void;
}

export function TaskFormStudent(props: TaskFormStudentProps) {
  const { description, onClose, onSubmit } = props;
  const [task, setTask] = useState('');

  const formik = useFormik({
    initialValues: {
      description: '',
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.string().required('Archivo de Tarea es obligatorio'),
    }),
    onSubmit: (data) => {
      onSubmit && onSubmit(task);
      onClose && onClose();
    },
  });
  return (
    <form className={styles['form']}>
      <div className={styles['description-container']}>
        <label>En que consiste la tarea</label>
        <h4 className={styles['description']}>{description}</h4>
      </div>
      <TextArea
        label={'Agregar texto'}
        type="text"
        name="description"
        rows={8}
        placeholder="Responde a la tarea"
        onChange={(e: any) => {
          formik.handleChange(e);
        }}
        value={formik.values.description}
        onBlur={formik.handleBlur}
      />
      <div className={styles['field-upload']}>
        <label>{'Subir algun archivo'}</label>
        <FilesUploaded
          className={styles['uploader']}
          type={TypeFile.all}
          onChange={(value) => {
            formik.setFieldValue('file', value);
            setTask(value.name);
          }}
        />
        {formik.touched.file && formik.errors.file ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.file}
          />
        ) : null}
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
          title={'Enviar al profesor'}
          type={TypeButton.submit}
          onClick={formik.handleSubmit}
        />
      </div>
    </form>
  );
}

export default TaskFormStudent;

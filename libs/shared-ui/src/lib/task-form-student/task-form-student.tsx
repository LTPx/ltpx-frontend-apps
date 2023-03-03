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
  onClose?: () => void;
  onSubmit?: (title: string) => void;
}

export function TaskFormStudent(props: TaskFormStudentProps) {
  const { onClose, onSubmit } = props;
  const [task, setTask] = useState('');

  const formik = useFormik({
    initialValues: {
      description: '',
      file_task: null,
    },
    validationSchema: Yup.object({
      file_task: Yup.string().required('Archivo de Tarea es obligatorio'),
    }),
    onSubmit: (data) => {
      onSubmit && onSubmit(task);
      onClose && onClose();
    },
  });
  return (
    <form className={styles['form']}>
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
      <div className={styles['field-upload']}>
        <label>{'Subir Tarea'}</label>
        <FilesUploaded
          className={styles['uploader']}
          type={TypeFile.all}
          onChange={(value) => {
            formik.setFieldValue('file_task', value);
            setTask(value.name);
          }}
        />
        {formik.touched.file_task && formik.errors.file_task ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.file_task}
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
          title={'Guardar'}
          type={TypeButton.submit}
          onClick={formik.handleSubmit}
        />
      </div>
    </form>
  );
}

export default TaskFormStudent;

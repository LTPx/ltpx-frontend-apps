import styles from './task-form-student.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button, { ColorsButton, TypeButton } from '../button/button';
import TextArea from '../text-area/text-area';
import FilesUploaded, { TypeFile } from '../files-uploaded/files-uploaded';
/* eslint-disable-next-line */
export interface TaskFormStudentProps {
  description?: string;
  fileTask?: any;
  onClose?: () => void;
  onSubmit?: (task: { answer: string; file: any }) => void;
}

export function TaskFormStudent(props: TaskFormStudentProps) {
  const { description, onClose, onSubmit, fileTask } = props;

  const formik = useFormik({
    initialValues: {
      answer: '',
      file: null,
    },
    validationSchema: Yup.object({
      // file: Yup.string().required('Archivo de Tarea es obligatorio'),
    }),
    onSubmit: (data) => {
      onSubmit && onSubmit(data);
      onClose && onClose();
    },
  });
  return (
    <form className={styles['form']}>
      <div className={styles['description-container']}>
        <label>En que consiste la tarea</label>
        <h4 className={styles['description']}>{description}</h4>
        <a href={fileTask} target="_blank">
          Descargar archivo adjunto
        </a>
      </div>
      <TextArea
        label={'Agregar texto'}
        type="text"
        name="answer"
        rows={8}
        placeholder="Responde a la tarea"
        onChange={(e: any) => {
          formik.handleChange(e);
        }}
        value={formik.values.answer}
        onBlur={formik.handleBlur}
      />
      <div className={styles['field-upload']}>
        <label>{'Subir archivo(s)'}</label>
        <FilesUploaded
          multiple={true}
          className={styles['uploader']}
          type={TypeFile.specific}
          onChange={(value) => {
            formik.setFieldValue('file', value);
          }}
          errorMessage={formik.errors.file}
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
          icon="rocket"
          title={'Enviar mi tarea'}
          type={TypeButton.submit}
          onClick={formik.handleSubmit}
        />
      </div>
    </form>
  );
}

export default TaskFormStudent;

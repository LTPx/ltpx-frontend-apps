import { AchievementsImages } from '@ltpx-frontend-apps/api';
import { useFormik } from 'formik';
import Button, { TypeButton } from '../button/button';
import FilesUploaded, { TypeFile } from '../files-uploaded/files-uploaded';
import Input from '../input/input';
import SelectImage from '../select-image/select-image';
import styles from './achievement-task-form.module.scss';

/* eslint-disable-next-line */
export interface AchievementTaskFormProps {}

export function AchievementTaskForm(props: AchievementTaskFormProps) {
  const formik = useFormik({
    initialValues: {
      title: '',
      file: '',
      image: '',
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  return (
    <div className={styles['container']}>
      <form>
        <div className={styles['task-form']}>
          <Input
            placeholder="Asigna un nombre interesante"
            label="Titulo del logro"
            value={formik.values.title}
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            name="title"
          />
          <label>Subir tarea</label>
          <FilesUploaded
            className={styles['upload']}
            type={TypeFile.pdf}
            onChange={(value) => {
              formik.setFieldValue('file', value);
            }}
          />
          <SelectImage
            onChange={(img) => {
              formik.setFieldValue('image', img);
            }}
            images={AchievementsImages}
          />
        </div>
        <div className={styles['footer']}>
          <Button
            type={TypeButton.submit}
            onClick={formik.submitForm}
            title="Guardar"
          />
        </div>
      </form>
    </div>
  );
}

export default AchievementTaskForm;

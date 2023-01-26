import {
  AchievementsImages,
  NewAchievementParams,
  TypeAchievement,
} from '@ltpx-frontend-apps/api';
import { Form, Formik } from 'formik';
import Button, { ColorsButton, TypeButton } from '../button/button';
import FilesUploaded, { TypeFile } from '../files-uploaded/files-uploaded';
import Input from '../input/input';
import SelectImage from '../select-image/select-image';
import styles from './achievement-task-form.module.scss';
import * as Yup from 'yup';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';

/* eslint-disable-next-line */
export interface AchievementTaskFormProps {
  className?: string;
  onCancel?: () => void;
  onSubmit?: (data: NewAchievementParams) => void;
}

export function AchievementTaskForm(props: AchievementTaskFormProps) {
  const { onCancel, onSubmit, className } = props;

  return (
    <Formik
      initialValues={{
        title: '',
        image: '',
        file: null,
        rule: TypeAchievement.task,
        settings: [],
      }}
      validationSchema={Yup.object({
        title: Yup.string().required('Titulo no puede estar en blanco'),
        image: Yup.string().required('Es necesario seleccionar una imagen'),
      })}
      onSubmit={(formData) => {
        console.log('formDataAchievement: ', formData);
        onSubmit && onSubmit(formData);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        submitForm,
        errors,
      }) => (
        <Form className={className || ''}>
          <div className={styles['fields']}>
            <Input
              placeholder="Asigna un nombre interesante"
              label="Titulo del logro"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
              errorMessage={errors.title}
            />
            <br />
            <label>Selecciona la imagen que obtendrá al cumplir el logro</label>
            <SelectImage
              onChange={(img) => {
                setFieldValue('image', img);
              }}
              images={AchievementsImages}
            />
            {errors.image && (
              <InputTextStatus
                status={StatusInputText.error}
                text={errors.image}
              />
            )}
            <br />
            <label>Que calificación debe obtener entre (10 - 100)</label>
            <FilesUploaded
              className={styles['upload']}
              type={TypeFile.pdf}
              onChange={(value) => {
                setFieldValue('file', value);
              }}
            />
          </div>
          <div className={styles['footer']}>
            <Button
              title="Cancelar"
              color={ColorsButton.white}
              type={TypeButton.button}
              onClick={() => {
                onCancel && onCancel();
              }}
            />
            <Button
              title="Guardar logro"
              color={ColorsButton.secondary}
              type={TypeButton.submit}
              onClick={submitForm}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AchievementTaskForm;

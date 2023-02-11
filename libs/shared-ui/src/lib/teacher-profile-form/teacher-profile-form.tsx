import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button, { ColorsButton, TypeButton } from '../button/button';
import FilesUploaded, { TypeFile } from '../files-uploaded/files-uploaded';
import Icon from '../icon/icon';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import Input from '../input/input';
import TextArea from '../text-area/text-area';
import styles from './teacher-profile-form.module.scss';

/* eslint-disable-next-line */
export interface TeacherProfileFormProps {}

export function TeacherProfileForm(props: TeacherProfileFormProps) {
  const formik = useFormik({
    initialValues: {
      nameTeacher: '',
      professionTeacher: '',
      biography: '',
      profile_img: '',
      video_presentation: '',
      facebook_url: '',
      twitter_url: '',
      instagram_url: '',
      linkedIn_url: '',
    },
    validationSchema: Yup.object({
      nameTeacher: Yup.string().required('Nombre es obligatorio'),
      professionTeacher: Yup.string().required('Profesión es obligatorio'),
      biography: Yup.string().required('Biografía es obligatorio'),
    }),
    onSubmit: (data) => {
      console.log(data);
    },
  });
  return (
    <div className={styles['container']}>
      <form className={styles['form']}>
        <div className={styles['general']}>
          <label>Información de Usuario</label>
          <div className={styles['section']}>
            <div>
              <Input
                label="Nombre"
                type="text"
                name="nameTeacher"
                placeholder="Ingrese su Nombre y Apellido"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.nameTeacher}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nameTeacher && formik.errors.nameTeacher ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.nameTeacher}
                />
              ) : null}
            </div>
            <div>
              <Input
                label="Profesión"
                type="text"
                name="professionTeacher"
                placeholder="Ingresar su profesión"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.professionTeacher}
                onBlur={formik.handleBlur}
              />
              {formik.touched.professionTeacher &&
              formik.errors.professionTeacher ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.professionTeacher}
                />
              ) : null}
            </div>
            <div className={styles['upload']}>
              <label>Foto de Perfil (.jpg, .png)</label>
              <FilesUploaded
                className={styles['file-upload']}
                type={TypeFile.image}
                onChange={(value) => {
                  formik.setFieldValue('profile_img', value);
                }}
              />
            </div>
            <div className={styles['upload']}>
              <label>Video de Presentación publico</label>
              <FilesUploaded
                className={styles['file-upload']}
                type={TypeFile.video}
                onChange={(value) => {
                  formik.setFieldValue('video_presentation', value);
                }}
              />
            </div>
          </div>
          <h4 className={styles['social']}>
            Vincula tus redes sociales para que los estudiantes conozcan mas
            acerca de ti. (opcional)
          </h4>
          <div className={styles['section']}>
            <Input
              label="Facebook"
              type="text"
              name="facebook_url"
              placeholder="Facebook URL... "
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.facebook_url}
              onBlur={formik.handleBlur}
            />
            <Input
              label="Twitter"
              type="text"
              name="twitter_url"
              placeholder="Twitter URL..."
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.twitter_url}
              onBlur={formik.handleBlur}
            />
            <Input
              label="Instagram"
              type="text"
              name="instagram_url"
              placeholder="Instagram URL..."
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.instagram_url}
              onBlur={formik.handleBlur}
            />
            <Input
              label="LinkedIn"
              type="text"
              name="linkedIn_url"
              placeholder="LinkedIn URL..."
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.linkedIn_url}
              onBlur={formik.handleBlur}
            />
          </div>
          <TextArea
            label="Biografía"
            type="text"
            name="biography"
            rows={10}
            placeholder="Ingresar biografía"
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            value={formik.values.biography}
            onBlur={formik.handleBlur}
          />
          {formik.touched.biography && formik.errors.biography ? (
            <InputTextStatus
              status={StatusInputText.error}
              text={formik.errors.biography}
            />
          ) : null}
          <div className={styles['btn-submit']}>
            <Button
              color={ColorsButton.primary}
              title="Guardar"
              type={TypeButton.submit}
              onClick={formik.handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default TeacherProfileForm;

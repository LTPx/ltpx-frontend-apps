import styles from './teacher-profile-form.module.scss';
import Button, { ColorsButton, TypeButton } from '../button/button';
import FilesUploaded, { TypeFile } from '../files-uploaded/files-uploaded';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import Input from '../input/input';
import TextArea from '../text-area/text-area';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TeacherProfile, TeacherProfileParams } from '@ltpx-frontend-apps/api';
/* eslint-disable-next-line */
export interface TeacherProfileFormProps {
  onSubmit: (params: TeacherProfileParams) => void;
  profile?: TeacherProfile;
}

export function TeacherProfileForm(props: TeacherProfileFormProps) {
  const { onSubmit, profile } = props;

  function getSocialNetwork(socialNetwork: string) {
    const socialNetworks = profile?.social_networks || [];
    return socialNetworks.find((sn) => sn.name === socialNetwork)?.url || '';
  }
  const formik = useFormik({
    initialValues: {
      name: profile?.teacher_name || '',
      skills: profile?.skills || '',
      biography: profile?.biography || '',
      profile_img: profile?.image || '',
      video_presentation: profile?.video || '',
      facebook_url: getSocialNetwork('facebook'),
      twitter_url: getSocialNetwork('twitter'),
      instagram_url: getSocialNetwork('instagram'),
      linkedin_url: getSocialNetwork('linkedin'),
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Nombre es obligatorio'),
      skills: Yup.string().required('Profesión es obligatorio'),
      biography: Yup.string().required('Biografía es obligatorio'),
    }),
    onSubmit: (data) => {
      console.log(data);
      const social_networks = [
        { name: 'facebook', url: data.facebook_url },
        { name: 'twitter', url: data.twitter_url },
        { name: 'instagram', url: data.instagram_url },
        { name: 'linkedin', url: data.linkedin_url },
      ];
      onSubmit({ ...data, ...{ social_networks } });
    },
  });
  return (
    <div className={styles['container']}>
      <form className={styles['form']}>
        <div className={styles['general']}>
          {/* <h4>* Toda esta información sera publica en tu perfil como profesor</h4> */}
          <div className={styles['section']}>
            <div>
              <Input
                label="Nombre publico"
                description='Este sera tu nombre oficial en OpenMind'
                type="text"
                name="name"
                placeholder="Ejm: Luis Marisque"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.name}
                />
              ) : null}
            </div>
            <div>
              <Input
                label="Habilidades"
                description='Habilidades en las que te consideras experto'
                type="text"
                name="skills"
                placeholder="Profesor, Diseñador"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.skills}
                onBlur={formik.handleBlur}
              />
              {formik.touched.skills && formik.errors.skills ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.skills}
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
              name="linkedin_url"
              placeholder="LinkedIn URL..."
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.linkedin_url}
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
              color={ColorsButton.white}
              outline={true}
              title="Cancelar"
              link={'/teacher/account/account-profile'}
            />
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

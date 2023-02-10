import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button, { ColorsButton, TypeButton } from '../button/button';
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
      img: '',
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
      <form>
        <div className={styles['general']}>
        <label>Información de Usuario</label>
          <div className={styles['teacher-information']}>
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

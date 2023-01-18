import styles from './apply-teacher-form.module.scss';
import {
  Button,
  FilesUploaded,
  Input,
  Select,
  TextArea,
  TypeButton,
  TypeFile,
} from '@ltpx-frontend-apps/shared-ui';
import { ApplyTeachApiParams, COUNTRIES_ABLE_APP } from '@ltpx-frontend-apps/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface ApplyTeacherFormProps {
  onSubmitForm: (data: ApplyTeachApiParams) => void;
}

export function ApplyTeacherForm(props: ApplyTeacherFormProps) {
  const { t } = useTranslation();
  const countries = COUNTRIES_ABLE_APP.map((value) => {
    return {
      text: t(`countries.${value}`),
      value: value,
    };
  });
  const { onSubmitForm } = props;
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      national_id: '',
      national_id_front: '',
      national_id_back: '',
      country: '',
      city: '',
      experience: '',
      degrees: '',
      degrees_files: '',
      police_record: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nombre es requerido'),
      phone: Yup.string().required('Teléfono es requerido'),
      country: Yup.string().required('País es requerido'),
      city: Yup.string().required('Ciudad es requerido'),
      degrees_files: Yup.string().required('Por favor suba los archivos'),
      police_record: Yup.string().required('Record Policial es requerido'),
      national_id_front: Yup.mixed()
        .nullable()
        .required('Imagen de la identificación frontal es requerida'),
      national_id_back: Yup.mixed()
        .nullable()
        .required('Imagen de la identificación trasera es requerida'),
    }),
    onSubmit: (data) => {
      onSubmitForm(data);
    },
  });
  return (
    <div className={styles['container']}>
      <form onSubmit={formik.handleSubmit}>
        <section>
          <h2>Datos Personales</h2>
          <div className={styles['field-group']}>
            <Input
              label="Nombre Legal"
              name="name"
              placeholder="Ingresa tu nombre"
              description="Ingrese su nombre legal completo"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              errorMessage={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : null
              }
            />
            <Input
              label="Teléfono"
              name="phone"
              placeholder="Ejm: 0998473535"
              description="Este sera usando para contactarte en caso de ser necesario"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              errorMessage={
                formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : null
              }
            />
          </div>
          <div className={styles['identification-files']}>
            <label>Documento de identificación (.jpg, .png)</label>
            <p>Openmind necesita validar que se trata de ti por lo que requerimos que subas una imagen de tu identificación</p>
            <div
              className={`${styles['field-group']} ${styles['field-background']}`}
            >
              <div className={styles['file']}>
                <FilesUploaded
                  className={styles['file-upload']}
                  type={TypeFile.image}
                  onChange={(value) => {
                    formik.setFieldValue('national_id_front', value);
                  }}
                  errorMessage={
                    formik.touched.national_id_front &&
                    formik.errors.national_id_front
                      ? formik.errors.national_id_front
                      : null
                  }
                />
                <h5>Parte delantera</h5>
              </div>
              <div className={styles['file']}>
                <FilesUploaded
                  className={styles['file-upload']}
                  type={TypeFile.image}
                  onChange={(value) => {
                    formik.setFieldValue('national_id_back', value);
                  }}
                  errorMessage={
                    formik.touched.national_id_back &&
                    formik.errors.national_id_back
                      ? formik.errors.national_id_back
                      : null
                  }
                />
                <h5>Parte trasera</h5>
              </div>
            </div>
          </div>
          <div className={styles['field-group']}>
            <Select
              label='País de residencia'
              options={countries}
              onChange={(option) => {
                formik.setFieldValue('country', option.text)
              }}
              errorMessage={
                formik.touched.country && formik.errors.country
                  ? formik.errors.country
                  : null
              }
            />
            <Input
              label="Ciudad de residencia"
              name="city"
              placeholder="Guayaquil"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.city}
              onBlur={formik.handleBlur}
              errorMessage={
                formik.touched.city && formik.errors.city
                  ? formik.errors.city
                  : null
              }
            />
          </div>
          <FilesUploaded
            label="Record policial"
            description="Obligatorio para personas naturales de Ecuador 🇪🇨"
            className={styles['file-upload']}
            type={TypeFile.pdf}
            onChange={(value) => {
              formik.setFieldValue('police_record', value);
            }}
            errorMessage={
              formik.touched.police_record && formik.errors.police_record
                ? formik.errors.police_record
                : null
            }
          />
        </section>
        <section>
          <h2>Formación Académica</h2>
          <TextArea
            label="Títulos académicos"
            name="degrees"
            placeholder="Psicología: Universidad de Guayaquil, Mayo 12 2019"
            description="Enumere los títulos académicos, la capacitación profesional u otras certificaciones profesionales relevantes que posea. No requerimos títulos para enseñar en openmind; incluya cualquier cosa que nos ayude a aprender más sobre sus antecedentes."
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            value={formik.values.degrees}
            onBlur={formik.handleBlur}
            rows={10}
          />
          <label>Adjuntar títulos (.pdf)</label>
          <div className={styles['file']}>
            <FilesUploaded
              className={styles['file-upload']}
              type={TypeFile.pdf}
              multiple={true}
              onChange={(value) => {
                formik.setFieldValue('degrees_files', value);
              }}
              errorMessage={formik.touched.degrees_files && formik.errors.degrees_files ? formik.errors.degrees_files : null}
            />
          </div>
          <TextArea
            label="Experiencia Laboral (Opcional)"
            name="experience"
            rows={10}
            description="Enumere toda la experiencia que tiene enseñando o trabajando con jóvenes, ya sea como profesional, voluntario o en su vida personal."
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            value={formik.values.experience}
            onBlur={formik.handleBlur}
          />
          <Button
            className={styles['send-information']}
            title="Enviar Solicitud"
            type={TypeButton.submit}
          />
        </section>
      </form>
    </div>
  );
}

export default ApplyTeacherForm;

import styles from './apply-teacher-form.module.scss';
import {
  Button,
  FilesUploaded,
  Input,
  InputTextStatus,
  StatusInputText,
  TextArea,
  TypeButton,
  TypeFile,
} from '@ltpx-frontend-apps/shared-ui';
import { ApplyTeachApiParams } from '@ltpx-frontend-apps/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
/* eslint-disable-next-line */
export interface ApplyTeacherFormProps {
  onSubmitForm: (data: ApplyTeachApiParams) => void;
}

export function ApplyTeacherForm(props: ApplyTeacherFormProps) {
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
      college_degree: '',
      record_police: '',
      attached_files: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nombre es requerido'),
      phone: Yup.string().required('Teléfono es requerido'),
      country: Yup.string().required('País es requerido'),
      city: Yup.string().required('Ciudad es requerido'),
      national_id: Yup.string().required('Identificación es requerido'),
      national_id_front: Yup.mixed()
        .nullable()
        .required('Imagen de la identificación frontal es requerida'),
      national_id_back: Yup.string().required(
        'Imagen de la identificación trasera es requerida'
      ),
      experience: Yup.string().required('Experiencia es requerido'),
      degrees: Yup.string().required('Títulos es requerido'),
      college_degree: Yup.string().required(
        'Título Universitario es requerido'
      ),
      record_police: Yup.string().required('Record Policial es requerido'),
    }),
    onSubmit: (data) => {
      onSubmitForm(data);
    },
  });
  return (
    <div className={styles['container']}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Tu Nombre Legal"
          name="name"
          placeholder="Ingresa tu nombre"
          description="Ingrese su nombre legal completo. Esto solo será visible para nuestro equipo y no se podrá editar más adelante."
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
        <Input
          label="Identificación"
          name="national_id"
          placeholder="Ejm: 11000399093"
          description="Su numero de identificación o pasaporte"
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          value={formik.values.national_id}
          onBlur={formik.handleBlur}
        />
        {formik.touched.national_id && formik.errors.national_id ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.national_id}
          />
        ) : null}
        <h4>Identificación parte delantera</h4>
        <div className={styles['file']}>
          <FilesUploaded
            className={styles['file-upload']}
            type={TypeFile.image}
            onChange={(value) => {
              formik.setFieldValue('national_id_front', value);
            }}
          />
        </div>
        {formik.touched.national_id_front && formik.errors.national_id_front ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.national_id_front}
          />
        ) : null}
        <h4>Identificación parte trasera</h4>
        <div className={styles['file']}>
          <FilesUploaded
            className={styles['file-upload']}
            type={TypeFile.image}
            onChange={(value) => {
              formik.setFieldValue('national_id_back', value);
            }}
          />
        </div>
        {formik.touched.national_id_back && formik.errors.national_id_back ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.national_id_back}
          />
        ) : null}
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
        />
        {formik.touched.phone && formik.errors.phone ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.phone}
          />
        ) : null}
        <Input
          label="País"
          name="country"
          placeholder="Ecuador"
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          value={formik.values.country}
          onBlur={formik.handleBlur}
        />
        {formik.touched.country && formik.errors.country ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.country}
          />
        ) : null}
        <Input
          label="Ciudad"
          name="city"
          placeholder="Guayaquil"
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          value={formik.values.city}
          onBlur={formik.handleBlur}
        />
        {formik.touched.city && formik.errors.city ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.city}
          />
        ) : null}
        <TextArea
          label="Experiencia Laboral"
          name="experience"
          rows={10}
          description="Enumere toda la experiencia que tiene enseñando o trabajando con jóvenes, ya sea como profesional, voluntario o en su vida personal."
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          value={formik.values.experience}
          onBlur={formik.handleBlur}
        />
        {formik.touched.experience && formik.errors.experience ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.experience}
          />
        ) : null}
        <TextArea
          label="Títulos académicos"
          name="degrees"
          placeholder="Psicología: Universidad de Guayaquil, Mayo 12 2019"
          description="Enumere los títulos académicos, la capacitación profesional u otras certificaciones profesionales relevantes que posea. No requerimos títulos para enseñar en ltpx; incluya cualquier cosa que nos ayude a aprender más sobre sus antecedentes."
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          value={formik.values.degrees}
          onBlur={formik.handleBlur}
          rows={10}
        />
        {formik.touched.degrees && formik.errors.degrees ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.degrees}
          />
        ) : null}
        <div className={styles['file']}>
          <FilesUploaded
            className={styles['file-upload']}
            type={TypeFile.pdf}
            onChange={(value) => {
              formik.setFieldValue('college_degree', value);
            }}
          />
        </div>
        {formik.touched.college_degree && formik.errors.college_degree ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.college_degree}
          />
        ) : null}
        <h4>Record Policial</h4>
        <div className={styles['file']}>
          <FilesUploaded
            className={styles['file-upload']}
            type={TypeFile.pdf}
            onChange={(value) => {
              formik.setFieldValue('record_police', value);
            }}
          />
        </div>
        {formik.touched.record_police && formik.errors.record_police ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.record_police}
          />
        ) : null}
        <Button
          className={styles['send-information']}
          title="Enviar Solicitud"
          type={TypeButton.submit}
        />
      </form>
    </div>
  );
}

export default ApplyTeacherForm;

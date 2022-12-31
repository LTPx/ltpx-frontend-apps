import { Button, Input, TextArea, TypeButton } from '@ltpx-frontend-apps/shared-ui';
import styles from './apply-teacher-form.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { applyToTeach, getCurrentUser } from '@ltpx-frontend-apps/api';
/* eslint-disable-next-line */
export interface ApplyTeacherFormProps {}

export function ApplyTeacherForm(props: ApplyTeacherFormProps) {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      nationalId: '',
      country: '',
      city: '',
      experience: '',
      degrees: '',
      record_police: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nombre es requerido'),
      phone: Yup.string().required('Telefono es required'),
      country: Yup.string().required('Pais es required'),
      city: Yup.string().required('Ciudad es required'),
      nationalId: Yup.string().required('Identificacion es required'),
      experience: Yup.string().required('Experiencia es required'),
      degrees: Yup.string().required('Titulos es required'),
      record_police: Yup.string().required('Record Policial es required'),
    }),
    onSubmit: async (data) => {
      const { name, experience, degrees, nationalId } = data;
      const teacherForm = {
        teacher_name: name,
        experience,
        degrees,
        national_id: nationalId,
      };
      try {
        await applyToTeach(teacherForm);
        sessionStorage.setItem('applied', 'true');
      } catch (error: any) {
        console.log('error: ', error.response);
      }
    },
  });
  return (
    <div className={`${styles['container']} card`}>
      <div className={styles['banner-notification']}>
        <p>
          Tu solicitud ha sido enviada, validaremos tus datos en un periodo
          maximo de 48h luego recibiras un correo con una respuesta de nuestro
          equipo
        </p>
      </div>
      <div className={`${styles['content']}`}>
        <h1>Aplicar para maestro</h1>
        <h2>Paso 1: Aprende acerca de LTPX</h2>
        <div className={styles['step']}>
          <h4>
            Estos dos videos cubren los conceptos básicos de lo que significa
            ser un maestro en ltpx. También puede obtener más información sobre
            la enseñanza en ltpx en el siguiente link
          </h4>
        </div>
        <div className={styles['step']}>
          <h2>Paso 2: Llenar esta solicitud</h2>
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
            <Input
              label="Identificacion"
              name="nationalId"
              placeholder="Ejm: 11000399093"
              description="Su numero de identificaion o pasaporte"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.nationalId}
              onBlur={formik.handleBlur}
            />
            <Input
              label="Telefono"
              name="phone"
              placeholder="Ejm: 0998473535"
              description="Este sera usando para contactarte en caso de ser necesario"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            <Input
              label='Pais'
              name="country"
              placeholder="Ecuador"
              onChange={(e: any) => { formik.handleChange(e); }}
              value={formik.values.country}
              onBlur={formik.handleBlur}
            />
            <Input
              label='Ciudad'
              name="city"
              placeholder="Guayaquil"
              onChange={(e: any) => { formik.handleChange(e); }}
              value={formik.values.city}
              onBlur={formik.handleBlur}
            />
            <TextArea
              label='Experiencia Laboral'
              name='experience'
              rows={10}
              description='Enumere toda la experiencia que tiene enseñando o trabajando con jóvenes, ya sea como profesional, voluntario o en su vida personal.'
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.experience}
              onBlur={formik.handleBlur}
            />
            <TextArea
              label="Titutos academicos"
              name="degrees"
              placeholder="Psicologia: Universidad de Guayaquil, Mayo 12 2019"
              description="Enumere los títulos académicos, la capacitación profesional u otras certificaciones profesionales relevantes que posea. No requerimos títulos para enseñar en ltpx; incluya cualquier cosa que nos ayude a aprender más sobre sus antecedentes."
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              rows={10}
            />
            <Input
              label="Record Policial"
              name="record_police"
              placeholder="Obligatorio para usuarios de Ecuador, Mexico"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            <Button
              title="Enviar Solicitud"
              type={TypeButton.submit}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplyTeacherForm;

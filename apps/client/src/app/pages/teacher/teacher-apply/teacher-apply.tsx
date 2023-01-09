import { ApplyTeachApiParams, StatusTeacherAccount } from '@ltpx-frontend-apps/api';
import { useTeacher, useUser } from '../../../store';
import ApplyTeacherForm from '../apply-teacher-form/apply-teacher-form';
import styles from './teacher-apply.module.scss';

/* eslint-disable-next-line */
export interface TeacherApplyProps {}

export function TeacherApply(props: TeacherApplyProps) {
  const { applyTeach, teacher_account } = useTeacher();

  const handleSubmit = async (formData: ApplyTeachApiParams) => {
    const { accepted, data } = await applyTeach(formData);
    if ( accepted ) {
      console.log('teacher: ', data);
    } else {
      console.log('error: ', data);
    }
  }

  const BannerNotification = () => (
    <div className={styles['banner-notification']}>
      <p>
        Tu solicitud ha sido enviada, validaremos tus datos en un periodo
        maximo de 48h luego recibiras un correo con una respuesta de nuestro
        equipo
      </p>
    </div>
  )

  return (
    <div className={styles['container']}>
      { teacher_account === StatusTeacherAccount.review && <BannerNotification/> }
      { teacher_account === StatusTeacherAccount.unapplied && (
        <ApplyTeacherForm onSubmitForm={(e: ApplyTeachApiParams)=>{handleSubmit(e)}}/>
      )}
    </div>
  );
}

export default TeacherApply;

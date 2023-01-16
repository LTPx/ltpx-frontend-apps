import {
  ApplicationTeach,
  ApplyTeachApiParams,
  StatusTeacherAccount,
} from '@ltpx-frontend-apps/api';
import {
  ApplicationView,
  ApplyTeacherForm,
} from '@ltpx-frontend-apps/shared-ui';
import { useEffect, useState } from 'react';
import { useTeacher } from '../../../store';
import styles from './teacher-apply.module.scss';

/* eslint-disable-next-line */
export interface TeacherApplyProps {}

export function TeacherApply(props: TeacherApplyProps) {
  const [form, setForm] = useState<ApplicationTeach>();

  const { applyTeach, teacher_account, getApplicationTeach } = useTeacher();

  useEffect(() => {
    let mounted = true;
    getApplicationTeach().then((resp) => {
      if (!mounted) {
        if (resp.ok) {
          setForm(resp.data);
        } else {
          console.log(resp.data);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (formData: ApplyTeachApiParams) => {
    const { accepted, data } = await applyTeach(formData);
    if (accepted) {
      console.log('teacher: ', data);
    } else {
      console.log('error: ', data);
    }
  };

  const BannerNotification = () => (
    <div className={styles['banner-notification']}>
      <p>
        Tu solicitud ha sido enviada, validaremos tus datos en un periodo maximo
        de 48h luego recibirás un correo con una respuesta de nuestro equipo
      </p>
    </div>
  );

  return (
    <div className={`${styles['container']} card`}>
      <div className={`${styles['header']}`}>
        <h1>Aplicar para maestro en OpenMind</h1>
      </div>
      {teacher_account === StatusTeacherAccount.review && form && (
        <ApplicationView application={form} />
      )}
      {teacher_account === StatusTeacherAccount.unapplied && (
        <>
          <p className={`${styles['text']}`}>
            Por favor llena esta solicitud de registro y en periodo de 24 a 48h
            te enviaremos un correo electrónico con la respuesta a tu petición,
            una vez enviada no se podrá modificar
          </p>
          <ApplyTeacherForm
            onSubmitForm={(e: ApplyTeachApiParams) => {
              handleSubmit(e);
            }}
          />
        </>
      )}
    </div>
  );
}

export default TeacherApply;

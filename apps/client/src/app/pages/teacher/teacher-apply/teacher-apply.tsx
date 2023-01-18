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
import { useNavigate } from 'react-router-dom';
import { useTeacher } from '../../../store';
import styles from './teacher-apply.module.scss';

/* eslint-disable-next-line */
export interface TeacherApplyProps {}

export function TeacherApply(props: TeacherApplyProps) {
  const [ application, setApplication ] = useState<ApplicationTeach>();
  const { applyTeach, teacher_account, getApplicationTeach } = useTeacher();
  const navigate = useNavigate();

  useEffect(() => {
    if (!application) {
      getApplicationTeach().then((resp) => {
        const { ok, data} = resp;
        if (ok && data.status) {
          setApplication(resp.data);
        } else {
          console.log(resp.data);
        }
      });
    }
    return () => {
    };
  }, []);

  const handleSubmit = async (formData: ApplyTeachApiParams) => {
    const { accepted, data } = await applyTeach(formData);
    if (accepted) {
      navigate('/teacher/dashboard');
    } else {
      console.log('error: ', data);
    }
  };

  return (
    <div className={`${styles['container']} card`}>
      <div className={`${styles['header']}`}>
        <h1>Aplicar para maestro en OpenMind</h1>
      </div>
      { application?.status === StatusTeacherAccount.review && (
        <ApplicationView application={application} />
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

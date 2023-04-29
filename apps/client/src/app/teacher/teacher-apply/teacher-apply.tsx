import styles from './teacher-apply.module.scss';
import {
  ApplicationView,
  ApplyTeacherForm,
  Button,
  ColorsButton,
  Loader,
} from '@ltpx-frontend-apps/shared-ui';
import {
  ApplicationTeach,
  ApplyTeachApiParams,
  StatusTeacherAccount,
} from '@ltpx-frontend-apps/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'evergreen-ui';
import { useTeacher, useUtil } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';

export function TeacherApply() {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ApplyTeachApiParams>();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [application, setApplication] = useState<ApplicationTeach>();
  const { applyTeach, teacher_account, getApplicationTeach } = useTeacher();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setMessageToast } = useUtil();

  useEffect(() => {
    if (!application) {
      getApplicationTeach().then((resp) => {
        const { ok, data } = resp;
        if (ok && data.status) {
          setApplication(resp.data);
        } else {
          console.log(resp.data);
        }
      });
    }
  }, []);

  const handleSubmit = async () => {
    if (formData) {
      setSaving(true);
      const { success, error } = await applyTeach(formData);
      setSaving(false);
      setOpenConfirmationModal(false);
      if (success) {
        setMessageToast('success', 'Tu solicitud ha sido enviada a revision');
        navigate('/teacher/dashboard');
      } else {
        setMessageToast('error', error);
      }
    }
  };

  return (
    <div className={`${styles['container']} card`}>
      <div className={`${styles['header']}`}>
        <h1>{t('teacherApply.title')}</h1>
      </div>
      {application?.status === StatusTeacherAccount.review && (
        <ApplicationView application={application} />
      )}
      {application?.status === StatusTeacherAccount.rejected && (
        <>
          {application.comments?.map((element, index) => (
            <div className={styles['comments-applyTeach']} key={index}>
              <p><strong>Comentarios de Revision: </strong> 
              <h4>
              {element.comment}
              </h4></p>
            </div>
          ))}
          <p className={`${styles['text-rejected']}`}>{t('teacherApply.text')}</p>
          <ApplyTeacherForm
            onSubmitForm={(data: ApplyTeachApiParams) => {
              setOpenConfirmationModal(true);
              setFormData(data);
            }}
            application={application}
          />
        </>
      )}
      {teacher_account === StatusTeacherAccount.unapplied && (
        <>
          <p className={`${styles['text']}`}>{t('teacherApply.text')}</p>
          <ApplyTeacherForm
            onSubmitForm={(data: ApplyTeachApiParams) => {
              setOpenConfirmationModal(true);
              setFormData(data);
            }}
          />
        </>
      )}
      <Dialog
        isShown={openConfirmationModal}
        title={`${saving ? 'Guardando...' : 'Confirmar envió de solicitud'}`}
        onCloseComplete={() => setOpenConfirmationModal(false)}
        hasFooter={false}
      >
        <div className={styles['dialog-confirm']}>
          {!saving && (
            <>
              <h4>{t('teacherApply.saveText')}</h4>
              <div className={styles['footer']}>
                <Button
                  title={t('buttons.cancel')}
                  color={ColorsButton.white}
                  onClick={() => {
                    setOpenConfirmationModal(false);
                  }}
                />
                <Button
                  title={t('buttons.sendReview')}
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              </div>
            </>
          )}
          {saving && (
            <div className={styles['loading']}>
              <Loader />
              <h4>Estamos subiendo tus archivos...</h4>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default TeacherApply;

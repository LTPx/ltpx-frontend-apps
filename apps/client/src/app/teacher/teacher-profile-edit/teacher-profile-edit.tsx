import {
  Button,
  ColorsButton,
  Loader,
  TeacherProfileForm,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './teacher-profile-edit.module.scss';
import { TeacherProfileParams } from '@ltpx-frontend-apps/api';
import { useTeacher, useUtil } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface TeacherProfileEditProps {}

export function TeacherProfileEdit(props: TeacherProfileEditProps) {
  const { _updateProfile, profile } = useTeacher();
  const [formData, setFormData] = useState<TeacherProfileParams>();
  const { setMessageToast } = useUtil();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const { t } = useTranslation();
  const handleSubmit = async () => {
    if (formData) {
      setSaving(true);
      const { success, error } = await _updateProfile(formData);
      setSaving(false);
      setOpenConfirmationModal(false);
      if (success) {
        setMessageToast('success', 'Tu perfil ha sido actualizado');
        navigate('/teacher/account/account-profile');
      } else {
        setMessageToast('error', error);
      }
    }
  };
  return (
    <div className={styles['container']}>
      <div className={styles['title-content']}>
        <h4 className={styles['title']}>Editar Perfil de Profesor</h4>
      </div>
      <TeacherProfileForm
        profile={profile}
        onSubmit={(data: TeacherProfileParams) => {
          setOpenConfirmationModal(true);
          setFormData(data);
        }}
      />
      <Dialog
        isShown={openConfirmationModal}
        title={`${
          saving ? 'Guardando...' : 'Confirmar actualización de información'
        }`}
        onCloseComplete={() => setOpenConfirmationModal(false)}
        hasFooter={false}
      >
        <div className={styles['dialog-confirm']}>
          {!saving && (
            <>
              <h4>
                {
                  'La información sera actualizada luego de cargar todos los datos '
                }
              </h4>
              <div className={styles['footer']}>
                <Button
                  title={t('buttons.cancel')}
                  color={ColorsButton.white}
                  onClick={() => {
                    setOpenConfirmationModal(false);
                  }}
                />
                <Button
                  title={'Confirmar'}
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

export default TeacherProfileEdit;

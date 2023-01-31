import {
  ApplicationView,
  Button,
  ColorsButton,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
} from '@ltpx-frontend-apps/shared-ui';
import { useAdmin, useUtil } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RequireChangesApplicationForm from '../../components/require-changes-application-form/require-changes-application-form';
import styles from './application-details-page.module.scss';

/* eslint-disable-next-line */
export interface ApplicationDetailsPageProps {}

export function ApplicationDetailsPage(props: ApplicationDetailsPageProps) {
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {
    getStoreApplication,
    currentApplication,
    _getApplication,
    _approveApplication,
  } = useAdmin();
  const navigate = useNavigate();
  const { translateStatusTeacherApplication } = useUtil();
  const params = useParams();
  const { id } = params;
  const appId = parseInt(id || '');

  const fetchData = useCallback(async () => {
    const resp = await _getApplication(appId);
    console.log('application....: ', resp);
  }, []);

  useEffect(() => {
    if (currentApplication.id) {
      getStoreApplication(appId);
    } else {
      fetchData();
    }
  }, []);

  const handleRequestChange = () => {
    setOpenModal(true);
  };

  const handleApproveApplication = async () => {
    const { success, error } = await _approveApplication(currentApplication.id);
    if (success) {
      navigate('/admin/teachers');
    } else {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className={styles['container']}>
      {currentApplication.id && (
        <>
          <div className={styles['header']}>
            <h1>Solicitud de: {currentApplication.name}</h1>
            {currentApplication.status !== 'review' ? (
              <div>
                <h3>{translateStatusTeacherApplication(currentApplication.status)}</h3>
                <h4>{currentApplication.updated_at}</h4>
              </div>
            ) : (
              <div className={styles['actions']}>
                <Button
                  title="Requiere cambios"
                  color={ColorsButton.secondary}
                  outline={true}
                  onClick={() => {
                    handleRequestChange();
                  }}
                />
                <Button
                  title="Aprobar Solicitud"
                  onClick={() => {
                    handleApproveApplication();
                  }}
                />
              </div>
            )}
          </div>
          <ApplicationView
            application={currentApplication}
          />
        </>
      )}
      <Dialog
        isShown={openModal}
        hasFooter={false}
        hasHeader={false}
        onCloseComplete={() => setOpenModal(false)}
        width={'40vw'}
      >
        <RequireChangesApplicationForm
          id={appId}
          onCancel={() => setOpenModal(false)}
          onSubmit={() => setOpenModal(false)}
        />
      </Dialog>
      {error && (
        <Snackbar
          open={error}
          position={SnackbarPosition.centerBottom}
          kind={SnackbarType.error}
          title={'Ups! no se pudo aprobar esta solicitud'}
          onClose={() => setError(false)}
          duration={3000}
        />
      )}
    </div>
  );
}

export default ApplicationDetailsPage;

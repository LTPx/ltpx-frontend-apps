import {
  ApplicationView,
  Button,
  ColorsButton,
} from '@ltpx-frontend-apps/shared-ui';
import { useAdmin } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RequireChangesApplicationForm from '../../components/require-changes-application-form/require-changes-application-form';
import styles from './application-details-page.module.scss';

/* eslint-disable-next-line */
export interface ApplicationDetailsPageProps {}

export function ApplicationDetailsPage(props: ApplicationDetailsPageProps) {
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const { id } = params;
  const appId = parseInt(id || '');
  const { getStoreApplication, currentApplication } = useAdmin();

  useEffect(() => {
    getStoreApplication(appId);
  }, []);

  const handleRequestChange = () => {
    setOpenModal(true);
  };

  const handleApproveApplication = () => {};

  return (
    <div className={styles['container']}>
      {currentApplication.id && (
        <>
          <div className={styles['header']}>
            <h1>Solicitud de: {currentApplication.name}</h1>
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
          </div>
          <ApplicationView application={currentApplication} />
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
    </div>
  );
}

export default ApplicationDetailsPage;

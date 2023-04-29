import { Tabs, useMoment } from '@ltpx-frontend-apps/shared-ui';
import { useAdmin, useUtil } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './teachers-page.module.scss';

/* eslint-disable-next-line */
export function TeachersPage() {
  const { _getApplicationsByStatus, applications } = useAdmin();
  const { formatDate } = useMoment();
  const tabs = [{ text: 'Pendientes' }, { text: 'Necesita cambios' }, { text: 'Aprobadas' }];

  const fetchApplications = useCallback(async (status: string) => {
    const resp = await _getApplicationsByStatus(status);
    console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchApplications('review');
  }, []);

  const handleChangeTab = async (tabIndex: number) => {
    if (tabIndex === 0) {
      await fetchApplications('review');
    } else if (tabIndex === 1){
      await fetchApplications('rejected');
    } else if (tabIndex === 2){
      await fetchApplications('approved');
    }
  };

  return (
    <div className={styles['container']}>
      <h1>Solicitudes de Profesores</h1>
      <p>Estas son las ultimas solicitudes que se han recibido</p>
      <Tabs
        tabs={tabs}
        onClickTab={(index) => {
          handleChangeTab(index);
        }}
      />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>País</th>
            <th>Solicitud enviada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={index}>
              <td className={styles['user-name']}>
                <Avatar name={application.name} size={40}></Avatar>
                {application.name}
              </td>
              <td>{application.country}</td>
              <td>{formatDate(application.created_at)}</td>
              <td>
                <NavLink to={`/admin/application/${application.id}`}>
                  Ver formulario
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeachersPage;

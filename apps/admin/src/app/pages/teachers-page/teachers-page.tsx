import { AvatarSize, Tabs } from '@ltpx-frontend-apps/shared-ui';
import { useAdmin, useUtil } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './teachers-page.module.scss';

/* eslint-disable-next-line */
export function TeachersPage() {
  const { _pendingApplications, _approvedApplications, applications } = useAdmin();
  const { translateStatusTeacherApplication } = useUtil();

  const tabs = [
    { text: 'Pendientes' },
    { text: 'Aprobadas' },
  ];

  const fetchPending = useCallback(async () => {
    const resp = await _pendingApplications();
    console.log('resp....: ', resp);
  }, []);

  const fetchApproved = useCallback(async () => {
    const resp = await _approvedApplications();
    console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const handleChangeTab = async( tabIndex: number) => {
    if (tabIndex) {
      await fetchApproved();
    } else {
      await fetchPending();
    }
  }

  return (
    <div className={styles['container']}>
      <h1>Administración de Profesores</h1>
      <p>Solicitudes</p>
      <Tabs tabs={tabs} onClickTab={(index)=>{ handleChangeTab(index)}}/>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>País</th>
            <th>Estado</th>
            <th>Solicitud enviada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { applications.map((application, index) => (
            <tr key={index}>
              <td className={styles['user-name']}>
                <Avatar name={application.name} size={40}></Avatar>
                {application.name}
              </td>
              <td>{application.country}</td>
              <td>{translateStatusTeacherApplication(application.status)}</td>
              <td>{application.created_at}</td>
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

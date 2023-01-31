import { Tabs } from '@ltpx-frontend-apps/shared-ui';
import { useAdmin } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './teachers-page.module.scss';

/* eslint-disable-next-line */
export function TeachersPage() {
  const { _pendingApplications, _approvedApplications, applications } = useAdmin();

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
            <th>Status</th>
            <th>Solicitud enviada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { applications.map((application, index) => (
            <tr key={index}>
              <td className={styles['user-name']}>{application.name}</td>
              <td>{application.country}</td>
              <td>{application.status}</td>
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

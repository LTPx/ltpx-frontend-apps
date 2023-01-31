import { useAdmin } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './teachers-page.module.scss';

/* eslint-disable-next-line */
export function TeachersPage() {
  const { pendingApplications, applications } = useAdmin();

  const fetchData = useCallback(async () => {
    const resp = await pendingApplications();
    console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles['container']}>
      <h1>Administración de Profesores</h1>
      <p>Solicitudes pendientes de revision</p>
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
          {applications.map((application, index) => (
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

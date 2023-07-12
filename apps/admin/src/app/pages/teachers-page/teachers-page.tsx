import { Icon, Menu, Tabs, useMoment } from '@ltpx-frontend-apps/shared-ui';
import { useAdmin } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './teachers-page.module.scss';

/* eslint-disable-next-line */
export function TeachersPage() {
  const { _getApplicationsByStatus, applications } = useAdmin();
  const { formatDate } = useMoment();
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [{ text: 'Pendientes' }, { text: 'Necesita cambios' }];
  const options = [{ text: 'Profesores' }, { text: 'Solicitudes' }];

  const fetchApplications = useCallback(async (status: string) => {
    const resp = await _getApplicationsByStatus(status);
    console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchApplications('approved');
  }, []);

  const handleClick = async (tabIndex: number) => {
    if (tabIndex === 0) {
      await fetchApplications('approved');
    } else if (tabIndex === 1) {
      await fetchApplications('review');
    }
    setSelectedTab(tabIndex);
  };

  const handleChangeTab = async (tabIndex: number) => {
    if (tabIndex === 0) {
      await fetchApplications('review');
    } else if (tabIndex === 1) {
      await fetchApplications('rejected');
    }
  };

  return (
    <div className={styles['wrap-content']}>
      <Tabs
        tabs={options}
        isNav={false}
        onClickTab={(index) => handleClick(index)}
      />
      <div>
        {selectedTab === 0 && (
          <div className={styles['container']}>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>País</th>
                  <th>Registrado</th>
                  <th className={styles['th-class']}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application, index) => (
                  <tr key={index}>
                    <td>{application.name}</td>
                    <td>{application.country}</td>
                    <td>{formatDate(application.created_at)}</td>
                    <td>
                      <Menu
                        items={[
                          {
                            text: 'Ver Perfil',
                            icon: 'eye',
                            url: `/admin/teacher/${application.id}`,
                          },
                          {
                            text: 'Banear',
                            icon: 'trash',
                            // url: `/teacher/courses/edit/${course.id}`,
                          },
                          {
                            text: 'Configuraciones',
                            icon: 'pencil',
                            // url: `/teacher/courses/edit/${course.id}`,
                          },
                        ]}
                      >
                        <div className={styles['actions']}>
                          <Icon
                            icon={'ellipsis-horizontal-outline'}
                            size={15}
                            className={styles['icon-button']}
                          />
                        </div>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedTab === 1 && (
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
        )}
      </div>
    </div>
  );
}

export default TeachersPage;

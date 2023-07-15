import {
  CommissionForm,
  Icon,
  Menu,
  Select,
  Tabs,
  useMoment,
} from '@ltpx-frontend-apps/shared-ui';
import { useAdmin } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './teachers-page.module.scss';
import { TeacherProfile } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export function TeachersPage() {
  const { formatDate } = useMoment();
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [
    { text: 'Pendientes', value: 'review' },
    { text: 'Necesita cambios', value: 'rejected' },
  ];
  const options = [{ text: 'Profesores' }, { text: 'Solicitudes' }];
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]);
  const { _getTeachers, applications, _getApplicationsByStatus } = useAdmin();
  const [openModal, setOpenModal] = useState(false);

  const fetchTeachers = useCallback(async () => {
    const { success, data, error } = await _getTeachers();
    if (success) {
      setTeachers(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  const fetchApplications = useCallback(async (status: string) => {
    const resp = await _getApplicationsByStatus(status);
    console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleClick = async (tabIndex: number) => {
    if (tabIndex === 0) {
      await fetchTeachers();
    } else if (tabIndex === 1) {
      await fetchApplications('review');
    }
    setSelectedTab(tabIndex);
  };

  const handleChangeTab = async (value: string) => {
    if (value === 'review') {
      await fetchApplications('review');
    } else if (value === 'rejected') {
      await fetchApplications('rejected');
    }
  };

  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>Administración de Profesores</h1>
      <Tabs
        tabs={options}
        isNav={false}
        onClickTab={(index) => handleClick(index)}
      />
      <div>
        {selectedTab === 0 && (
          <div className={styles['content']}>
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
                {teachers.map((teacher, index) => (
                  <tr key={index}>
                    <td>{teacher.teacher_name}</td>
                    <td>{teacher.country}</td>
                    <td>{formatDate(teacher.created_at)}</td>
                    <td>
                      <Menu
                        items={[
                          {
                            text: 'Ver Perfil',
                            icon: 'eye',
                            url: `/admin/teacher/${teacher.user_id}`,
                          },
                          {
                            text: 'Banear',
                            icon: 'trash',
                            // url: `/teacher/courses/edit/${course.id}`,
                          },
                          {
                            text: 'Configuraciones',
                            icon: 'pencil',
                            onClick: () => setOpenModal(true),
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
          <div className={styles['content']}>
            <div className={styles['head']}>
              <p>Estas son las ultimas solicitudes que se han recibido</p>
              <Select
                options={tabs}
                selected={'review'}
                disablePlaceholder={true}
                onChange={(item) => {
                  handleChangeTab(item.value);
                }}
              />
            </div>
            {/* <Tabs
              tabs={tabs}
              onClickTab={(index) => {
                handleChangeTab(index);
              }}
            /> */}
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
      <CommissionForm
        open={openModal}
        onSubmit={() => console.log('click')}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}

export default TeachersPage;

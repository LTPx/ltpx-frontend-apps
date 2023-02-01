import { Tabs } from '@ltpx-frontend-apps/shared-ui';
import { useAdmin, useUtil } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './courses-pages.module.scss';

export function CoursesPages() {
  const { _getPendingApproveCourses, courses } =
    useAdmin();

  const tabs = [{ text: 'Pendientes' }, { text: 'Aprobadas' }];

  const fetchPending = useCallback(async () => {
    const resp = await _getPendingApproveCourses();
    console.log('resp....: ', resp);
  }, []);

  const fetchApproved = useCallback(async () => {
    const resp = await _getPendingApproveCourses();
    console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const handleChangeTab = async (tabIndex: number) => {
    if (tabIndex) {
      await fetchApproved();
    } else {
      await fetchPending();
    }
  };

  return (
    <div className={styles['container']}>
      <h1>Administración de Cursos</h1>
      <p>Cursos recientes</p>
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
            <th>Categoría</th>
            <th>Fecha de creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td className={styles['user-name']}>{course.title}</td>
              <td>{course.category}</td>
              <td>{course.created_at}</td>
              <td>
                <NavLink to={`/admin/application/${course.id}`}>
                  Ver curso
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoursesPages;

import { Tabs, useMoment } from '@ltpx-frontend-apps/shared-ui';
import { useAdmin, useCourseUtil } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './courses-pages.module.scss';

export function CoursesPages() {
  const { _getCoursesByStatus, courses } =
    useAdmin();
  const { translateCategory } = useCourseUtil();
  const tabs = [{ text: 'Pendientes' }, { text: 'Necesita cambios' }, { text: 'Aprobados' }];
  const { formatDate } = useMoment();

  const fetchCourses = useCallback(async (status: string) => {
    const resp = await _getCoursesByStatus(status);
    console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchCourses('review');
  }, []);

  const handleChangeTab = async (tabIndex: number) => {
    if (tabIndex === 0) {
      await fetchCourses('review');
    } else if (tabIndex === 1){
      await fetchCourses('rejected');
    } else if (tabIndex === 2){
      await fetchCourses('published');
    }
  };

  return (
    <div className={styles['container']}>
      <h1>Solicitudes de aprobación de cursos</h1>
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
            <th>Categoría</th>
            <th>Fecha de creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td className={styles['user-name']}>{course.title}</td>
              <td>{translateCategory(course.category)}</td>
              <td>{formatDate(course.created_at)}</td>
              <td>
                <NavLink to={`/admin/courses/${course.id}`}>
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

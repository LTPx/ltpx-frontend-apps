import {
  DialogConfirm,
  Icon,
  Menu,
  Select,
  Tabs,
  useMoment,
} from '@ltpx-frontend-apps/shared-ui';
import { useAdmin, useCourseUtil } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './courses-pages.module.scss';

export function CoursesPages() {
  const { _getCoursesByStatus, courses, _removeCourse, _unpublishedCourse } =
    useAdmin();
  const { translateCategory } = useCourseUtil();
  const [selectedTab, setSelectedTab] = useState(0);
  const [openMessage, setOpenMessage] = useState(false);
  const [saveId, setSaveId] = useState(0);
  const tabs = [
    { text: 'Pendientes', value: 'review' },
    { text: 'Necesita cambios', value: 'rejected' },
  ];
  const options = [{ text: 'Cursos' }, { text: 'Solicitudes' }];
  const { formatDate } = useMoment();

  const fetchCourses = useCallback(async (status: string) => {
    const resp = await _getCoursesByStatus(status);
    console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchCourses('all');
  }, []);

  const handleChangeTab = async (value: string) => {
    if (value === 'review') {
      await fetchCourses('review');
    } else if (value === 'rejected') {
      await fetchCourses('rejected');
    }
  };

  const handleClick = async (tabIndex: number) => {
    if (tabIndex === 0) {
      await fetchCourses('all');
    } else if (tabIndex === 1) {
      await fetchCourses('review');
    }
    setSelectedTab(tabIndex);
  };

  async function handleRemoveCourse(courseId: number) {
    const { success, error } = await _removeCourse(courseId);
    if (success) {
      console.log('Eliminado');
    } else {
      console.log('error: ', error);
    }
  }

  async function handleUnpublishedCourse(courseId: number) {
    const { success, error } = await _unpublishedCourse(courseId);
    if (success) {
      console.log('No publicado');
    } else {
      console.log(error);
    }
  }
  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>Administración de Cursos</h1>
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
                  <th>Estado</th>
                  <th>Profesor</th>
                  <th className={styles['th-class']}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.title}</td>
                    <td>{course.status}</td>
                    <td>{course.teacher?.teacher_name}</td>
                    <td>
                      <Menu
                        items={[
                          {
                            text: 'Ver Curso',
                            icon: 'eye',
                            url: `/admin/courses/${course.id}`,
                          },
                          {
                            text: 'Eliminar Curso',
                            icon: 'trash',
                            onClick: () => {
                              setSaveId(course.id);
                              setOpenMessage(true);
                            },
                          },
                          {
                            text: 'Despublicar Curso',
                            icon: 'pencil',
                            onClick: () => handleUnpublishedCourse(course.id),
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
                  <th>Categoría</th>
                  <th>Fecha de creación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td className={styles['user-name']}>{course.title}</td>
                    <td>{translateCategory(course.category_slug)}</td>
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
        )}
      </div>
      <DialogConfirm
        open={openMessage}
        title={'Estas seguro que deseas eliminar este curso?'}
        subtitle="Recuerde que una ves eliminado no podrá volver a recuperar la información"
        confirm={() => {
          handleRemoveCourse(saveId);
          setOpenMessage(false);
        }}
        onClose={() => setOpenMessage(false)}
      />
    </div>
  );
}

export default CoursesPages;

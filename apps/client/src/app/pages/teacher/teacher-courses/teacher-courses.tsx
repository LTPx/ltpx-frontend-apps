import { buildCourses, getTeacherCourses } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, CourseCard, InputSearch, Select } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './teacher-courses.module.scss';

/* eslint-disable-next-line */
export interface TeacherCoursesProps {}

export function TeacherCourses(props: TeacherCoursesProps) {
  getTeacherCourses


  const getCoursesData = async() => {
    const resp = await getTeacherCourses();
    console.log(resp);
  }

  // useEffect(() => {
  //   try {
  //   } catch (error) {

  //   }

  //   return () => {
  //     second
  //   }
  // }, [third])


  const categories = [
    {value: 'all', text: 'Todos'},
    {value: 'draff', text: 'Borradores'},
    {value: 'pending', text: 'Pendientes'},
  ]
    const courses = buildCourses(4);

    const EmptyState = () => (
      <div className={styles['empty-state']}>
        <h4>Aun no has creado ningun curso</h4>
        <h5>porque no empezamos creado uno</h5>
        <Button title={'Crear Curso'} color={ColorsButton.primary}/>
      </div>
    )

    const Drafts = () => (
      <div className={styles['empty-state']}>
        <h4>Aun no has creado ningun curso</h4>
      </div>
    )

    const CoursesList = () => (
      <div className={styles['courses']}>
        { courses.map((course, index)=>(
          <NavLink key={index}
            to={`/teacher/courses/${course.id}`}
            className={`${styles['link']} link-wrapper`}
          >
            <CourseCard
              key={index}
              image={course.image}
              category={course.category}
              title={course.title}
              price={course.price}
              duration={course.duration}
              lessons={course.lessons}
              stars={course.stars}
            />
          </NavLink>
        )) }
      </div>
    )

    const MyCourses = () => (
      <div className={styles['courses']}>
        { courses.length ? (
          <CoursesList />
        ) : (
          <EmptyState/>
        )}
      </div>
    )

    const PendingApprove = () => (
      <div className={styles['courses']}>
        <h4>No hay cursos pendientes de revision</h4>
      </div>
    )

  return (
    <div className={`${styles['container']}`}>
      <div className={`${styles['filters-container']}`}>
        <h4>{courses.length} Cursos en total</h4>
        <div className={styles['filters']}>
          <InputSearch placeholder='Search course'/>
          <Select options={categories} />
          <Button
            title={'+ Nuevo Curso'}
            color={ColorsButton.primary}
            onClick={getCoursesData}
          />
        </div>
      </div>
      <div className={`${styles['courses-container']}`}>
        <MyCourses/>
      </div>
    </div>
  );
}

export default TeacherCourses;

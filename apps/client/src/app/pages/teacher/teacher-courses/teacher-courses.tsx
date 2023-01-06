import { ICourse, getTeacherCourses, StatusCourse } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, InputSearch, Select, TeacherCourseCard } from '@ltpx-frontend-apps/shared-ui';
import { useEffect, useState } from 'react';
import styles from './teacher-courses.module.scss';

/* eslint-disable-next-line */
export interface TeacherCoursesProps {}

export function TeacherCourses(props: TeacherCoursesProps) {
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    let mounted = true;
    try {
      getTeacherCourses().then((courses)=> {
        if (mounted) {
          setCourses(courses);
        }
      });
    } catch (error) {
      console.log(error);
    }
    return () => {
      mounted = false;
    }
  }, [])

  const categories = [
    {value: 'all', text: 'Todos'},
    {value: 'draff', text: 'Borradores'},
    {value: 'pending', text: 'Pendientes'},
  ];

  const EmptyState = () => (
    <div className={styles['empty-state']}>
      <h4>Aun no has creado ningun curso</h4>
      <h5>porque no empezamos creado uno</h5>
    </div>
  )

  const CoursesList = () => (
    <div className={styles['courses']}>
      { courses.map((course, index)=>(
        <TeacherCourseCard
          key={index}
          status={course.status || StatusCourse.draft}
          image={'https://designshack.net/wp-content/uploads/placeholder-image-368x246.png'}
          title={course.title}
          learners={course.enrollments_count || 0}
          category={course.category}
          percentageRate={0}
          percentageLearner={0}
          url={`/teacher/courses/${course.id}`}
        />
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
            link='/teacher/courses/new'
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

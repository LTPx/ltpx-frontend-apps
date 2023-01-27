import { TeacherCourse, getTeacherCourses, CourseStatus } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, InputSearch, NewCourseForm, Select, TeacherCourseCard } from '@ltpx-frontend-apps/shared-ui';
import { Dialog } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeacher } from '../../../store';
import styles from './teacher-courses.module.scss';

const placeholderImage = 'https://designshack.net/wp-content/uploads/placeholder-image-368x246.png';
/* eslint-disable-next-line */
export interface TeacherCoursesProps {}

export function TeacherCourses(props: TeacherCoursesProps) {
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { createCourse } = useTeacher();
  const navigate = useNavigate();

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
      <h4>Aun no has creado ningún curso</h4>
      <h5>porque no empezamos creado uno</h5>
    </div>
  )

  const CoursesList = () => (
    <div className={styles['courses']}>
      { courses.map((course, index)=>(
        <TeacherCourseCard
          key={index}
          status={ course.status || CourseStatus.draft }
          image={ course.cover_url || placeholderImage }
          title={course.title}
          learners={course.enrollments_count || 0}
          category={course.category}
          percentageRate={0}
          percentageLearner={0}
          url={`/teacher/courses/edit/${course.id}`}
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

  const openNewCourse = () => {
    setOpenModal(true);
  }

  const saveNewCourse = async(newCourseParams: any) => {
    setOpenModal(false);
    const { success, data } = await createCourse(newCourseParams);
    const { id } = data;
    if (success) {
      navigate(`/teacher/courses/edit/${id}`);
    } else {
      console.log('error: ', data);
    }
  }

  return (
    <div className={`${styles['container']}`}>
      <div className={`${styles['filters-container']}`}>
        <h4>{courses.length} Cursos en total</h4>
        <div className={styles['filters']}>
          <InputSearch placeholder='Search course'/>
          <Select options={categories} />
          <Button
            title={'Nuevo Curso'}
            color={ColorsButton.primary}
            onClick={()=>{
              openNewCourse();
            }}
          />
        </div>
      </div>
      <div className={`${styles['courses-container']}`}>
        <MyCourses/>
      </div>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        hasHeader={false}
        onCloseComplete={() => setOpenModal(false)}
        width={'40vw'}
      >
        <NewCourseForm onSubmit={(data)=>{
          console.log(data);
          saveNewCourse(data);
        }}/>
      </Dialog>
    </div>
  );
}

export default TeacherCourses;

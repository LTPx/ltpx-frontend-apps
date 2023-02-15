import {
  TeacherCourse,
  CourseStatus,
} from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  EmptyState,
  InputSearch,
  NewCourseForm,
  Select,
  TeacherCourseCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourseUtil, useTeacher } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './teacher-courses.module.scss';

const placeholderImage =
  'https://designshack.net/wp-content/uploads/placeholder-image-368x246.png';
/* eslint-disable-next-line */
export interface TeacherCoursesProps {}

export function TeacherCourses(props: TeacherCoursesProps) {
  const [courses, setCourses] = useState<TeacherCourse[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { createCourse, _getCourses, loadingTeacherApi } = useTeacher();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchDataCourses = useCallback(async () => {
    const { success, data, error } = await _getCourses();
    if (success) {
      setCourses(data);
    } else {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchDataCourses();
  }, [fetchDataCourses]);

  const categories = [
    { value: 'all', text: t('teacherCourse.categories.all') },
    { value: 'draff', text: t('teacherCourse.categories.draff') },
    { value: 'publish', text: t('teacherCourse.categories.publish') },
    { value: 'review', text: t('teacherCourse.categories.review') },
  ];

  const CoursesList = () => (
    <div className={styles['courses']}>
      {courses.map((course, index) => (
        <TeacherCourseCard
          key={index}
          status={course.status || CourseStatus.draft}
          image={course.cover_url || placeholderImage}
          title={course.title}
          description={course.description}
          learners={course.enrollments_count || 0}
          category={course.category}
          percentageRate={0}
          percentageLearner={0}
          url={`/teacher/courses/edit/${course.id}`}
          price={course.price}
          dropdownActions={[
            {
              text: 'Ver Curso',
              icon: 'user-group',
              url: `/teacher/courses/${course.id}`,
            },
            {
              text: 'Editar Curso',
              icon: 'pencil',
              url: `/teacher/courses/edit/${course.id}`,
            },
          ]}
        />
      ))}
    </div>
  );

  const MyCourses = () => (
    <div className={styles['courses']}>
      <CoursesList />
    </div>
  );

  const PendingApprove = () => (
    <div className={styles['courses']}>
      <h4>No hay cursos pendientes de revision</h4>
    </div>
  );

  const openNewCourse = () => {
    setOpenModal(true);
  };

  const saveNewCourse = async (newCourseParams: any) => {
    setOpenModal(false);
    const { success, data } = await createCourse(newCourseParams);
    const { id } = data;
    if (success) {
      navigate(`/teacher/courses/edit/${id}`);
    } else {
      console.log('error: ', data);
    }
  };

  return (
    <div className={`${styles['container']}`}>
      {courses.length === 0 && (
        <EmptyState
          img={'../../../../assets/images/empty-states/no-courses.svg'}
          title={'Vamos a crear un curso'}
          description={
            'Crea tu primer curso, no te preocupes si no lo haces bien al primer intento, puedes editarlo e ir mejorandolo ademas nosotros te guiaremos en el proceso, '
          }
        >
          <div className={`${styles['button-empty-state']}`}>
            <Button
              title={'Crear mi primer curso'}
              color={ColorsButton.primary}
              icon="plus"
              onClick={() => {
                openNewCourse();
              }}
            />
          </div>
        </EmptyState>
      )}
      {courses.length > 0 && (
        <>
          <h1 className="add-space-bottom">Mis Cursos</h1>
          <div className="card">
            <div className={`${styles['filters-container']} `}>
              <h4>{courses.length} Cursos en total</h4>
              <div className={styles['filters']}>
                <InputSearch placeholder="Search course" />
                <Select options={categories} />
                <Button
                  title={t('buttons.newCourse')}
                  color={ColorsButton.primary}
                  onClick={() => {
                    openNewCourse();
                  }}
                />
              </div>
            </div>
            <div className={`${styles['courses-container']}`}>
              <MyCourses />
            </div>
          </div>
        </>
      )}
      <Dialog
        isShown={openModal}
        hasFooter={false}
        hasHeader={false}
        onCloseComplete={() => setOpenModal(false)}
        width={'40vw'}
      >
        <NewCourseForm
          onSubmit={(data) => {
            saveNewCourse(data);
          }}
          onCancel={() => setOpenModal(false)}
        />
      </Dialog>
    </div>
  );
}

export default TeacherCourses;

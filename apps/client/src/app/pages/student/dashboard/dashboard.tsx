import {
  ColorsCounterCard,
  CourseCounterCard,
  QuizProgressCard,
  UserCourseCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { NavLink } from 'react-router-dom';
import styles from './dashboard.module.scss';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { CourseStatus } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const { user } = useUser();
  const { _getStudentCourses, enrolledCourses } = useStudent();

  const cards = [
    {
      count: 2,
      text: 'Cursos Completados',
      color: ColorsCounterCard.green,
    },
    {
      count: 1,
      text: 'Cursos en Progreso',
      color: ColorsCounterCard.orange,
    },
    {
      count: 10,
      text: 'Test Completados',
      color: ColorsCounterCard.blue,
    },
    {
      count: 4,
      text: 'Test en Progreso',
      color: ColorsCounterCard.red,
    },
  ];
  const fetchCourses = useCallback(async () => {
    const { success, data, error } = await _getStudentCourses();
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className={styles['container']}>
      <h1>Bienvenido {user.fullname}!</h1>
      <div className={styles['cards-dashboard']}>
        {cards.map((card, index) => (
          <CourseCounterCard
            key={index}
            count={card.count}
            text={card.text}
            color={card.color}
          />
        ))}
      </div>
      <div className={styles['layout']}>
        <div className={styles['content']}>
          <h2>Mis Cursos</h2>
          <div className={styles['courses']}>
            {enrolledCourses.map((course, index) => (
              <UserCourseCard
                key={index}
                image={course.cover_url}
                startDate={course.created_at}
                title={course.title}
                progress={0}
                url={`/student/courses/${course.id}`}
              />
            ))}
          </div>
        </div>
        <div className={styles['help-ads']}>
          <div className={styles['profile']}>
            <div className={styles['general-information']}>
              <NavLink to="/student/account">
                <Avatar name={user.fullname} size={110} />
              </NavLink>
              <h3>{user.fullname}</h3>
              <h4>{user.email}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

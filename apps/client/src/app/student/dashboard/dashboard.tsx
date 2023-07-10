import {
  ColorsCounterCard,
  CourseCounterCard,
  Tabs,
  UserCourseCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { NavLink } from 'react-router-dom';
import styles from './dashboard.module.scss';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import StudentCertificates from '../student-certificates/student-certificates';

/* eslint-disable-next-line */
export interface DashboardProps {}
interface DashboardCard {
  count: number;
  text: string;
  color: ColorsCounterCard;
}

export function Dashboard(props: DashboardProps) {
  const { user } = useUser();
  const [cards, setCards] = useState<DashboardCard[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const { _getStudentCourses, enrolledCourses, _getStudentStatists } =
    useStudent();

  const fetchCourses = useCallback(async () => {
    const { success, data } = await _getStudentStatists();
    if (success) {
      const allCards = [
        {
          count: data.approved_courses,
          text: 'Cursos Aprobados',
          color: ColorsCounterCard.green,
        },
        {
          count: data.progress_courses,
          text: 'Cursos en Progreso',
          color: ColorsCounterCard.orange,
        },
        {
          count: data.completed_quizzes,
          text: 'Test Completados',
          color: ColorsCounterCard.blue,
        },
        {
          count: data.total_achievements,
          text: 'Logros Obtenidos',
          color: ColorsCounterCard.red,
        },
      ];
      setCards(allCards);
    }
    const resp = await _getStudentCourses();
    if (resp.success) {
      console.log('data: ', resp.data);
    } else {
      console.log('error: ', resp.error);
    }
  }, []);

  const tabs = [{ text: 'Mis cursos' }, { text: 'Mis certificados' }];

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['wrap']}>
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
            <Tabs
              tabs={tabs}
              isNav={false}
              onClickTab={(index) => setSelectedTab(index)}
            />
            {selectedTab === 0 && (
              <div className={styles['courses']}>
                {enrolledCourses.map((course, index) => (
                  <UserCourseCard
                    key={index}
                    image={course.cover_url}
                    startDate={course.created_at}
                    title={course.title}
                    progress={course.course_progress}
                    url={`/student/course/${course.slug}`}
                  />
                ))}
              </div>
            )}
            {selectedTab === 1 && (
              <StudentCertificates/>
            )}
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
    </div>
  );
}

export default Dashboard;

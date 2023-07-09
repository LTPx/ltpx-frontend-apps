import {
  CourseCertificate,
  EmptyState,
  PanelAccordion,
  RowItemCard,
  StudentProfileCard,
  Tabs,
  useMoment,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './student-profile-page.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useSite } from '@ltpx-frontend-apps/store';
import { useParams } from 'react-router-dom';
import { Certificate } from '@ltpx-frontend-apps/api';

export function StudentProfilePage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [certificate, setCertificate] = useState<Certificate>();
  const { slug, id } = useParams();
  const { _getCertificate } = useSite();
  const { formatDate } = useMoment();

  const fetchCertificate = useCallback(async () => {
    const slugUrl = slug || '';
    const idUrl = parseInt(id || '');
    if (slugUrl && idUrl) {
      const { success, data, error } = await _getCertificate(slugUrl, idUrl);
      if (success) {
        setCertificate(data);
      } else {
        console.log('error: ', error);
      }
    }
  }, []);

  useEffect(() => {
    fetchCertificate();
  }, []);

  const tabs = [
    {
      text: 'Tareas',
    },
    {
      text: 'Test',
    },
    {
      text: 'Logros',
    },
  ];

  const handleClick = (index: number) => {
    setSelectedTab(index);
  };
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <h2 className={styles['title']}>Red OpenMind</h2>
        <h5 className={styles['subtitle']}>Registro público de certificados</h5>
        {certificate ? (
          <>
            <div className={styles['wrap-content']}>
              <CourseCertificate
                image={certificate.course.cover_url}
                teacherName={certificate.teacher.name}
                titleCourse={certificate.course.name}
                totalTask={certificate.course.total_tasks}
                totalQuizzes={certificate.course.total_quizzes}
                totalAchievements={certificate.course.total_achievements}
                date={certificate.updated_at}
                link={''}
              />
              <StudentProfileCard
                className={styles['profile-card']}
                studentName={certificate.student.name}
                email={certificate.student.email}
                country={certificate.student.country || 'n/a'}
                city={certificate.student.city || 'n/a'}
                date={certificate.student.join_at}
              />
            </div>
            <div className={`${styles['tabs-content']} card`}>
              <Tabs
                className={styles['tabs']}
                classNameText={styles['tabs-edit']}
                tabs={tabs}
                isNav={false}
                onClickTab={(option) => handleClick(option)}
              />
              <div className={styles['tabs-wrap']}>
                {selectedTab === 0 && (
                  <div className={styles['tasks']}>
                    {certificate.tasks.map((task, index)=>(
                      <RowItemCard
                        key={index}
                        title={task.title}
                        date={formatDate(task.created_at, true)}
                      />
                    ))}
                  </div>
                )}
                {selectedTab === 1 && (
                  <div className={styles['quizzes']}>
                    {certificate.quizzes.map((quiz, index)=>(
                      <RowItemCard
                        key={index}
                        title={quiz.title}
                        date={formatDate(quiz.created_at, true)}
                        column={{
                          title: 'Resultado',
                          value: `${quiz.score} pts`
                        }}
                      />
                    ))}
                  </div>
                )}
                {selectedTab === 2 && (
                  <div className={styles['achievements']}>
                    {certificate.achievements.map((achievement, index)=>(
                      <RowItemCard
                        key={index}
                        title={achievement.title}
                        date={formatDate(achievement.created_at, true)}
                        image={achievement.image}
                        column={{
                          title: 'Puntos',
                          value: achievement.points
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            title="No encontrado"
            description="No hemos encontrado este certificado en nuestros registros"
          />
        )}
      </div>
    </div>
  );
}

export default StudentProfilePage;

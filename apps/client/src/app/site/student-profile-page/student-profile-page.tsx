import {
  CourseCertificate,
  PanelAccordion,
  RowItemCard,
  StudentProfileCard,
  Tabs,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './student-profile-page.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useSite } from '@ltpx-frontend-apps/store';
import { useParams } from 'react-router-dom';
import { Certificate } from '@ltpx-frontend-apps/api';

export function StudentProfilePage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [certificate, setCertificate] = useState<Certificate>()
  const { slug, id } = useParams();
  const { _getCertificate } = useSite();

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
    fetchCertificate()
  }, [])


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
      { certificate !== undefined &&
        <div className={styles['content']}>
          <h1 className={styles['title']}>Información</h1>
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
          <div className={styles['tabs-content']}>
            <Tabs
              className={styles['tabs']}
              classNameText={styles['tabs-edit']}
              tabs={tabs}
              isNav={false}
              onClickTab={(option) => handleClick(option)}
            />
            <div className={styles['tabs-wrap']}>
              {/* {selectedTab === 0 && <></>}
              {selectedTab === 1 && (
                <div className={styles['contents']}>
                  <PanelAccordion lock={true} title={'Que es el Universo'} />
                  <PanelAccordion lock={true} title={'Ciclo de una Estrella'} />
                </div>
              )} */}
              {selectedTab === 0 && (
                <div className={styles['tasks']}>
                  <RowItemCard
                    icon="task-outline"
                    title={'Pregunta sobre el Universo'}
                    date={'13 de Abril'}
                    time="1 mes"
                  />
                  <RowItemCard
                    icon="task-outline"
                    title={'Galaxias y Estrellas'}
                    date={'18 de Abril'}
                    time="1 mes"
                  />
                </div>
              )}
              {selectedTab === 1 && (
                <div className={styles['quizzes']}>
                  <RowItemCard
                    icon="list"
                    title={'El Universo desde mi perspectiva'}
                    date={'13 de Abril'}
                    time="1 mes"
                  />
                  <RowItemCard
                    icon="list"
                    title={'Examen de Conocimiento'}
                    date={'16 de Abril'}
                    time="1 mes"
                  />
                </div>
              )}
              {selectedTab === 2 && (
                <div className={styles['achievements']}>
                  <RowItemCard
                    image="https://res.cloudinary.com/dslqbzdfy/image/upload/v1674690062/achievements/star-medal_zmhtru.png"
                    title={'Genio completa 3 Exámenes'}
                    date={'15 de Junio 2023'}
                    time="1 mes"
                  />
                  <RowItemCard
                    image="https://res.cloudinary.com/dslqbzdfy/image/upload/v1674690062/achievements/awards-icons_vixivi.png"
                    title={'Master cumple 3 tareas'}
                    date={'25 de Junio 2023'}
                    time="3 semanas"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default StudentProfilePage;

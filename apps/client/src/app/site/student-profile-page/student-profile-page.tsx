import {
  CourseCertificate,
  PanelAccordion,
  RowItemCard,
  StudentProfileCard,
  Tabs,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './student-profile-page.module.scss';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface StudentProfilePageProps {}

export function StudentProfilePage(props: StudentProfilePageProps) {
  const [selectedTab, setSelectedTab] = useState(0);

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
    // {
    //   text: 'Reseñas',
    // },
  ];

  const handleClick = (index: number) => {
    setSelectedTab(index);
  };
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <h1 className={styles['title']}>Información</h1>
        <div className={styles['wrap-content']}>
          <CourseCertificate
            className={styles['certificate']}
            teacherName={'Carlos Huerta'}
            titleCourse={
              'Empieza tu propio negocio de aprendizaje en linea con OpenMind'
            }
            totalTask={8}
            totalQuizzes={10}
            totalAchievements={39}
            date={''}
            image={
              'https://res-5.cloudinary.com/dfstnuesp/image/upload/aradq4hu2giqysufv4h2ec6ykwpy.png'
            }
          />
          <StudentProfileCard
            className={styles['profile-card']}
            studentName={'Angel Capa'}
            email={'ricardocmndn@gmail.com'}
            country={'Ecuador'}
            city={'Loja'}
            date="Mayo 14 del 2013"
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
    </div>
  );
}

export default StudentProfilePage;

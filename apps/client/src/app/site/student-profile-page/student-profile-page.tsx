import {
  CourseCertificate,
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
      text: 'Información',
    },
    {
      text: 'Contenidos',
    },
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
            teacherName={'Carla Osten'}
            titleCourse={'El Universo y las Estrellas'}
            totalTask={20}
            totalQuizzes={10}
            date={''}
            imageStudent={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPf84rgOXXF7qUrqIFpde-ntEleF8R1FeQyw&usqp=CAU'
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
          <div className={styles['tabs-content']}>
            {selectedTab === 0 && <></>}
            {selectedTab === 1 && <div className={styles['contents']}></div>}
            {selectedTab === 2 && <div className={styles['tasks']}></div>}
            {selectedTab === 3 && <div className={styles['quizzes']}></div>}
            {selectedTab === 4 && (
              <div className={styles['achievements']}></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfilePage;

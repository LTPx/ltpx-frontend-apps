import { buildRandomTeacherCourseDetail } from '@ltpx-frontend-apps/api';
import { Tabs } from '@ltpx-frontend-apps/shared-ui';
import styles from './teacher-course-detail.module.scss';

const tabs = [
  { text: 'Contenidos' },
  { text: 'Estudiantes' },
  { text: 'Estadisticas' },
]
/* eslint-disable-next-line */
export interface TeacherCourseDetailProps {}

export function TeacherCourseDetail(props: TeacherCourseDetailProps) {
  const course = buildRandomTeacherCourseDetail();
  console.log('course: ', course);
  const { entity, contents } = course;

  const buildContentsTabs = () => {
    return contents.map((content, index)=>(
      {
        text: `Seccion - ${index+1}`
      }
    ))
  }
  return (
    <div className={styles['container']}>
      <div className={styles['cover']}>
        <img src={entity.image}></img>
      </div>
      <h1>{entity.title}</h1>
      <div className={styles['basic-info']}>
        <span className={`${styles['noted']} ${styles['status']}`}>{entity.status}</span>
        <span className={`${styles['noted']}`}>{entity.category}</span>
        <span className={`${styles['noted']}`}>{entity.level}</span>
        <span className={`${styles['noted']}`}>{entity.language}</span>
      </div>
      <div className={styles['about-course']}>
        <h2>Acerca del curso</h2>
        <p>{entity.description}</p>
      </div>
      <div className={styles['course-details']}>
        <Tabs tabs={tabs}/>
        <div className={styles['tab-content']}>
          <div className={styles['course-contents']}>
            <Tabs className={styles['tabs-contents']} tabs={buildContentsTabs()} vertical={true}/>
            <div className={styles['render-content']}>
              {contents.map((content, index)=>(
                <div key={index} className={styles['render-content']}>
                  <h1>{content.title}</h1>
                  <p>{content.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseDetail;

import { useState } from 'react';
import Icon from '../icon/icon';
import styles from './overview-course.module.scss';

/* eslint-disable-next-line */
export interface OverviewCourseProps {
  description?: string;
  goals?: string[];
  requirements?: string[];
}

export function OverviewCourse(props: OverviewCourseProps) {
  const { description, goals, requirements } = props;
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles['container']}>
      <div className={styles['overview']}>
        <section className={`${styles['course-description']}`}>
          <h3>Descripción del curso</h3>
          {description && (
            <div>
              {description.length > 800 ? (
                <pre>
                  {showMore
                    ? description
                    : `${description.substring(0, 800)}....`}
                  <h4
                    className={styles['show']}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? 'Mostrar menos' : 'Mostrar mas'}
                  </h4>
                </pre>
              ) : (
                <pre>{description}</pre>
              )}
            </div>
          )}
        </section>
        <section className={`${styles['achievements']}`}>
          <h3>Que aprenderás</h3>
          <div className={styles['items']}>
            {goals &&
              goals.map((goal, index) => (
                <div className={styles['item']} key={index}>
                  <div>
                    <Icon icon={'check-circle'} size={16} color="#4A8F9F" />
                  </div>
                  <h4>{goal}</h4>
                </div>
              ))}
          </div>
        </section>
        <section className={`${styles['requirements']}`}>
          <h3>Requerimientos</h3>
          {requirements &&
            requirements.map((requirement, index) => (
              <ul key={index} className={styles['list-requirements']}>
                <li>
                  <h4>{requirement}</h4>
                </li>
              </ul>
            ))}
        </section>
      </div>
    </div>
  );
}

export default OverviewCourse;

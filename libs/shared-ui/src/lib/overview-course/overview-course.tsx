import { buildCourseDetails } from '@ltpx-frontend-apps/api';
import Icon from '../icon/icon';
import styles from './overview-course.module.scss';

/* eslint-disable-next-line */
export interface OverviewCourseProps {}

export function OverviewCourse(props: OverviewCourseProps) {
  const courseDetails = buildCourseDetails();

  return (
    <div className={styles['container']}>
      <div className={styles['overview']}>
        <section className={`${styles['course-description']}`}>
          <h3>Course Description</h3>
          <p>{courseDetails.overview.description}</p>
        </section>
        <section className={`${styles['achievements']}`}>
          <h3>What you will Learn</h3>
          <div className={styles['items']}>
            {courseDetails.overview.goals.map((goal, index) => (
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
          <h3>Requirements</h3>
          {courseDetails.overview.requirements.map((requirement, index) => (
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

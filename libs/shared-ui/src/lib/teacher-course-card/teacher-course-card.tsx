import { StatusCourse } from '@ltpx-frontend-apps/api';
import Icon from '../icon/icon';
import Tag, { ColorsTag } from '../tag/tag';
import styles from './teacher-course-card.module.scss';

/* eslint-disable-next-line */

export interface TeacherCourseCardProps {
  status: StatusCourse;
  image: string;
  title: string;
  learners: number;
  category: string;
  percentageRate: number;
  percentageLearner: number;
}

export function TeacherCourseCard(props: TeacherCourseCardProps) {
  const {
    status,
    image,
    title,
    learners,
    category,
    percentageRate,
    percentageLearner,
  } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>
        <Tag
          text={status}
          color={
            status === StatusCourse.publish ? ColorsTag.green : ColorsTag.gray
          }
          icon={status === StatusCourse.publish ? 'globe' : 'edit'}
        />
        <Icon icon={'menu'} size={15} />
      </div>
      <div className={styles['content']}>
        <img src={image} alt="" />
        <div className={styles['information']}>
          <h4>{title}</h4>
          <div className={styles['describe']}>
            <h5>
              <Icon icon={'user'} size={10}></Icon> {learners} estudiantes
            </h5>
            <h5>
              <Icon icon={'box-unpacked'} size={10}></Icon> {category}
            </h5>
          </div>
        </div>
      </div>
      <div className={styles['end-content']}>
        {learners > 0 ? (
          <>
            <div className={styles['rate']}>
              <h5>Completion rate</h5>
              <h4>
                <Icon icon="check-circle" size={15}></Icon>
                {percentageRate}%
              </h4>
            </div>
            <div className={styles['rate']}>
              <h5>Completion rate</h5>
              <h4>
                <Icon icon="heart" size={15}></Icon>
                {percentageLearner}%
              </h4>
            </div>
          </>
        ) : (
          <div className={styles['course-no-yet']}>
            <Icon icon="browser" size={15}></Icon>
            <h5>This course have no stats yet</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherCourseCard;

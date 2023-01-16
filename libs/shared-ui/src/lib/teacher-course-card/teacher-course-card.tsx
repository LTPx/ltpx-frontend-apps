import { CourseStatus } from '@ltpx-frontend-apps/api';
import { NavLink } from 'react-router-dom';
import Dropdown from '../dropdown/dropdown';
import Icon from '../icon/icon';
import Menu from '../menu/menu';
import Tag, { ColorsTag } from '../tag/tag';
import styles from './teacher-course-card.module.scss';

/* eslint-disable-next-line */

export interface TeacherCourseCardProps {
  status: CourseStatus;
  image: string;
  title: string;
  learners: number;
  category: string;
  percentageRate: number;
  percentageLearner: number;
  url: string;
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
    url,
  } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>
        <Tag
          text={status}
          color={
            status === CourseStatus.publish ? ColorsTag.green : ColorsTag.gray
          }
          icon={status === CourseStatus.publish ? 'globe' : 'edit'}
        />
        <Dropdown>
          <Icon icon={'ellipsis-horizontal-outline'} size={15} />
          <Menu items={[
            {text: 'Editar curso', icon:'pencil'},
            {text: 'Ver curso', icon:'user-group'}
          ]}/>
        </Dropdown>
      </div>
      <NavLink to={url}>
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
      </NavLink>
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
            <h5>Este curso no tiene metricas aun</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherCourseCard;

import { CourseStatus } from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Dropdown from '../dropdown/dropdown';
import Icon from '../icon/icon';
import Menu, { MenuItem } from '../menu/menu';
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
  price?: number;
  dropdownActions?: MenuItem[];
}

export function TeacherCourseCard(props: TeacherCourseCardProps) {
  const { t } = useTranslation();
  const {
    status,
    image,
    title,
    learners,
    category,
    percentageRate,
    percentageLearner,
    url,
    price,
    dropdownActions
  } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>
        <div className={styles['information']}>
          <Tag
            text={t(`course_status.${status}`)}
            color={
              status === CourseStatus.publish ? ColorsTag.green : ColorsTag.gray
            }
            icon={status === CourseStatus.publish ? 'globe' : 'edit'}
          />
        </div>
        <Dropdown>
          <Icon icon={'ellipsis-horizontal-outline'} size={15} />
          <Menu items={dropdownActions || []} />
        </Dropdown>
      </div>
      <div className={styles['content']}>
        <img src={image} alt="" />
        <div className={styles['information']}>
          <NavLink to={url}>
            <h4>{title}</h4>
          </NavLink>
          <div className={styles['describe']}>
            <h5>
              <Icon icon={'user'} size={10}></Icon> {learners} Estudiantes
            </h5>
            <h5>
              <Icon icon={'box-unpacked'} size={10}></Icon>{' '}
              {t(`course_categories.${category}`)}
            </h5>
          </div>
          <div className={`${styles['describe']} ${styles['end']}`}>
            <h4 className={styles['accent']}>${price}</h4>
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
          // <div className={styles['course-no-yet']}>
          //   <Icon icon="browser" size={15}></Icon>
          //   <h5>Este curso no tiene metricas aun</h5>
          // </div>
          <></>
        )}
      </div>
    </div>
  );
}

export default TeacherCourseCard;

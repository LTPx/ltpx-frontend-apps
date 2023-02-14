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
  description: string;
  url: string;
  price?: string;
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
    description,
    url,
    price,
    dropdownActions,
  } = props;

  return (
    <div className={styles['container']}>
      <img className={styles['course-img']} src={image} alt="" />
      <div className={styles['content']}>
        <div className={styles['head-content']}>
          <div className={styles['head']}>
            <Tag
              text={t(`course_status.${status}`)}
              color={
                status === CourseStatus.publish
                  ? ColorsTag.green
                  : ColorsTag.gray
              }
              icon={status === CourseStatus.publish ? 'globe' : 'edit'}
            />
            <h5>
              <Icon icon={'box-unpacked'} size={10}></Icon>{' '}
              {t(`course_categories.${category}`)}
            </h5>
            <h5>
              <Icon icon={'user'} size={10}></Icon> {learners} Estudiantes
            </h5>
          </div>
          <Dropdown>
            <Icon icon={'ellipsis-horizontal-outline'} size={15} />
            <Menu items={dropdownActions || []} />
          </Dropdown>
        </div>
        <div className={styles['information-course']}>
          <NavLink to={url}>
            <h4>{title}</h4>
          </NavLink>
          <h4>{description.substring(0, 150)}....</h4>
          <div className={`${styles['describe']} ${styles['end']}`}>
            <h4 className={styles['accent']}>${price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseCard;

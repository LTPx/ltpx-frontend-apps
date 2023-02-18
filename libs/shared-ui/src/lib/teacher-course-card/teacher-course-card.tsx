import { CourseStatus } from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
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
    description,
    url,
    price,
    dropdownActions,
  } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['course-img']}>
        <img src={image} alt="" />
      </div>
      <div className={styles['content']}>
        <div className={styles['head-content']}>
          <div className={styles['head']}>
            <Tag
              text={t(`course_status.${status}`)}
              color={
                status === CourseStatus.publish
                  ? ColorsTag.green
                  : ColorsTag.white
              }
              icon={status === CourseStatus.publish ? 'globe' : 'edit'}
            />
            <Tag
              text={t(`course_categories.${category}`)}
              color={ColorsTag.gray}
            />
            <h5>
              <Icon icon={'user'} size={13}></Icon> {learners} Estudiantes
            </h5>
          </div>
          {dropdownActions && (
            <Menu items={dropdownActions}>
              <Icon
                icon={'ellipsis-horizontal-outline'}
                size={15}
                className={styles['icon-button']}
              />
            </Menu>
          )}
        </div>
        <div className={styles['information-course']}>
          <NavLink to={url}>
            <h3 className={styles['title']}>{title}</h3>
          </NavLink>
          <p>{description ? `${description.substring(0, 250)}...` : ''}</p>
          <div className={`${styles['describe']} ${styles['end']}`}>
            <h4 className={styles['accent']}>${price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseCard;

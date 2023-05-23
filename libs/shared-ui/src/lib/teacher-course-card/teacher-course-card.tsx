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
  urlStudents: string;
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
    urlStudents,
  } = props;

  const statusColors = {
    published: ColorsTag.green,
    review: ColorsTag.blue,
    draft: ColorsTag.gray,
    rejected: ColorsTag.orange,
  };

  const statusIcons = {
    published: 'globe',
    review: 'eye',
    draft: 'edit',
    rejected: 'edit',
  };

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
              color={statusColors[status]}
              icon={statusIcons[status]}
            />
            <Tag
              text={t(`course_categories.${category}`)}
              color={ColorsTag.gray}
            />
            <h5>
              {learners > 0 ? (
                <div>
                  {learners === 1 ? (
                    <NavLink
                      className={styles['students-url']}
                      to={urlStudents}
                    >
                      <Icon icon={'persons'} size={14}></Icon> {learners}{' '}
                      <h5>Estudiante</h5>
                    </NavLink>
                  ) : (
                    <NavLink
                      className={styles['students-url']}
                      to={urlStudents}
                    >
                      <Icon icon={'persons'} size={14}></Icon> {learners}{' '}
                      <h5>Estudiantes</h5>
                    </NavLink>
                  )}
                </div>
              ) : (
                <div className={styles['students-icon']}>
                  <Icon icon={'persons'} size={14}></Icon> {learners}{' '}
                  <h5>Estudiantes</h5>
                </div>
              )}
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
          {url ? (
            <NavLink to={url}>
              <h3 className={styles['title']}>{title}</h3>
            </NavLink>
          ) : (
            <h3 className={styles['title']}>{title}</h3>
          )}
          {description && (
            <div>
              {description.length > 200 ? (
                <p>
                  {description ? `${description.substring(0, 200)}...` : ''}
                </p>
              ) : (
                <p>{description}</p>
              )}
            </div>
          )}
          <div className={`${styles['describe']} ${styles['end']}`}>
            <h4 className={styles['accent']}>${price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseCard;

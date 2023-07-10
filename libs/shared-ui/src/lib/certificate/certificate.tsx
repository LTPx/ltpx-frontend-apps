import { Position, Tooltip } from 'evergreen-ui';
import Tag, { ColorsTag } from '../tag/tag';
import styles from './certificate.module.scss';
import { AchievementModel } from '@ltpx-frontend-apps/api';
import { useMoment } from '../../hooks/useMoment';
import { Link, NavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface CertificateProps {
  teacherName: string;
  titleCourse: string;
  achievements?: AchievementModel[];
  totalTask: number;
  totalQuizzes: number;
  totalAchievements: number;
  date: string;
  link: string;
  className?: string;
}

export function Certificate(props: CertificateProps) {
  const {
    teacherName,
    titleCourse,
    achievements,
    totalTask,
    totalQuizzes,
    date,
    link,
    className,
    totalAchievements,
  } = props;
  const { customFormatDate } = useMoment();

  return (
    <div className={styles['container']}>
      <div className={`${styles['content']} ${className}`}>
        <div className={styles['certificate-content']}>
          <div className={styles['header']}>
            <h2 className={styles['title']}>{titleCourse}</h2>
          </div>
          <div className={styles['body']}>
            <div className={styles['information']}>
              <div className={styles['item']}>
                <h4>Profesor: </h4>
                <h4 className={styles['text']}>{teacherName}</h4>
              </div>
              <div className={styles['item']}>
                <h4>Tareas: </h4>
                <h4 className={styles['text']}>{totalTask}</h4>
              </div>
              <div className={styles['item']}>
                <h4>Tests: </h4>
                <h4 className={styles['text']}>{totalQuizzes}</h4>
              </div>
              <div className={styles['item']}>
                <h4>Logros: </h4>
                <h4 className={styles['text']}>{totalAchievements}</h4>
              </div>
              <div className={styles['item']}>
                <h4>Fecha de culminación: </h4>
                <h4 className={styles['text']}>
                  {customFormatDate(date, 'MMM D YYYY')}
                </h4>
              </div>
              <div  className={styles['link-details']}>
                <Link to={link} target='_blank'>Ver mas detalles en red openmind</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;

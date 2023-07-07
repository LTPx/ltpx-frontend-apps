import { Position, Tooltip } from 'evergreen-ui';
import Tag, { ColorsTag } from '../tag/tag';
import styles from './course-certificate.module.scss';
import { AchievementModel } from '@ltpx-frontend-apps/api';
import { useMoment } from '../../hooks/useMoment';
import { NavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface CourseCertificateProps {
  teacherName: string;
  titleCourse: string;
  achievements?: AchievementModel[];
  totalTask: number;
  totalQuizzes: number;
  date: string;
  link?: string;
  image: string;
  className?: string;
}

export function CourseCertificate(props: CourseCertificateProps) {
  const {
    image,
    teacherName,
    titleCourse,
    achievements,
    totalTask,
    totalQuizzes,
    date,
    link,
    className,
  } = props;
  const { customFormatDate } = useMoment();

  return (
    <div className={styles['container']}>
      <div className={`${styles['content']} ${className}`}>
        <div className={styles['certificate-content']}>
          <div className={styles['header']}>
            <h2 className={styles['title']}>Resumen</h2>
            <Tag
              className={styles['tag-certificate']}
              text="certificado"
              color={ColorsTag.green}
            />
          </div>
          <div className={styles['body']}>
            <div className={styles['row']}>
              <img className={styles['img-card']} src={image} />
            </div>
            <div className={styles['information']}>
              <div className={styles['item-1']}>
                <h4>Titulo del Curso: </h4>
                <h4 className={styles['text']}>{titleCourse}</h4>
              </div>
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
                <div className={styles['achievement-wrap']}>
                  {achievements &&
                    achievements.map((achievement, index) => (
                      <Tooltip
                        content={achievement.title}
                        position={Position.TOP}
                        key={index}
                      >
                        <NavLink to={link || ''}>
                          <img
                            className={styles['achievement']}
                            src={achievement.image}
                          />
                        </NavLink>
                      </Tooltip>
                    ))}
                </div>
              </div>
              <div className={styles['item']}>
                <h4>Fecha: </h4>
                <h4 className={styles['text']}>
                  {customFormatDate(date, 'MMM D YYYY')} -{' '}
                  {customFormatDate(date, 'MMM D YYYY')}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCertificate;

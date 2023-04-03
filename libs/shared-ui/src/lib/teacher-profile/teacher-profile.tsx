import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar, { AvatarSize } from '../avatar/avatar';
import Icon from '../icon/icon';
import styles from './teacher-profile.module.scss';
import CourseCard from '../course-card/course-card';
import { CourseModel } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface TeacherProfileProps {
  image: string;
  video: string;
  name: string;
  skills: string;
  biography: string;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  totalCourses: number;
  socialNetworks: any[]; //TODO: add interface
  courses: CourseModel[];
}

export function TeacherProfile(props: TeacherProfileProps) {
  const {
    image,
    video,
    name,
    skills,
    biography,
    rating,
    totalReviews,
    totalStudents,
    totalCourses,
    socialNetworks,
    courses,
  } = props;
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>
        <div className={styles['head-profile']}>
          <Avatar image={image} size={AvatarSize.large} outline={true} />
          <h1>{name}</h1>
          <h3>{skills}</h3>
          <div className={styles['teacher-review-information']}>
            <div className={styles['review-information']}>
              <Icon className={styles['icon']} icon={'star'} size={18}></Icon>
              <h4>{rating}</h4>
              <h4>{t('coursesDetails.teacherOverview.teacherRating')}</h4>
            </div>
            <div className={styles['review-information']}>
              <Icon
                className={styles['icon']}
                icon={'comment'}
                size={18}
              ></Icon>
              <h4>{totalReviews}</h4>
              <h4>{t('coursesDetails.teacherOverview.reviews')}</h4>
            </div>
            <div className={styles['review-information']}>
              <Icon
                className={styles['icon']}
                icon={'persons'}
                size={18}
              ></Icon>
              <h4>{totalStudents}</h4>
              <h4>{t('coursesDetails.teacherOverview.students')}</h4>
            </div>
            <div className={styles['review-information']}>
              <Icon className={styles['icon']} icon={'book'} size={18}></Icon>
              <h4>{totalCourses}</h4>
              <h4>{t('coursesDetails.teacherOverview.courses')}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['information']}>
        <div className={styles['information-wrap']}>
          <div className={styles['information-content']}>
            <h2>Sobre {name}</h2>
            {biography && (
              <div>
                {biography.length > 500 ? (
                  <>
                    <p className={styles['text-description']}>
                      {showMore
                        ? biography
                        : `${biography.substring(0, 500)}....`}
                    </p>
                    <div
                      className={styles['show']}
                      onClick={() => setShowMore(!showMore)}
                    >
                      <h4>{showMore ? 'Mostrar menos' : 'Mostrar mas'}</h4>
                    </div>
                  </>
                ) : (
                  <p className={styles['text-description']}>{biography}</p>
                )}
              </div>
            )}
            <div className={styles['social-networks']}>
              {socialNetworks.map((network, index) => (
                <a
                  className={styles['social-network']}
                  href={network.url}
                  key={index}
                >
                  <Icon
                    className={styles['icon']}
                    icon={network.name}
                    size={22}
                  />
                </a>
              ))}
            </div>
          </div>
          <div className={styles['video-content']}>
            <h2>Video de Presentación</h2>
            <video width="90%" height="300" src={video} controls></video>
          </div>
        </div>
      </div>
      <div className={styles['courses']}>
        <div className={styles['courses-content']}>
          <h2>Cursos del profesor</h2>
          <div className={styles['courses-teacher']}>
            {courses.map((course, index) => (
              <div className={styles['course']} key={index}>
                <CourseCard
                  image={course.cover_url}
                  category={course.category}
                  title={course.title}
                  price={course.price_format}
                  duration={0}
                  achievements={course.achievements?.length}
                  stars={course.average_rating}
                  link={`/course/${course.id}/details`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;

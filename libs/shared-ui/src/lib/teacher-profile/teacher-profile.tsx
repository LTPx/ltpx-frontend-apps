import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar, { AvatarSize } from '../avatar/avatar';
import Icon from '../icon/icon';
import styles from './teacher-profile.module.scss';
import illustration from './../../assets/images/astronaut.svg';
import CourseCard from '../course-card/course-card';
import { buildCourses } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface TeacherProfileProps {
  img: string;
  nameTeacher: string;
  profession: string;
  biography: string;
  rating: number;
  reviews: number;
  students: number;
  courses: number;
}

export function TeacherProfile(props: TeacherProfileProps) {
  const {
    img,
    nameTeacher,
    profession,
    biography,
    rating,
    reviews,
    students,
    courses,
  } = props;
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation();
  const popularCourses = buildCourses(4);

  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>
        <div className={styles['head-profile']}>
          <Avatar image={img} size={AvatarSize.large} outline={true} />
          <h1>{nameTeacher}</h1>
          <h3>{profession}</h3>
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
              <h4>{reviews}</h4>
              <h4>{t('coursesDetails.teacherOverview.reviews')}</h4>
            </div>
            <div className={styles['review-information']}>
              <Icon
                className={styles['icon']}
                icon={'persons'}
                size={18}
              ></Icon>
              <h4>{students}</h4>
              <h4>{t('coursesDetails.teacherOverview.students')}</h4>
            </div>
            <div className={styles['review-information']}>
              <Icon className={styles['icon']} icon={'book'} size={18}></Icon>
              <h4>{courses}</h4>
              <h4>{t('coursesDetails.teacherOverview.courses')}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['information']}>
        <div className={styles['information-wrap']}>
          <div className={styles['information-content']}>
            <h2>Sobre Katherine</h2>
            <p>
              {showMore ? biography : `${biography.substring(0, 500)}....`}
              <h4
                className={styles['show']}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Mostrar menos' : 'Mostrar mas'}
              </h4>
            </p>
            <div className={styles['social-networks']}>
              <Icon className={styles['icon']} icon={'facebook'} size={22} />
              <Icon className={styles['icon']} icon={'twitter'} size={22} />
              <Icon className={styles['icon']} icon={'instagram'} size={22} />
              <Icon className={styles['icon']} icon={'linkedin'} size={22} />
            </div>
          </div>
          <div className={styles['video-content']}>
            <h2>Video de Presentación</h2>
            <video
              width="90%"
              height="300"
              src="video.webm"
              poster="../../../../assets/images/video.svg"
              controls
            ></video>
          </div>
        </div>
      </div>
      <div className={styles['courses']}>
        <div className={styles['courses-content']}>
          <h2>Cursos</h2>
          <div className={styles['courses-teacher']}>
          {popularCourses.map((course, index) => (
            <div className={styles['course']} key={index}>
              <CourseCard
                image={course.cover}
                category={course.category}
                title={course.title}
                price={course.price_format}
                duration={0}
                lessons={0}
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

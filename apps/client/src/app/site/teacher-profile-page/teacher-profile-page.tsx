import { TeacherSummary } from '@ltpx-frontend-apps/api';
import { TeacherProfile } from '@ltpx-frontend-apps/shared-ui';
import { useSite } from '@ltpx-frontend-apps/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import ProfileUser from 'libs/shared-ui/src/lib/profile-user/profile-user';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './teacher-profile-page.module.scss';

/* eslint-disable-next-line */
export interface TeacherProfilePageProps {}

export function TeacherProfilePage(props: TeacherProfilePageProps) {
  const [teacher, setTeacher] = useState<TeacherSummary>();
  const { slug } = useParams();
  const { _getTeacherProfile } = useSite();

  const fetchPopularCourse = useCallback(async () => {
    const id = slug || '';
    const { success, data, error } = await _getTeacherProfile(id);
    if (success) {
      console.log(data);
      setTeacher(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchPopularCourse();
  }, []);
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        {teacher && (
          <TeacherProfile
            image={teacher.profile_image}
            video={teacher.profile_video}
            name={teacher.name}
            profession={'Fotógrafa'}
            biography={teacher.biography}
            rating={teacher.rating_average}
            totalReviews={teacher.total_reviews}
            totalStudents={teacher.total_students}
            totalCourses={teacher.total_courses}
            socialNetworks={teacher.social_networks}
          />
        )}
      </div>
    </div>
  );
}

export default TeacherProfilePage;

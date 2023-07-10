import { useCallback, useEffect, useState } from 'react';
import styles from './student-certificates.module.scss';
import { useStudent, useUser } from '@ltpx-frontend-apps/store';
import { Certificate, CourseCertificate } from '@ltpx-frontend-apps/shared-ui';
import { CertificateModel } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface StudentCertificatesProps {}

export function StudentCertificates(props: StudentCertificatesProps) {
  const { _getStudentCertificates } = useStudent();
  const { user } = useUser();
  const [certificates, setCertificates] = useState<CertificateModel[]>([]);

  const fetchClasses = useCallback(async () => {
    const { success, data, error } = await _getStudentCertificates();
    if (success) {
      setCertificates(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return (
    <div className={styles['certificates']}>
      {certificates.map((certificate, index) => (
        <Certificate
          key={index}
          teacherName={certificate.teacher.name}
          titleCourse={certificate.course.name}
          totalTask={certificate.course.total_tasks}
          totalQuizzes={certificate.course.total_quizzes}
          totalAchievements={certificate.course.total_achievements}
          date={certificate.updated_at}
          link={`/${user.slug}/certificate/${certificate.id}`}
        />
      ))}
    </div>
  );
}

export default StudentCertificates;

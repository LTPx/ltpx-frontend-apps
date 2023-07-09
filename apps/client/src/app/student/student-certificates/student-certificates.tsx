import { useCallback, useEffect, useState } from 'react';
import styles from './student-certificates.module.scss';
import { useStudent, useUser } from '@ltpx-frontend-apps/store';
import { CourseCertificate } from '@ltpx-frontend-apps/shared-ui';
import { StudentCourse } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface StudentCertificatesProps {}

export function StudentCertificates(props: StudentCertificatesProps) {
  const { _getStudentCertificates } = useStudent();
  const { user } = useUser();
  const [certificates, setCertificates] = useState<StudentCourse[]>([]);

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
        <CourseCertificate
          key={index}
          image={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPf84rgOXXF7qUrqIFpde-ntEleF8R1FeQyw&usqp=CAU'
          }
          teacherName={certificate.teacher?.teacher_name || ''}
          titleCourse={'mi curso'}
          totalTask={10}
          totalQuizzes={20}
          date={''}
          link={`/${user.fullname}/${certificate.id}`}
        />
      ))}
    </div>
  );
}

export default StudentCertificates;

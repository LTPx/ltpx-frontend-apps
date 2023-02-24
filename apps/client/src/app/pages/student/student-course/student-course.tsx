import {
  AchievementsList,
  Button,
  CourseContents,
  QuizzesList,
} from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './student-course.module.scss';

/* eslint-disable-next-line */
export interface StudentCourseProps {}

export function StudentCourse(props: StudentCourseProps) {
  const { _getStudentCourse, enrolledCourse } = useStudent();
  const params = useParams();
  const { courseId } = params;
  const id = parseInt(courseId || '');

  const fetchCourse = useCallback(async () => {
    const { success, data, error } = await _getStudentCourse(id);
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleStartTest = () => {
    console.log('start');
  };

  return (
    <div className={styles['container']}>
      <h1>Curso: {enrolledCourse.title}</h1>
      <br />
      <div className="card with-padding">
        <CourseContents contents={enrolledCourse.contents || []} />
        {enrolledCourse.quizzes?.map((quiz, index)=>(
          <div className="quiz" key={index}>
            <h4>{quiz.name}</h4>
            <div className="actions">
              <Button
                title="Empezar test"
                icon="play-filled"
                onClick={handleStartTest}
                link={`/student/quiz/${quiz.id}`}
              />
            </div>
          </div>
        ))}
        <br />
        <AchievementsList achievements={enrolledCourse.achievements || []} />
      </div>
    </div>
  );
}

export default StudentCourse;

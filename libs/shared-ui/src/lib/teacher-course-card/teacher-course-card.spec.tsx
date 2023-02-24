import { render } from '@testing-library/react';

import TeacherCourseCard, { CourseStatus } from './teacher-course-card';

describe('TeacherCourseCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherCourseCard status={CourseStatus.publish} icon={''} image={''} title={''} learners={0} design={''} percentageRate={0} percentageLearner={0} />);
    expect(baseElement).toBeTruthy();
  });
});

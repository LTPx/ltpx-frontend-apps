import { render } from '@testing-library/react';

import TeacherCourseCard from './teacher-course-card';

describe('TeacherCourseCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherCourseCard />);
    expect(baseElement).toBeTruthy();
  });
});

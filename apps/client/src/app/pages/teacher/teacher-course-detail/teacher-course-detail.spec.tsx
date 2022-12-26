import { render } from '@testing-library/react';

import TeacherCourseDetail from './teacher-course-detail';

describe('TeacherCourseDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherCourseDetail />);
    expect(baseElement).toBeTruthy();
  });
});

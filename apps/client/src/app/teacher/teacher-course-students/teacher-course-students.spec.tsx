import { render } from '@testing-library/react';

import TeacherCourseStudents from './teacher-course-students';

describe('TeacherCourseStudents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherCourseStudents />);
    expect(baseElement).toBeTruthy();
  });
});

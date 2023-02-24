import { render } from '@testing-library/react';

import TeacherCourses from './teacher-courses';

describe('TeacherCourses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherCourses />);
    expect(baseElement).toBeTruthy();
  });
});

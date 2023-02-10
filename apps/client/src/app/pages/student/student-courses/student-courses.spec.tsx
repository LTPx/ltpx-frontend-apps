import { render } from '@testing-library/react';

import StudentCourses from './student-courses';

describe('StudentCourses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentCourses />);
    expect(baseElement).toBeTruthy();
  });
});

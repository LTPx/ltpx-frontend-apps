import { render } from '@testing-library/react';

import StudentCourseClasses from './student-course-classes';

describe('StudentCourseClasses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentCourseClasses courseId={0} />);
    expect(baseElement).toBeTruthy();
  });
});

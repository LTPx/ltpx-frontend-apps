import { render } from '@testing-library/react';

import CourseClassroom from './course-classroom';

describe('CourseClassroom', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseClassroom />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import CourseClasses from './course-classes';

describe('CourseClasses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseClasses />);
    expect(baseElement).toBeTruthy();
  });
});

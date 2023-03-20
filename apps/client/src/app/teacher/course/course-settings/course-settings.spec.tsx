import { render } from '@testing-library/react';

import CourseSettings from './course-settings';

describe('CourseSettings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseSettings />);
    expect(baseElement).toBeTruthy();
  });
});

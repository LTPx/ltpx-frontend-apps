import { render } from '@testing-library/react';

import CourseRowCard from './course-row-card';

describe('CourseRowCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseRowCard />);
    expect(baseElement).toBeTruthy();
  });
});

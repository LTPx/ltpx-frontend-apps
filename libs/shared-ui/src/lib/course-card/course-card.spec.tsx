import { render } from '@testing-library/react';

import CourseCard from './course-card';

describe('CourseCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseCard />);
    expect(baseElement).toBeTruthy();
  });
});

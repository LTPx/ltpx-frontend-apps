import { render } from '@testing-library/react';

import PopularCourses from './popular-courses';

describe('PopularCourses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PopularCourses />);
    expect(baseElement).toBeTruthy();
  });
});

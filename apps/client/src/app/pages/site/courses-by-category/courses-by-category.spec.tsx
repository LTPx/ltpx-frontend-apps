import { render } from '@testing-library/react';

import CoursesByCategory from './courses-by-category';

describe('CoursesByCategory', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoursesByCategory />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import AllCourses from './all-courses';

describe('AllCourses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AllCourses />);
    expect(baseElement).toBeTruthy();
  });
});

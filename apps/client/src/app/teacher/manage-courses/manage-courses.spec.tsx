import { render } from '@testing-library/react';

import ManageCourses from './manage-courses';

describe('ManageCourses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageCourses />);
    expect(baseElement).toBeTruthy();
  });
});

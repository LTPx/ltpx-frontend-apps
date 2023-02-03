import { render } from '@testing-library/react';

import CourseDetailsPage from './course-details-page';

describe('CourseDetailsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseDetailsPage />);
    expect(baseElement).toBeTruthy();
  });
});

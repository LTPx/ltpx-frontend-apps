import { render } from '@testing-library/react';

import CourseDetails from './course-details';

describe('CourseDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseDetails />);
    expect(baseElement).toBeTruthy();
  });
});

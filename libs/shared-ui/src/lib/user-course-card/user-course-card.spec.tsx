import { render } from '@testing-library/react';

import UserCourseCard from './user-course-card';

describe('UserCourseCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserCourseCard />);
    expect(baseElement).toBeTruthy();
  });
});

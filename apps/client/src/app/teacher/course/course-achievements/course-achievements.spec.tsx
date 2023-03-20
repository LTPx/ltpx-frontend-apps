import { render } from '@testing-library/react';

import CourseAchievements from './course-achievements';

describe('CourseAchievements', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseAchievements />);
    expect(baseElement).toBeTruthy();
  });
});

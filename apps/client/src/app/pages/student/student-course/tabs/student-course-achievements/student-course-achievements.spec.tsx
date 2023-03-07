import { render } from '@testing-library/react';

import StudentCourseAchievements from './student-course-achievements';

describe('StudentCourseAchievements', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentCourseAchievements />);
    expect(baseElement).toBeTruthy();
  });
});

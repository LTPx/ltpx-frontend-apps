import { render } from '@testing-library/react';

import StudentCourseTasks from './student-course-tasks';

describe('StudentCourseTasks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentCourseTasks />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import CourseTasks from './course-tasks';

describe('CourseTasks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseTasks />);
    expect(baseElement).toBeTruthy();
  });
});

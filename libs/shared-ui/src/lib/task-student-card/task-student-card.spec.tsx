import { render } from '@testing-library/react';

import TaskStudentCard from './task-student-card';

describe('TaskStudentCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TaskStudentCard />);
    expect(baseElement).toBeTruthy();
  });
});

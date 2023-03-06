import { render } from '@testing-library/react';

import TaskTeacherCard from './task-teacher-card';

describe('TaskTeacherCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TaskTeacherCard />);
    expect(baseElement).toBeTruthy();
  });
});

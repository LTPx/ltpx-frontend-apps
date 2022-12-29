import { render } from '@testing-library/react';

import TeacherDashboard from './teacher-dashboard';

describe('TeacherDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherDashboard />);
    expect(baseElement).toBeTruthy();
  });
});

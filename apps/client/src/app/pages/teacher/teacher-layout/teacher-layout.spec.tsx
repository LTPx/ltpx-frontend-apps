import { render } from '@testing-library/react';

import TeacherLayout from './teacher-layout';

describe('TeacherLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherLayout />);
    expect(baseElement).toBeTruthy();
  });
});

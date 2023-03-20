import { render } from '@testing-library/react';

import TeacherAccountLayout from './teacher-account-layout';

describe('TeacherAccountLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherAccountLayout />);
    expect(baseElement).toBeTruthy();
  });
});

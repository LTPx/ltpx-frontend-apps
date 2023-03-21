import { render } from '@testing-library/react';

import TeacherAccountProfile from './teacher-account-profile';

describe('TeacherAccountProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherAccountProfile />);
    expect(baseElement).toBeTruthy();
  });
});

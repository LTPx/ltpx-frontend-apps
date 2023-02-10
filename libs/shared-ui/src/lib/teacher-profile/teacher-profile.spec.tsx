import { render } from '@testing-library/react';

import TeacherProfile from './teacher-profile';

describe('TeacherProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherProfile />);
    expect(baseElement).toBeTruthy();
  });
});

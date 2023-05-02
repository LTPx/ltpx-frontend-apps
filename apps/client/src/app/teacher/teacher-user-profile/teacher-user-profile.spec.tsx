import { render } from '@testing-library/react';

import TeacherUserProfile from './teacher-user-profile';

describe('TeacherUserProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherUserProfile />);
    expect(baseElement).toBeTruthy();
  });
});

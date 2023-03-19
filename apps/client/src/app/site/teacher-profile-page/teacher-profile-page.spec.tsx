import { render } from '@testing-library/react';

import TeacherProfilePage from './teacher-profile-page';

describe('TeacherProfilePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherProfilePage />);
    expect(baseElement).toBeTruthy();
  });
});

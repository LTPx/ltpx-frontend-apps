import { render } from '@testing-library/react';

import TeacherProfileForm from './teacher-profile-form';

describe('TeacherProfileForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherProfileForm />);
    expect(baseElement).toBeTruthy();
  });
});

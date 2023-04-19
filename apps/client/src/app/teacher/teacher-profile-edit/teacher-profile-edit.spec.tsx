import { render } from '@testing-library/react';

import TeacherProfileEdit from './teacher-profile-edit';

describe('TeacherProfileEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherProfileEdit />);
    expect(baseElement).toBeTruthy();
  });
});

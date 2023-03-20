import { render } from '@testing-library/react';

import TeacherAccount from './teacher-account';

describe('TeacherAccount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherAccount />);
    expect(baseElement).toBeTruthy();
  });
});

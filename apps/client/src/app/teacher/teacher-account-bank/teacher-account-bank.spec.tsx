import { render } from '@testing-library/react';

import TeacherAccountBank from './teacher-account-bank';

describe('TeacherAccountBank', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherAccountBank />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import StudentAccountProfile from './student-account-profile';

describe('StudentAccountProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentAccountProfile />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import StudentAccountLayout from './student-account-layout';

describe('StudentAccountLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentAccountLayout />);
    expect(baseElement).toBeTruthy();
  });
});

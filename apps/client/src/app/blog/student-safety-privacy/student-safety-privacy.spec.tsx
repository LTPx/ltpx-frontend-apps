import { render } from '@testing-library/react';

import StudentSafetyPrivacy from './student-safety-privacy';

describe('StudentSafetyPrivacy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentSafetyPrivacy />);
    expect(baseElement).toBeTruthy();
  });
});

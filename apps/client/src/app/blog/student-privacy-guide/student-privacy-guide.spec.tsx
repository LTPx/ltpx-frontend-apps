import { render } from '@testing-library/react';

import StudentPrivacyGuide from './student-privacy-guide';

describe('StudentPrivacyGuide', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentPrivacyGuide />);
    expect(baseElement).toBeTruthy();
  });
});

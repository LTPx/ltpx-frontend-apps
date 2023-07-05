import { render } from '@testing-library/react';

import StudentProfilePage from './student-profile-page';

describe('StudentProfilePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentProfilePage />);
    expect(baseElement).toBeTruthy();
  });
});

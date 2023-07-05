import { render } from '@testing-library/react';

import StudentProfileCard from './student-profile-card';

describe('StudentProfileCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentProfileCard />);
    expect(baseElement).toBeTruthy();
  });
});

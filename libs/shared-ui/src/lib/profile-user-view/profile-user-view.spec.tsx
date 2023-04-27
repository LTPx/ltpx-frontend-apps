import { render } from '@testing-library/react';

import ProfileUserView from './profile-user-view';

describe('ProfileUserView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileUserView />);
    expect(baseElement).toBeTruthy();
  });
});

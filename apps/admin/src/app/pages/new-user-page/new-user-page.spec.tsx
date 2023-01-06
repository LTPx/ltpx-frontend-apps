import { render } from '@testing-library/react';

import NewUserPage from './new-user-page';

describe('NewUserPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewUserPage />);
    expect(baseElement).toBeTruthy();
  });
});

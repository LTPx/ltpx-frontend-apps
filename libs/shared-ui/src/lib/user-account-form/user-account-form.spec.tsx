import { render } from '@testing-library/react';

import UserAccountForm from './user-account-form';

describe('UserAccountForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserAccountForm />);
    expect(baseElement).toBeTruthy();
  });
});

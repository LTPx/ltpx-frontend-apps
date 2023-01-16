import { render } from '@testing-library/react';

import ChangePasswordForm from './change-password-form';

describe('ChangePasswordForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChangePasswordForm />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import BankAccountForm from './payment-form';

describe('BankAccountForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BankAccountForm />);
    expect(baseElement).toBeTruthy();
  });
});

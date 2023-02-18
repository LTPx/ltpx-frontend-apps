import { render } from '@testing-library/react';

import CheckoutForm from './checkout-form';

describe('CheckoutForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckoutForm />);
    expect(baseElement).toBeTruthy();
  });
});

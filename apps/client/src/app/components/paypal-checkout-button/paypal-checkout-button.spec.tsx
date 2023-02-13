import { render } from '@testing-library/react';

import PaypalCheckoutButton from './paypal-checkout-button';

describe('PaypalCheckoutButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaypalCheckoutButton />);
    expect(baseElement).toBeTruthy();
  });
});

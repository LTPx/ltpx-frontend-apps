import { render } from '@testing-library/react';

import PaymentForm from './payment-form';

describe('PaymentForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaymentForm />);
    expect(baseElement).toBeTruthy();
  });
});

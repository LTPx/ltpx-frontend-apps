import { render } from '@testing-library/react';

import PaymentsLayout from './payments-layout';

describe('PaymentsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaymentsLayout />);
    expect(baseElement).toBeTruthy();
  });
});

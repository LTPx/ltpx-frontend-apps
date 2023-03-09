import { render } from '@testing-library/react';

import PaymentsDetailsPage from './payments-details-page';

describe('PaymentsDetailsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaymentsDetailsPage />);
    expect(baseElement).toBeTruthy();
  });
});

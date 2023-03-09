import { render } from '@testing-library/react';

import PaymentsPage from './payments-page';

describe('PaymentsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaymentsPage />);
    expect(baseElement).toBeTruthy();
  });
});

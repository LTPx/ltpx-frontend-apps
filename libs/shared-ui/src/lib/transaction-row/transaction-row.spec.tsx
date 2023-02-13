import { render } from '@testing-library/react';

import TransactionRow from './transaction-row';

describe('TransactionRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TransactionRow />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import BalanceAccount from './balance-account';

describe('BalanceAccount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BalanceAccount />);
    expect(baseElement).toBeTruthy();
  });
});

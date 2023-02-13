import { render } from '@testing-library/react';

import BalanceCard from './balance-card';

describe('BalanceCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BalanceCard />);
    expect(baseElement).toBeTruthy();
  });
});

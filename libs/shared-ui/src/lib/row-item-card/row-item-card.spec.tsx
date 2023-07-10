import { render } from '@testing-library/react';

import RowItemCard from './row-item-card';

describe('RowItemCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RowItemCard />);
    expect(baseElement).toBeTruthy();
  });
});

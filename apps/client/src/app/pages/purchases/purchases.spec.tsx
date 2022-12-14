import { render } from '@testing-library/react';

import Purchases from './purchases';

describe('Purchases', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Purchases />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import Invoice from './invoice';

describe('Invoice', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Invoice />);
    expect(baseElement).toBeTruthy();
  });
});

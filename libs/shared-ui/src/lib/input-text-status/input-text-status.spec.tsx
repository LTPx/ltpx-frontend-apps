import { render } from '@testing-library/react';

import InputTextStatus from './input-text-status';

describe('InputTextStatus', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputTextStatus />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import FormWithdrawal from './form-withdrawal';

describe('FormWithdrawal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormWithdrawal />);
    expect(baseElement).toBeTruthy();
  });
});

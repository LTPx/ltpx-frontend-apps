import { render } from '@testing-library/react';

import CommissionForm from './commission-form';

describe('CommissionForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommissionForm />);
    expect(baseElement).toBeTruthy();
  });
});

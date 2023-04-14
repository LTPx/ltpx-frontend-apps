import { render } from '@testing-library/react';

import BankAccountEdit from './bank-account-edit';

describe('BankAccountEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BankAccountEdit />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import SelectAccount from './select-account';

describe('SelectAccount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectAccount />);
    expect(baseElement).toBeTruthy();
  });
});

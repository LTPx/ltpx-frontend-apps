import { render } from '@testing-library/react';

import SelectIcons from './select-icons';

describe('SelectIcons', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectIcons />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import SelectOptionCard from './select-option-card';

describe('SelectOptionCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectOptionCard />);
    expect(baseElement).toBeTruthy();
  });
});

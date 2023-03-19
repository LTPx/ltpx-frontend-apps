import { render } from '@testing-library/react';

import LongTermPotentiation from './long-term-potentiation';

describe('LongTermPotentiation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LongTermPotentiation />);
    expect(baseElement).toBeTruthy();
  });
});

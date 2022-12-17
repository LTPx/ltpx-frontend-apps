import { render } from '@testing-library/react';

import Classes from './classes';

describe('Classes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Classes />);
    expect(baseElement).toBeTruthy();
  });
});

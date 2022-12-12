import { render } from '@testing-library/react';

import Rating from './rating';

describe('Rating', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Rating stars={0} />);
    expect(baseElement).toBeTruthy();
  });
});

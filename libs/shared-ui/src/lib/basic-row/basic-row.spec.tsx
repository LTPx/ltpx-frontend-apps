import { render } from '@testing-library/react';

import BasicRow from './basic-row';

describe('BasicRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BasicRow />);
    expect(baseElement).toBeTruthy();
  });
});

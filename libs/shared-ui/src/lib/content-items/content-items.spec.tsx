import { render } from '@testing-library/react';

import ContentItems from './content-items';

describe('ContentItems', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentItems />);
    expect(baseElement).toBeTruthy();
  });
});

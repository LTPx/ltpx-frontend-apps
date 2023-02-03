import { render } from '@testing-library/react';

import ContentDescription from './content-description';

describe('ContentDescription', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentDescription />);
    expect(baseElement).toBeTruthy();
  });
});

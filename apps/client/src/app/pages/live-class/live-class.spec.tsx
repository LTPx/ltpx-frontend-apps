import { render } from '@testing-library/react';

import LiveClass from './live-class';

describe('LiveClass', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LiveClass />);
    expect(baseElement).toBeTruthy();
  });
});

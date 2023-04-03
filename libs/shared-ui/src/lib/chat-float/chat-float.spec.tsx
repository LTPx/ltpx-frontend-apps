import { render } from '@testing-library/react';

import ChatFloat from './chat-float';

describe('ChatFloat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatFloat />);
    expect(baseElement).toBeTruthy();
  });
});

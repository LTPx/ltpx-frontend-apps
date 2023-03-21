import { render } from '@testing-library/react';

import DialogConfirm from './dialog-confirm';

describe('DialogConfirm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DialogConfirm />);
    expect(baseElement).toBeTruthy();
  });
});

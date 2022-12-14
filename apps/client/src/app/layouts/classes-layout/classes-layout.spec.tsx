import { render } from '@testing-library/react';

import ClassesLayout from './classes-layout';

describe('ClassesLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassesLayout />);
    expect(baseElement).toBeTruthy();
  });
});

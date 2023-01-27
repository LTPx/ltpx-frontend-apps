import { render } from '@testing-library/react';

import SelectImage from './select-image';

describe('SelectImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectImage />);
    expect(baseElement).toBeTruthy();
  });
});

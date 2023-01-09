import { render } from '@testing-library/react';

import GroupSelectOption from './group-select-option';

describe('GroupSelectOption', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupSelectOption />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import SelectedItems from './selected-items';

describe('SelectedItems', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectedItems />);
    expect(baseElement).toBeTruthy();
  });
});

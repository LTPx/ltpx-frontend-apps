import { render } from '@testing-library/react';

import GroupSelectOptionCard from './group-select-option-card';

describe('GroupSelectOptionCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupSelectOptionCard />);
    expect(baseElement).toBeTruthy();
  });
});

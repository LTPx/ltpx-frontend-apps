import { render } from '@testing-library/react';

import Tabs from './tabs';

describe('Tabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tabs tabs={[]} />);
    expect(baseElement).toBeTruthy();
  });
});

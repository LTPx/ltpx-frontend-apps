import { render } from '@testing-library/react';

import WhatIsOpenMind from './what-is-open-mind';

describe('WhatIsOpenMind', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WhatIsOpenMind />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import WhatMakesClassGoingOn from './what-makes-class-going-on';

describe('WhatMakesClassGoingOn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WhatMakesClassGoingOn />);
    expect(baseElement).toBeTruthy();
  });
});

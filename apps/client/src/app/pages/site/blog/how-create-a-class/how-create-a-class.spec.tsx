import { render } from '@testing-library/react';

import HowCreateAClass from './how-create-a-class';

describe('HowCreateAClass', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HowCreateAClass />);
    expect(baseElement).toBeTruthy();
  });
});

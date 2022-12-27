import { render } from '@testing-library/react';

import ListUser from './list-user';

describe('ListUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListUser users={[]} />);
    expect(baseElement).toBeTruthy();
  });
});

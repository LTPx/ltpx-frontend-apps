import { render } from '@testing-library/react';

import GroupUsers from './group-users';

describe('GroupUsers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GroupUsers images={[]} />);
    expect(baseElement).toBeTruthy();
  });
});

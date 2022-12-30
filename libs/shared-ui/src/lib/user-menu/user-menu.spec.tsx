import { render } from '@testing-library/react';

import UserMenu from './user-menu';

describe('UserMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserMenu image={''} links={[]} name={''} email={''} />);
    expect(baseElement).toBeTruthy();
  });
});

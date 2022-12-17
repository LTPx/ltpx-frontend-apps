import { render } from '@testing-library/react';

import UserClasses from './user-classes';

describe('UserClasses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserClasses />);
    expect(baseElement).toBeTruthy();
  });
});

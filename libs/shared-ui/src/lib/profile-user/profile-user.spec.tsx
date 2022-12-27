import { render } from '@testing-library/react';

import ProfileUser from './profile-user';

describe('ProfileUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileUser name={''} profession={''} rating={0} biography={''} />);
    expect(baseElement).toBeTruthy();
  });
});

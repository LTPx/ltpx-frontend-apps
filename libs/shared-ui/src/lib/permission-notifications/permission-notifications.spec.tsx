import { render } from '@testing-library/react';

import PermissionNotifications from './permission-notifications';

describe('PermissionNotifications', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PermissionNotifications />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import PasswordEdit from './password-edit';

describe('PasswordEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordEdit />);
    expect(baseElement).toBeTruthy();
  });
});

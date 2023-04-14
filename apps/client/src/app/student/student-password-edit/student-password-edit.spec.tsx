import { render } from '@testing-library/react';

import StudentPasswordEdit from './student-password-edit';

describe('StudentPasswordEdit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentPasswordEdit />);
    expect(baseElement).toBeTruthy();
  });
});

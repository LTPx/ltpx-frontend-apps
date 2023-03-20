import { render } from '@testing-library/react';

import StudentChat from './student-chat';

describe('StudentChat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentChat />);
    expect(baseElement).toBeTruthy();
  });
});

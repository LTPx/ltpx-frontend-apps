import { render } from '@testing-library/react';

import TeacherChat from './teacher-chat';

describe('TeacherChat', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherChat />);
    expect(baseElement).toBeTruthy();
  });
});

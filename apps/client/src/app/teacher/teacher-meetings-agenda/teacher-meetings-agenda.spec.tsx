import { render } from '@testing-library/react';

import TeacherMeetingsAgenda from './teacher-meetings-agenda';

describe('TeacherMeetingsAgenda', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherMeetingsAgenda />);
    expect(baseElement).toBeTruthy();
  });
});

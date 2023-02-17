import { render } from '@testing-library/react';

import VideoMeeting from './video-meeting';

describe('VideoMeeting', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VideoMeeting />);
    expect(baseElement).toBeTruthy();
  });
});

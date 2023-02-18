import { render } from '@testing-library/react';

import VideoMeetingLive from './video-meeting-live';

describe('VideoMeetingLive', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VideoMeetingLive />);
    expect(baseElement).toBeTruthy();
  });
});

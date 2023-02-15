import VideoMeeting from '../video-meeting/video-meeting';
import styles from './video-meeting-live.module.scss';

/* eslint-disable-next-line */
export interface VideoMeetingLiveProps {}

export function VideoMeetingLive(props: VideoMeetingLiveProps) {
  return (
    <div className={styles['container']}>
      <VideoMeeting/>
    </div>
  );
}

export default VideoMeetingLive;

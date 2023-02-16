// import VideoMeeting from '../video-meeting/video-meeting';
import styles from './video-meeting-live.module.scss';
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { Button } from '@ltpx-frontend-apps/shared-ui';
/* eslint-disable-next-line */
export interface VideoMeetingLiveProps {}

export function VideoMeetingLive(props: VideoMeetingLiveProps) {
  function handleCall() {
    const config = {
      name: "Test User",
      meetingId: "pruf-s3yq-j760",
      apiKey: process.env.NX_VIDEOSDK_TOKEN,
      redirectOnLeave: "http://localhost:4200/teacher/sessions",
      containerId: 'video-container',
      micEnabled: true,
      webcamEnabled: false,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,
      chatEnabled: true,
      screenShareEnabled: true,
    };

    const meeting = new VideoSDKMeeting();
    meeting.init(config);
  }

  return (
    <div className={styles['container']}>
      {/* <VideoMeeting/> */}
      <Button title='Join' onClick={handleCall}/>
      <div id="video-container" className={styles['video-container']}></div>
    </div>
  );
}

export default VideoMeetingLive;

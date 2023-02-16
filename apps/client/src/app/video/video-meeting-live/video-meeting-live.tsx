// import VideoMeeting from '../video-meeting/video-meeting';
import styles from './video-meeting-live.module.scss';
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
// import * as VideoSDKMeeting from "@videosdk.live/rtc-js-prebuilt/dist";

import { useEffect } from 'react';
/* eslint-disable-next-line */
export interface VideoMeetingLiveProps {}

export function VideoMeetingLive(props: VideoMeetingLiveProps) {
  useEffect(() => {
    const config = {
      name: "Demo User",
      meetingId: "milkyway",
      apiKey: "<API KEY>",

      containerId: null,

      micEnabled: true,
      webcamEnabled: true,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,

      chatEnabled: true,
      screenShareEnabled: true,

      /*

     Other Feature Properties

      */
    };

    const meeting = new VideoSDKMeeting();
    meeting.init(config);
  }, []);

  return (
    <div className={styles['container']}>
      {/* <VideoMeeting/> */}
    </div>
  );
}

export default VideoMeetingLive;

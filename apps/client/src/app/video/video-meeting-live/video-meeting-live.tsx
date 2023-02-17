import styles from './video-meeting-live.module.scss';
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { useTeacher, useUser } from '@ltpx-frontend-apps/store';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
/* eslint-disable-next-line */
export interface VideoMeetingLiveProps {}

export function VideoMeetingLive(props: VideoMeetingLiveProps) {
  const [isValid, setIsValid] = useState(false);
  const { user } = useUser();
  const { _validateMeetingRoomId } = useTeacher();
  const { roomId, meetingId } = useParams();
  console.log('roomId: ', roomId);
  console.log('user: ', user.fullname);

  const fetchData = useCallback(async () => {
    if (meetingId && roomId) {
      const meetId = parseInt(meetingId || '');
      const { success, data } = await _validateMeetingRoomId(meetId, roomId);
      if  (success) {
        handleCall(data.meeting_id);
      } else {
        setIsValid(true)
      }
      console.log('resp....: ', data);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleCall(roomId: string) {
    const config = {
      name: user.fullname,
      meetingId: roomId,
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
      <div id="video-container" className={styles['video-container']}></div>
    </div>
  );
}

export default VideoMeetingLive;

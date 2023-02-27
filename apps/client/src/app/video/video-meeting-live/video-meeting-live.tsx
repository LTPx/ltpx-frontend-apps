import styles from './video-meeting-live.module.scss';
import { VideoSDKMeeting } from '@videosdk.live/rtc-js-prebuilt';
import { useTeacher, useUser } from '@ltpx-frontend-apps/store';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Loader } from '@ltpx-frontend-apps/shared-ui';
/* eslint-disable-next-line */
export interface VideoMeetingLiveProps {
  redirectUrl: string;
}

export function VideoMeetingLive(props: VideoMeetingLiveProps) {
  const { redirectUrl } = props;
  const [isValid, setIsValid] = useState(false);
  const { user } = useUser();
  const { _validateMeetingRoomId } = useTeacher();
  const { roomId, meetingId } = useParams();
  const APP_URL = process.env.NX_APP_URL || '';
  const redirectTo = `${APP_URL}${redirectUrl}`;

  const fetchData = useCallback(async () => {
    if (meetingId && roomId) {
      const meetId = parseInt(meetingId || '');
      const { success, data } = await _validateMeetingRoomId(meetId, roomId);
      setIsValid(success);
      if (success) {
        handleCall(data.meeting_id);
      }
      console.log('resp....: ', data);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  function handleCall(roomId: string) {
    const config = {
      name: user.fullname,
      meetingId: roomId,
      apiKey: process.env.NX_VIDEOSDK_TOKEN,
      redirectOnLeave: redirectTo,
      // containerId: 'video-live-container',
      micEnabled: true,
      webcamEnabled: false,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,
      chatEnabled: true,
      screenShareEnabled: true,
      pollEnabled: true,
      whiteboardEnabled: true,
    };

    const meeting = new VideoSDKMeeting();
    meeting.init(config);
  }

  return (
    <div className={styles['container']}>
      <div id="video-container" className={styles['video-container']}>
        {isValid ? (
          <div className={styles['loader']}>
            <Loader />
            <h3>Estamos conectándote a la sala.....</h3>
          </div>
        ) : (
          <h2>No hemos encontrado esta sala</h2>
        )}
      </div>
    </div>
  );
}

export default VideoMeetingLive;

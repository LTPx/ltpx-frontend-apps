import styles from './video-meeting.module.scss';
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from '@videosdk.live/react-sdk';
import { useState } from 'react';
import { createMeeting } from '@ltpx-frontend-apps/api';
const authToken = process.env.NX_VIDEOSDK_TOKEN;

/* eslint-disable-next-line */
export interface VideoMeetingProps {}

export function VideoMeeting(props: VideoMeetingProps) {
  const [meetingId, setMeetingId] = useState('pruf-s3yq-j760');

  function JoinScreen({ getMeetingAndToken }: { getMeetingAndToken: any }) {
    const [meetingId, setMeetingId] = useState('');
    const onClick = async () => {
      await getMeetingAndToken(meetingId);
    };
    return (
      <div>
        <input
          type="text"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
        <button onClick={onClick}>Join</button>
        {' or '}
        <button onClick={onClick}>Create Meeting</button>
      </div>
    );
  }

  function VideoComponent(props: any) {
    return null;
  }

  function Controls(props: any) {
    return null;
  }

  function Container(props: any) {
    const [joined, setJoined] = useState(false);
    const { join } = useMeeting();
    const { participants } = useMeeting();
    const joinMeeting = () => {
      setJoined(true);
      join();
    };

    return (
      <div className="container">
        <h3>Meeting Id: {props.meetingId}</h3>
        {joined ? (
          <div>
            <Controls />
            {[...participants.keys()].map((participantId) => (
              <VideoComponent participantId={participantId} />
            ))}
          </div>
        ) : (
          <button onClick={joinMeeting}>Join</button>
        )}
      </div>
    );
  }

  const getMeetingAndToken = async (id: string) => {
    // const xx = null;
    const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: false,
        name: 'C.V. Raman',
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => <Container meetingId={meetingId} />}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default VideoMeeting;

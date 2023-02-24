import { _http } from '../../http';
import { MeetingModel } from '../../interfaces/meeting-interface';

const http = _http;

export const getMeetingRoomId = async (meetingId: number) => {
  return new Promise<MeetingModel[]>((resolve, reject) => {
    http
      .post(`/api/v1/teacher/meetings/${meetingId}/create_room_id`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const validateMeetingRoomId = async (meetingId: number, roomId: string) => {
  return new Promise<MeetingModel[]>((resolve, reject) => {
    http
      .post(`/api/v1/teacher/meetings/${meetingId}/validate_room_id`, {meeting_id: roomId})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

import { _http } from '../../http';
import { MeetingModel } from '../../interfaces/meeting-interface';

const http = _http;

export const getMeetingRoomId = async (meetingId: number) => {
  return new Promise<MeetingModel[]>((resolve, reject) => {
    http
      .post(`/api/v1/teacher/meetings/${meetingId}/create_meeting_id`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

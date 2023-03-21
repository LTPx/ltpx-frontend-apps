import { _http } from '../../http';
import { ChatMessage, NewChatMessage } from '../../interfaces/chat-interface';

const http = _http;

export const getTeacherRooms = async () => {
  return new Promise<any[]>((resolve, reject) => {
    http
      .get('api/v1/chat/teachers/rooms')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTeacherRoom = async (userId: number, roomId?: number) => {
  const params = {user_id: userId, room_id: roomId}
  return new Promise<any[]>((resolve, reject) => {
    http
      .get('api/v1/chat/teachers/room', {params})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sendMessage = async (message: NewChatMessage) => {
  return new Promise<ChatMessage>((resolve, reject) => {
    http
      .post('api/v1/chat/teachers/send_message', message)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getChatStudents = async () => {
  return new Promise<any[]>((resolve, reject) => {
    http
      .get('api/v1/chat/teachers/get_students')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

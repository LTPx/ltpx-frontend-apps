import { _http } from '../../http';

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

export const starChatStudent = async (userId: number) => {
  return new Promise<any>((resolve, reject) => {
    http
      .post(`api/v1/chat/students/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sendMessageStudent = async (userId: number, message: string ) => {
  return new Promise<any>((resolve, reject) => {
    http
      .post(`api/v1/chat/students/${userId}`, {message})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

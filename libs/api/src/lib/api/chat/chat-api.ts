import { _http } from '../../http';
import { ChatMessage, NewChatMessage, Room } from '../../interfaces/chat-interface';

const http = _http;

export const getRooms = async () => {
  return new Promise<Room[]>((resolve, reject) => {
    http
      .get('api/v1/chat/rooms')
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getRoomMessages = async (roomId: number) => {
  return new Promise<any[]>((resolve, reject) => {
    http
      .get(`api/v1/chat/rooms/${roomId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sendRoomMessage = async (message: NewChatMessage, roomId: number) => {
  return new Promise<ChatMessage>((resolve, reject) => {
    http
      .post(`api/v1/chat/rooms/${roomId}/send_message`, message)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

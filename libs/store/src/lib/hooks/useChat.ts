import { useAppStore } from '../store';

export const useChat = () => {
  const {
    rooms,
    room,
    messages,
    setRoomById,
    _newChatRoom,
    _getRooms,
    _getRoom,
    _sendMessageRoom,
  } = useAppStore();

  return {
    rooms,
    room,
    messages,
    setRoomById,
    _newChatRoom,
    _getRooms,
    _getRoom,
    _sendMessageRoom,
  };
};

import { ChatMessage, getRoomMessages, getRooms, Room, sendRoomMessage } from "@ltpx-frontend-apps/api";
import { useUser } from "@ltpx-frontend-apps/store";
import { useCallback, useEffect, useState } from "react";

export const useChat = () => {
  const { user } = useUser();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [room, setRoom] = useState<Room>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  function getRoom(roomId: number) {
    return rooms.find(room => room.id === roomId);
  }

  const fetchRooms = useCallback(async () => {
    try {
      const roomsData = await getRooms();
      setRooms(roomsData);
      if (roomsData.length > 0 ){
        fetchMessages(roomsData[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function fetchMessages(roomId: number) {
    setRoom(getRoom(roomId));
    setLoadingMessages(true);
    try {
      const messages: ChatMessage[] = await getRoomMessages(roomId);
      setMessages([...messages]);
      setLoadingMessages(false);
    } catch (error) {
      console.log(error);
      setLoadingMessages(false);
    }
  }

  async function sendMessage(message: ChatMessage) {
    if (room) {
      const newMessage = {
        text: message.text,
        user_id: user.id,
        room_id: room.id,
      }
      try {
        await sendRoomMessage(newMessage, room.id)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    messages,
    fetchMessages,
    sendMessage,
    loadingMessages,
    senderId: user.id,
    currentRoom: room
  };
};

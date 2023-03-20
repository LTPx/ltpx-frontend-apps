import { ChatMessage, getRoomMessages, getRooms, Room, sendRoomMessage } from "@ltpx-frontend-apps/api";
import { useUser } from "@ltpx-frontend-apps/store";
import { useCallback, useEffect, useState } from "react";

export const useChat = () => {
  const { user } = useUser();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<number>(1);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const fetchRooms = useCallback(async () => {
    try {
      const rooms = await getRooms();
      setRooms(rooms);
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function fetchMessages(roomId: number) {
    setSelectedRoomId(roomId);
    setLoadingMessages(true);
    try {
      const messages: ChatMessage[] = await getRoomMessages(roomId);
      setMessages([...messages]);
      setLoadingMessages(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendMessage(message: ChatMessage) {
    const newMessage = {
      text: message.text,
      user_id: user.id,
      room_id: selectedRoomId,
    }
    try {
      await sendRoomMessage(newMessage, selectedRoomId)
    } catch (error) {
      console.log(error)
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
  };
};

import { ChatMessage, createNewRoom, getRoomMessages, getRooms, Room, sendRoomMessage } from "@ltpx-frontend-apps/api";
import { useChat, useUser } from "@ltpx-frontend-apps/store";
import { useCallback, useEffect, useState } from "react";

export const useChatData = () => {
  const { user } = useUser();
  const {
    _getRooms,
  } = useChat();

  const fetchRooms = useCallback(async () => {
    await _getRooms()
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    senderId: user.id,
  };
};

import { useChat } from "@ltpx-frontend-apps/store";
import { useCallback, useEffect } from "react";

export const useChatData = () => {
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
  };
};

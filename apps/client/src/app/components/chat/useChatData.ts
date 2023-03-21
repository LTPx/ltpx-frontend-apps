import { useChat, useUser } from "@ltpx-frontend-apps/store";
import { useCallback, useEffect } from "react";
import Pusher from "pusher-js";
import { ChatMessage } from "@ltpx-frontend-apps/api";

export const useChatData = () => {
  const { user } = useUser();
  const key = process.env.NX_PUSHER_KEY || '';
  const pusher = new Pusher(key, {
    cluster: process.env.NX_PUSHER_CLUSTER || '',
    forceTLS: true,
  });

  const {
    _getRooms,
    room,
    appendNewMessage,
  } = useChat();

  const fetchRooms = useCallback(async () => {
    await _getRooms()
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (room.id) {
      const channel = pusher.subscribe(room.name);
      channel.bind('new', (newMessage: ChatMessage) => {
        if (newMessage.user_id !== user.id) {
          console.log('newMessage: ', newMessage);
          appendNewMessage(newMessage);
        }
      })
    }

    return () => {
      if (room.id) {
        console.log('unsubscribe');
        pusher.unsubscribe(room.name);
      }
    };
  }, [room]);

  return {
  };
};

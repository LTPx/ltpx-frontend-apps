import { useChat, useUser } from "@ltpx-frontend-apps/store";
import { useCallback } from "react";
import { ChatMessage } from "@ltpx-frontend-apps/api";
import { useEffectOnce } from "./useEffectOnce";

export const useChatData = () => {
  const { user } = useUser();


  const {
    _getRooms,
    appendNewMessage,
  } = useChat();

  const fetchRooms = useCallback(async () => {
    await _getRooms()
  }, []);

  useEffectOnce(() => {
    fetchRooms();
    // listenMessages();

    return () => {
      // const channelName = `listen_messages_user_${user.id}`;
      // pusher.unsubscribe(channelName);
      // console.log('unsubscribe');
    };
  });

  // function listenMessages() {
  //   const channelName = `listen_messages_user_${user.id}`;
  //   const channel = pusher.subscribe(channelName);
  //   channel.bind('new', (newMessage: ChatMessage) => {
  //     if (newMessage.user_id !== user.id) {
  //       appendNewMessage(newMessage);
  //     }
  //   })
  // }

  return {

  }
};

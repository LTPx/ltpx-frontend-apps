import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import {
  ChatMessage,
  createNewRoom,
  getRoom,
  getRooms,
  NewChatMessage,
  Room,
  sendRoomMessage,
} from '@ltpx-frontend-apps/api';

export type TResponse = {
  success: boolean;
  data?: any;
  error?: any;
};

export type ChatSlice = {
  rooms: Room[];
  room: Room;
  messages: ChatMessage[];
  showChat: boolean;
  setShowChat: (show: boolean) => void;
  setRoomById: (roomId: number) => void;
  appendNewMessage: (message: ChatMessage) => void;
  _getRooms: () => Promise<TResponse>;
  _getRoom: (roomId: number) => Promise<TResponse>;
  _newChatRoom: (userId: number) => Promise<TResponse>;
  _sendMessageRoom: (message: NewChatMessage) => Promise<TResponse>;
};

export const createChatSlice: StateCreator<StoreState, [], [], ChatSlice> = (
  set,
  get
) => ({
  rooms: [],
  room: {} as Room,
  messages: [],
  showChat: false,
  setShowChat: (show) => {
    set({showChat: show});
  },
  setRoomById: (roomId) => {
    const rooms = get().rooms;
    const room = rooms.find(room => room.id === roomId);
    set({room});
  },
  appendNewMessage: (message) => {
    const messages = [...get().room.messages , ...[message]];
    const room = {
      ...get().room,
      ...{ messages },
    };
    set({ room });
  },
  _getRooms: async () => {
    try {
      const rooms = await getRooms();
      set({ rooms });
      return { success: true, data: rooms };
    } catch (error) {
      console.log(error);
      return { success: true, error };
    }
  },
  _getRoom: async (roomId) => {
    try {
      const room = await getRoom(roomId);
      set({ room, messages: room.messages });
      return { success: true, data: room };
    } catch (error) {
      console.log(error);
      return { success: true, error };
    }
  },
  _newChatRoom: async (userId) => {
    try {
      const room = await createNewRoom(userId); //NOTE: could create or get a room
      const roomsStore = get().rooms;
      const existRoom = roomsStore.find((r) => r.id === room.id);
      if (!existRoom) {
        const rooms = [...roomsStore, ...[room]];
        set({ rooms });
      } else {
        set({ room: room, messages: room.messages, showChat: true });
      }
      return { success: true, data: room };
    } catch (error) {
      console.log(error);
      return { success: true, error };
    }
  },
  _sendMessageRoom: async (newMessage) => {
    try {
      const message = await sendRoomMessage(newMessage, newMessage.room_id);
      const messages = [...get().room.messages , ...[message]];
      const room = {
        ...get().room,
        ...{ messages },
      };
      set({ room });
      return { success: true, data: message };
    } catch (error) {
      console.log(error);
      return { success: true, error };
    }
  },
});

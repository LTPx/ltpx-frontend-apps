export interface ChatMessage {
  text: string;
  user_id: number;
  user_name: string;
  created_at: string;
}

export interface NewChatMessage {
  text: string;
  user_id: number;
  room_id: number;
}

export interface Room {
  id: number;
  name: string;
  created_at: string;
  is_private: boolean;
  messages: ChatMessage[];
}

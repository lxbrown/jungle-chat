export interface Message {
  message_body: string;
  socket_id: string;
  created_at: Date;
  current_user: boolean;
}

export interface NewMessage {
  message_body: string;
}

export interface Channel {
  id: string;
  name: string;
  activeUsers: number;
}
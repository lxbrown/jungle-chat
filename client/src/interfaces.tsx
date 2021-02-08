export interface Message {
  message_body: string;
  socket_id: string;
  display_name: string;
  created_at: Date;
  current_user: boolean;
}

export interface NewMessage {
  message_body: string;
}

export interface PersistentChannel {
  short_name: string;
  display_name: string;
  description: string;
}

export interface ChannelFeed {
  short_name: string;
  active_users: number;
}
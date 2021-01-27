import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { Message } from '../interfaces';

const NEW_CHAT_MESSAGE_EVENT = "newMessage";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { chatId },
    });
    const current = socketRef.current;

    // Listens for incoming messages
    current.on(NEW_CHAT_MESSAGE_EVENT, (message: Message) => {
      const incomingMessage = {
        ...message,
        currentUser: message.userId === current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      current.disconnect();
    };
  }, [chatId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageText: string) => {
    if (!socketRef.current) return;

    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageText,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
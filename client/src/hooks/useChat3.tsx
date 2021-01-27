import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { Message } from '../interfaces';

const JOIN_CHAT_EVENT = "chat:join";
const LEAVE_CHAT_EVENT = "chat:leave";
const NEW_CHAT_MESSAGE_EVENT = "chat:message";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket>();
  
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { chatId },
    });
    const current = socketRef.current;

    console.log('joining');
    current.emit(JOIN_CHAT_EVENT);
    
    return () => {
      current.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { chatId },
    });
    const current = socketRef.current;

    current.on(NEW_CHAT_MESSAGE_EVENT, (message: Message) => {
      const incomingMessage = {
        ...message,
        currentUser: message.userId === current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
  }, [chatId]);

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
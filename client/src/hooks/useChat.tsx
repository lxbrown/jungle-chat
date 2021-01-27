import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newMessage";
const SOCKET_SERVER_URL = "http://localhost:3000";

export interface Message {
  body: string;
  userId: string;
  currentUser: boolean;
}

const useChat = (chatId: string) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { chatId },
    });
    
    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: Message) => {
      const incomingMessage = {
        ...message,
        currentUser: message.userId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [chatId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageText: string) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageText,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
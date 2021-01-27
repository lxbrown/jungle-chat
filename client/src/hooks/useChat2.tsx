import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { Message } from '../interfaces';

const JOIN_CHAT_EVENT = "chat:join";
const LEAVE_CHAT_EVENT = "chat:leave";
const NEW_CHAT_MESSAGE_EVENT = "chat:message";

const SOCKET_SERVER_URL = "http://localhost:4000";


//I think this is the useChat we want to use
//TODO - why is a new 'connect' getting emitted on every character
// that gets typed into the text box
//TODO - why are there two connects on launch? related?

const useChat = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const {current: socket} = useRef<Socket>(io(SOCKET_SERVER_URL, {
    query: { chatId }
  }));

  useEffect(() => {
    console.log('joining');
    socket.emit(JOIN_CHAT_EVENT);
  }, [socket])

  useEffect(() => {
    console.log('effect');
    socket.on(NEW_CHAT_MESSAGE_EVENT, (message: Message) => {
      const incomingMessage = {
        ...message,
        currentUser: message.userId === socket.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
    
    return () => {
      socket.emit(LEAVE_CHAT_EVENT);
      socket.disconnect();
    };
  }, [socket, chatId]);

  const sendMessage = (messageText: string) => {
    socket.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageText,
      senderId: socket.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
import { useEffect, useState } from "react";

import { Message } from '../interfaces';

import { socket } from '../services/socket';

const JOIN_CHAT_EVENT = "chat:join";
const LEAVE_CHAT_EVENT = "chat:leave";
const NEW_CHAT_MESSAGE_EVENT = "chat:message";

const useChat = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log('useChat:effect - joining and adding listener');
    socket.emit(JOIN_CHAT_EVENT, chatId);

    function onMessage(message: Message) {
      const incomingMessage = {
        ...message,
        currentUser: message.userId === socket.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    }

    socket.on(NEW_CHAT_MESSAGE_EVENT, onMessage);
    
    return () => {
      console.log('useChat:effect - leaving and removing listener');
      socket.off(NEW_CHAT_MESSAGE_EVENT, onMessage);
      socket.emit(LEAVE_CHAT_EVENT, chatId);
    };
  }, [chatId]);

  const sendMessage = (messageText: string) => {
    console.log('useEffect:sendMessage - sending message');
    socket.emit(NEW_CHAT_MESSAGE_EVENT, chatId, {
      body: messageText,
      senderId: socket.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
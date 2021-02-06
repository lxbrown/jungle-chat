import { useEffect, useState } from "react";
import axios from "axios";

import { Message, NewMessage } from '../../interfaces';

import { socket } from '../../services/socket';

const JOIN_CHAT_EVENT = "chat:join";
const LEAVE_CHAT_EVENT = "chat:leave";
const NEW_CHAT_MESSAGE_EVENT = "chat:message";

const useChat = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<String>('');

  useEffect(() => {
    socket.emit(JOIN_CHAT_EVENT, chatId, (display_name: string) => {
      setUsername(display_name);
    });

    function getHistory() {
      axios.get(`/api/message/channel/${chatId}`).then((res) => {
        setMessages(res.data.reverse());
      })
    }

    function onMessage(message: Message) {
      setMessages((messages) => [...messages, message]);
    };

    getHistory();
    socket.on(NEW_CHAT_MESSAGE_EVENT, onMessage);
    
    return () => {
      socket.off(NEW_CHAT_MESSAGE_EVENT, onMessage);
      socket.emit(LEAVE_CHAT_EVENT, chatId);
    };
  }, [chatId]);

  const sendMessage = (messageText: string) => {
    const new_message: NewMessage = {
      message_body: messageText
    }
    socket.emit(NEW_CHAT_MESSAGE_EVENT, chatId, new_message);
  };

  return { messages, sendMessage, username };
};

export default useChat;
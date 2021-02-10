import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { Message, NewMessage } from '../../interfaces';

import { socket } from '../../services/socket';

const JOIN_CHAT_EVENT = "chat:join";
const LEAVE_CHAT_EVENT = "chat:leave";
const NEW_CHAT_MESSAGE_EVENT = "chat:message";

const useChat = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<String>('');

  const getHistory = useCallback((limit, from) => {
    axios.get(`/api/message/channel/${chatId}`, {
        params: {
          limit: limit,
          from: from
        }
      }).then((res) => {
        const ordered = res.data.reverse();
        setMessages((messages) => [...ordered, ...messages]);
    })
  }, [chatId]);

  useEffect(() => {
    socket.emit(JOIN_CHAT_EVENT, chatId, (display_name: string) => {
      setUsername(display_name);
    });

    function onMessage(message: Message) {
      if (message.socket_id === socket.id) {
        message.current_user = true;
      }
      setMessages((messages) => [...messages, message]);
    };

    socket.on(NEW_CHAT_MESSAGE_EVENT, onMessage);
    
    return () => {
      socket.off(NEW_CHAT_MESSAGE_EVENT, onMessage);
      socket.emit(LEAVE_CHAT_EVENT, chatId);
    };
  }, [chatId, getHistory]);

  const sendMessage = (messageText: string) => {
    const new_message: NewMessage = {
      message_body: messageText
    }
    socket.emit(NEW_CHAT_MESSAGE_EVENT, chatId, new_message);
  };

  return { messages, sendMessage, getHistory, username };
};

export default useChat;
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import FormControl from 'react-bootstrap/esm/FormControl';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import { useRouteMatch } from 'react-router-dom';

import useChat from './hooks/useChat';

import './Chat.css';
import { Message, PersistentChannel } from '../interfaces';
import useOnScreen from '../hooks/useOnScreen';

export interface MatchParams {
  channel: string;
}

function MessageItem(props: any) {
  const message: Message = props.message;
  const lastMessage: Message = props.lastMessage;
  return (
    <li className={`message-item ${message.current_user ? "sent-message" : "received-message"}`}>
      {!lastMessage || (lastMessage.socket_id !== message.socket_id) ? (
        <div>
        {message.current_user ? [
           <span key="1" className="timestamp on-left">{new Date(message.created_at).toLocaleString()}</span>,
           <span key="2" className="username">{message.display_name}</span>
         ] : [
          <span key="1" className="username on-left">{message.display_name}</span>,
          <span key="2" className="timestamp">{new Date(message.created_at).toLocaleString()}</span>
         ]}
        </div>
      ) : null}
      <span className="message-body">{message.message_body}</span>
    </li>
  )
}

export default function Chat() {
  const channel_id = useRouteMatch<MatchParams>('/:channel')?.params.channel || '';

  const { messages, sendMessage, getHistory, username } = useChat(channel_id);
  const [messageText, setMessageText] = useState('');
  const [channel, setChannel] = useState<PersistentChannel>();

  const prevMessagesRef = useRef<Message[]>();

  const messagesStartRef = useRef<any>(null);
  const messagesEndRef = useRef<any>(null);
  const messagesStartVisible = useOnScreen(messagesStartRef);

  useEffect(() => {
    prevMessagesRef.current = messages;
  });
  const prevMessages = prevMessagesRef.current || [];

  useEffect(() => {
    function getChannel() {
      axios.get(`/api/channel/${channel_id}`).then((res) => {
        if (res.data !== null) {
          setChannel(res.data);
        }
        else {
          setChannel({short_name: channel_id, display_name: channel_id, description: ''})
        }
      });
    };
    getChannel();
  }, [channel_id]);

  useEffect(() => {
    if (prevMessages.length === 0 || (messages.length && messages[messages.length-1].current_user)) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages]);
  
  useEffect(() => {
    if (messages.length > 0 && messagesStartVisible) {
      getHistory(30, messages[0]._id);
    }
  }, [messagesStartVisible, getHistory]);

  const handleOnMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  }

  const handleSend = () => {
    if (messageText !== '') {
      sendMessage(messageText);
      setMessageText('');
    }
  }

  const handleOnKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className="container">
      <h3 className="title">{channel ? channel.display_name : ''}</h3>
      <div className="message-container">
        <div ref={messagesStartRef} />
        {messages.map((message, i, array) => (
          <MessageItem key={i} message={message} lastMessage={i > 0 ? array[i-1] : null}/>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input container">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="user-id">
              {username}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Message..."
            aria-label="Message..."
            aria-describedby="user-id"
            value={messageText}
            onKeyPress={handleOnKeyPress}
            onChange={handleOnMessageChange}
          />
          <InputGroup.Append>
            <Button variant="primary" type="submit"
            onClick={handleSend}
            >Send</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    </div>
  )
}
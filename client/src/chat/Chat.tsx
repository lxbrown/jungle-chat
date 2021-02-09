import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import FormControl from 'react-bootstrap/esm/FormControl';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import { useRouteMatch } from 'react-router-dom';

import useChat from './hooks/useChat';

import './Chat.css';
import { Message, PersistentChannel } from '../interfaces';

export interface MatchParams {
  channel: string;
}

function MessageItem(props: any) {
  const message: Message = props.message;
  const lastMessage: Message = props.lastMessage;
  return (
    <li className={`message-item ${message.current_user ? "sent-message" : "received-message"}`}>
      {!lastMessage || (lastMessage.socket_id !== message.socket_id) ? (
          <span className="username">{message.display_name}</span>
        ) : null}
      <span className="message-body">{message.message_body}</span>
    </li>
  )
}

export default function Chat() {
  const channel_id = useRouteMatch<MatchParams>('/:channel')?.params.channel || '';

  const { messages, sendMessage, username } = useChat(channel_id);
  const [messageText, setMessageText] = useState('');
  const [channel, setChannel] = useState<PersistentChannel>();

  const messagesEndRef = useRef<any>(null);

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
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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
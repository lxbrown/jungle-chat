import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import FormControl from 'react-bootstrap/esm/FormControl';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import { useRouteMatch } from 'react-router-dom';

import useChat from './hooks/useChat';

import './Chat.css';
import { Message } from '../interfaces';

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
  const channel = useRouteMatch<MatchParams>('/:channel')?.params.channel || '';

  const { messages, sendMessage, username } = useChat(channel);
  const [messageText, setMessageText] = useState('');

  const messagesEndRef = useRef<any>(null);

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
      <h3 className="title">{channel}</h3>
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
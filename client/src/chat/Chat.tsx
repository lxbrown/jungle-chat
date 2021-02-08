import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import FormControl from 'react-bootstrap/esm/FormControl';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import { useRouteMatch } from 'react-router-dom';

import useChat from './hooks/useChat';

import './Chat.css';
import Navbar from 'react-bootstrap/esm/Navbar';

export interface MatchParams {
  channel: string;
}

export default function Chat() {
  const channel = useRouteMatch<MatchParams>('/:channel')?.params.channel || '';

  const { messages, sendMessage, username } = useChat(channel);
  const [messageText, setMessageText] = useState('');

  const handleOnMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  }

  const handleSend = () => {
    sendMessage(messageText);
    setMessageText('');
  }

  return (
    <div className="container">
      <Navbar bg="light" expand="sm">
        <Navbar.Brand>
          {channel}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            You are {username}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <div className="message-container">
        <ol className="messages">
          {messages.map((message, i) => (
            <li key={i} className={`message-item ${message.current_user ? "sent-message" : "received-message"}`}>
              {message.message_body}
            </li>
          ))}
        </ol>
      </div>
      <div className="message-input container">
        <InputGroup>
          <FormControl
            placeholder="Message..."
            aria-label="Message..."
            value={messageText}
            onChange={handleOnMessageChange}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={handleSend}>Send</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    </div>
  )
}
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import useChat from './hooks/useChat';
 
export interface MatchParams {
  channel: string;
}

export default function Channel() {
  const channel = useRouteMatch<MatchParams>('/:channel')?.params.channel || '';

  const {messages, sendMessage} = useChat(channel);
  const [messageText, setMessageText] = useState('');

  const handleOnMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  }

  const handleSend = () => {
    sendMessage(messageText);
    setMessageText('');
  }

  return (
    <div className="channel-container">
      <h3>{channel}</h3>
      <div className="message-container">
        <ol className="messages">
          {messages.map((message, i) => (
            <li key={i} className={`message-item ${message.currentUser ? "sent-message" : "received-message"}`}>
              {message.body}
            </li>
          ))}
        </ol>
      </div>

      <input type="text" placeholder="Message..." value={messageText} onChange={handleOnMessageChange} className="message-input" />
      <button className="send-button" onClick={handleSend}>
        Send
      </button>
    </div>
  )
}
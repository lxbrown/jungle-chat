import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import useChat from './hooks/useChat';
 
export interface MatchParams {
  channel: string;
}

export default function Channel() {
  const match = useRouteMatch<MatchParams>('/:channel');
  const channel = match?.params.channel ? match?.params.channel : 'Unknown'; //TODO: this needs to be more robust

  const {messages, sendMessage} = useChat(channel);
  const [messageText, setMessageText] = useState('');

  const handleOnMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Channel:setting message text')
    setMessageText(event.target.value);
  }

  const handleSend = () => {
    console.log('Channel:sending')
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
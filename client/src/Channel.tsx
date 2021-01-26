import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

export interface MatchParams {
  channel: string;
}

export interface Message {
  body: string;
  user: string;
  currentUser: boolean;
}

export default function Channel() {
  const match = useRouteMatch<MatchParams>('/:channel');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleOnMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  }

  const handleSend = () => {
    sendMessage(messageText);
    setMessageText('');
  }

  function sendMessage(text: string) {
    const message: Message = {
      body: text,
      user: '',
      currentUser: true
    }
    setMessages(messages => [...messages, message]);
    return;
  }

  return (
    <div className="channel-container">
      <h3>{match?.params.channel ? match?.params.channel : 'Unknown'}</h3>
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
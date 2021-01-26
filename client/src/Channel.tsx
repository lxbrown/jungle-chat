import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

export interface MatchParams {
  channel: string;
}

export default function Channel() {
  const match = useRouteMatch<MatchParams>('/:channel');
  const channel = match?.params.channel ? match?.params.channel : 'Unknown';
  const [input, setInput] = useState('');

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }

  return (
    <div className="channel-container">
      <h3>{channel}</h3>

      <input type="text" placeholder="Message" value={input} onChange={handleOnInputChange} className="message-input" />
      <button className="send-button">
        Send
      </button>
    </div>
  )
}
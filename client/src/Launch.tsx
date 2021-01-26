import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Launch() {
  const [channel, setChannel] = useState('');

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChannel(event.target.value);
  }

  return (
    <div className="container">
      <input type="text" placeholder="Channel" value={channel} onChange={handleOnInputChange} className="channel-input" />
      <Link to={`/${channel}`} className="join-link">
        Join channel
      </Link>
    </div>
  )
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import useLaunch from './hooks/useLaunch';
import { Channel } from './interfaces';

export default function Launch() {
  const {channels} = useLaunch();
  const [channel, setChannel] = useState('');

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChannel(event.target.value);
  }

  return (
    <div className="container">
      <h3>Active channels</h3>
      <div className="channel-list-container">
        <ol className="channels">
          {channels.map((channel: Channel, i) => (
            <li key={i}>
              {channel.id} {channel.activeUsers}
            </li>
          ))}
        </ol>
      </div>
      <input type="text" placeholder="Channel" value={channel} onChange={handleOnInputChange} className="channel-input" />
      <Link to={`/${channel}`} className="join-link">
        Join channel
      </Link>
    </div>
  )
}
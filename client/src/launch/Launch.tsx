import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import useLaunch from './hooks/useLaunch';
import { ChannelFeed, PersistentChannel} from '../interfaces';

function Room(props: any) {
  const channel: PersistentChannel = props.channel;
  const feed: ChannelFeed = props.feed;

  return (
    <div className="room-blob">
      <Link to={`/${channel.short_name}`} className="join-link">
        {channel.display_name} {feed ? feed.active_users : 0}
      </Link>
    </div>
  )
}

export default function Launch() {
  const {channelFeed} = useLaunch();
  const [tempChannel, setTempChannel] = useState('');

  const [channels, setChannels] = useState<PersistentChannel[]>([]);
  
  useEffect(() => {
    function getChannels() {
      axios.get(`/api/channel`).then((res) => {
        setChannels(res.data);
      })
    };
    getChannels();
  }, []);

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempChannel(event.target.value);
  }

  return (
    <div className="container">
      <h3>Join a room</h3>
      <div className="channel-list-container">
        <ul className="rooms">
          {(channels.map((channel: PersistentChannel, i) => (
            <Room channel={channel} feed={channelFeed.find(feed => channel.short_name === feed.short_name)} key={i}/>
          )))}
        </ul>
      </div>
      <input type="text" placeholder="Channel" value={tempChannel} onChange={handleOnInputChange} className="channel-input" />
      <Link to={`/${tempChannel}`} className="join-link">
        Join channel
      </Link>
    </div>
  )
}
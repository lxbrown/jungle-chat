import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

import useLaunch from './hooks/useLaunch';
import { ChannelFeed, PersistentChannel} from '../interfaces';

import './Launch.css';

function Room(props: any) {
  const channel: PersistentChannel = props.channel;
  const feed: ChannelFeed = props.feed;

  const name = channel ? channel.display_name : feed.short_name;
  const numUsers = feed ? feed.active_users : 0;
  const path = channel ? channel.short_name : feed.short_name;

  return (
    <Link to={`/${path}`} className="room-card">
      <Card>
        <div className={`card-content ${ numUsers > 0 ? 'active-room' : '' }`}>
          <Card.Text className="h6">{name}</Card.Text>
          <span className="hint">{numUsers} active</span>
        </div>
      </Card>
    </Link>
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
      <p className="hint">These ones stick around</p>
      <div className="rooms">
          {(channels.map((channel: PersistentChannel, i) => (
            <Room channel={channel} feed={channelFeed.find(feed => channel.short_name === feed.short_name)} key={i}/>
          )))}
      </div>
      <p>or</p>
      <h4>Use a temporary room</h4>
      <p className="hint">These ones don't</p>
      <div className="rooms">
        {channelFeed.map((feed: ChannelFeed, i) => !channels.find(channel => channel.short_name === feed.short_name) ? 
        (<Room feed={feed} key={i}/>) : null
        )}
      </div>
      <div className="new-channel-input">
        <input type="text" placeholder="Create a new room" value={tempChannel} onChange={handleOnInputChange} />
      </div>
      <Button as={Link} to={`/${tempChannel}`} className="join-link">
        Start
      </Button>
  </div>
  )
}
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import Card from 'react-bootstrap/Card';

import useLaunch from './hooks/useLaunch';
import { ChannelFeed, PersistentChannel} from '../interfaces';

function Room(props: any) {
  const channel: PersistentChannel = props.channel;
  const feed: ChannelFeed = props.feed;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
    // <div className="room-blob">
    //   <Link to={`/${channel.short_name}`} className="join-link">
    //     {channel.display_name} {feed ? feed.active_users : 0}
    //   </Link>
    // </div>
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
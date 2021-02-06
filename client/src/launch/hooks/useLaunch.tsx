import { useEffect, useState } from "react";
import { ChannelFeed } from "../../interfaces";

import { socket } from '../../services/socket';

const JOIN_LAUNCH_EVENT = "launch:join";
const LEAVE_LAUNCH_EVENT = "launch:leave";
const CHANNEL_UPDATE_EVENT = "launch:update";

const useLaunch = () => {
  const [channelFeed, setChannelFeed] = useState<ChannelFeed[]>([]);

  useEffect(() => {
    socket.emit(JOIN_LAUNCH_EVENT);

    socket.on(CHANNEL_UPDATE_EVENT, (allChannels: ChannelFeed[]) => {
      setChannelFeed(allChannels);
    });
    
    return () => {
      socket.emit(LEAVE_LAUNCH_EVENT);
    };
  }, []);

  return { channelFeed };
};

export default useLaunch;